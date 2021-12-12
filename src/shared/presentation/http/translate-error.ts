import { conflict } from '.';
import {
  ValidationError,
  NotFoundError,
  DuplicatedError,
} from '../../domain/errors';
import { badRequest, internalError, notFound } from './response';

const ERRORS_MAP = new Map()
  .set(ValidationError, (error: ValidationError) => badRequest(error.message))
  .set(NotFoundError, (error: NotFoundError) => notFound(error.message))
  .set(DuplicatedError, (error: DuplicatedError) => conflict(error.message));

const applyMapped = (error) => {
  for (const mappedError of ERRORS_MAP.keys())
    if (error instanceof mappedError) return ERRORS_MAP.get(mappedError)(error);
  return undefined;
};

export function translateControllerError(): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ): TypedPropertyDescriptor<any> | void => {
    const childFunction = descriptor.value;

    return {
      ...descriptor,
      async value(...args: any[]) {
        try {
          return await childFunction.apply(this, args);
        } catch (error) {
          const mappedError = applyMapped(error);
          if (mappedError) return mappedError;
          console.error(error);
          return internalError();
        }
      },
    };
  };
}
