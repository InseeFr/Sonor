type Defined<T> = T extends undefined | infer V ? V : T;

export type ItemOf<ArrayType, Fallback = never> =
  Defined<ArrayType> extends (infer ElementType)[] ? ElementType : Fallback;
