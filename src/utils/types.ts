import {
    RenderFierySunsetColor,
    RenderOceanBlueColor,
    RenderOceanBlueDarkColor,
    RenderOceanBlueShadowColor,
    RenderOceanBlueShadowDarkColor,
    RenderPlainColor,
    RenderPlainDarkColor,
    RenderSunsetGardenColor,
    RenderSunsetGardenDarkColor,
    RenderTransparent,
    RenderTransparentDark,
    RenderTwilightSkyColor,
    RenderTwilightSkyDarkColor,
    RenderTwilightSkyShadowColor,
    RenderTwilightSkyShadowDarkColor,
} from "../render/color/color";

import { RenderMakeItAQuoteImage } from "render";


export const themeList = {
    RenderOceanBlueColor,
    RenderOceanBlueDarkColor,
    RenderOceanBlueShadowColor,
    RenderOceanBlueShadowDarkColor,
    RenderSunsetGardenColor,
    RenderSunsetGardenDarkColor,
    RenderFierySunsetColor,
    RenderTwilightSkyColor,
    RenderTwilightSkyDarkColor,
    RenderTwilightSkyShadowColor,
    RenderTwilightSkyShadowDarkColor,
    RenderPlainColor,
    RenderPlainDarkColor,
    RenderTransparent,
    RenderTransparentDark,
    RenderMakeItAQuoteImage,
} as const


export type ThemeNameType = keyof typeof themeList
export type ThemeList = (typeof themeList)[keyof typeof themeList]

type ConstructorParametersType<T> = T extends new (...args: infer U) => any ? U[0] : never
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export type ThemeParam = UnionToIntersection<ConstructorParametersType<ThemeList>>