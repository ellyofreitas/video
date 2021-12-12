export const chain =
  (...funcs: any[]) =>
  (initialValue: any) =>
    funcs.reduce(
      (acc, func) => func(...(Array.isArray(acc) ? acc : [acc])),
      initialValue
    );
