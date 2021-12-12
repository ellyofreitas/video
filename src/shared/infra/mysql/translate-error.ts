import { DuplicatedError } from '@shared/domain/errors';

const duplicateError = (error, entityName: string) => {
  if (error.code === 'ER_DUP_ENTRY')
    throw new DuplicatedError(`${entityName} already exists`);
};

export function translateMySQLError(entityName = 'entity'): MethodDecorator {
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
          duplicateError(error, entityName);
          throw new Error();
        }
      },
    };
  };
}
