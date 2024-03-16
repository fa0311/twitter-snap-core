import { RenderBasic } from "../render/basic/basic"

export const themeList = { RenderBasic } as const


export type ThemeNameType = keyof typeof themeList
export type ThemeList = (typeof themeList)[keyof typeof themeList]

type ConstructorParametersType<T> = T extends new (...args: infer U) => any ? U[0] : never
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export type ThemeParam = UnionToIntersection<ConstructorParametersType<ThemeList>>