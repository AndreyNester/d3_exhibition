type Pryttifier<T> = {
    [Key in keyof T]: T[Key]
} & {}

export type { Pryttifier }
