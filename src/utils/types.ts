import {
    RenderDawnBlossomColor,
    RenderDawnBlossomDarkColor,
    RenderFierySunsetColor,
    RenderFierySunsetDarkColor,
    RenderOceanBlueColor,
    RenderOceanBlueDarkColor,
    RenderPlainColor,
    RenderPlainDarkColor,
    RenderSunsetGardenColor,
    RenderSunsetGardenDarkColor,
    RenderTransparent,
    RenderTransparentDark,
    RenderTransparentShadow,
    RenderTransparentShadowDark,
    RenderTwilightSkyColor,
    RenderTwilightSkyDarkColor,
} from "render/color/color";


import { RenderMakeItAQuoteImage } from "render";


export const themeList = {
    RenderOceanBlueColor,
    RenderOceanBlueDarkColor,
    RenderSunsetGardenColor,
    RenderSunsetGardenDarkColor,
    RenderDawnBlossomColor,
    RenderDawnBlossomDarkColor,
    RenderFierySunsetColor,
    RenderFierySunsetDarkColor,
    RenderTwilightSkyColor,
    RenderTwilightSkyDarkColor,
    RenderPlainColor,
    RenderPlainDarkColor,
    RenderTransparent,
    RenderTransparentDark,
    RenderTransparentShadow,
    RenderTransparentShadowDark,
    RenderMakeItAQuoteImage,
} as const


export type ThemeNameType = keyof typeof themeList
export type ThemeList = (typeof themeList)[keyof typeof themeList]

type ConstructorParametersType<T> = T extends new (...args: infer U) => any ? U[0] : never
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export type ThemeParam = UnionToIntersection<ConstructorParametersType<ThemeList>>