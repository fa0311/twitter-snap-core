import {
  RenderDawnBlossomColorImage,
  RenderDawnBlossomDarkColorImage,
  RenderFierySunsetColorImage,
  RenderFierySunsetDarkColorImage,
  RenderOceanBlueColorImage,
  RenderOceanBlueDarkColorImage,
  RenderPlainColorImage,
  RenderPlainDarkColorImage,
  RenderSunsetGardenColorImage,
  RenderSunsetGardenDarkColorImage,
  RenderTransparentDarkImage,
  RenderTransparentImage,
  RenderTransparentShadowDarkImage,
  RenderTransparentShadowImage,
  RenderTwilightSkyColorImage,
  RenderTwilightSkyDarkColorImage,
} from "../render/color/image";

import { RenderMakeItAQuoteImage } from "../render/makeItAQuote/image";

export const imageThemeList = {
  RenderOceanBlueColorImage,
  RenderOceanBlueDarkColorImage,
  RenderSunsetGardenColorImage,
  RenderSunsetGardenDarkColorImage,
  RenderDawnBlossomColorImage,
  RenderDawnBlossomDarkColorImage,
  RenderFierySunsetColorImage,
  RenderFierySunsetDarkColorImage,
  RenderTwilightSkyColorImage,
  RenderTwilightSkyDarkColorImage,
  RenderPlainColorImage,
  RenderPlainDarkColorImage,
  RenderTransparentImage,
  RenderTransparentDarkImage,
  RenderTransparentShadowImage,
  RenderTransparentShadowDarkImage,
  RenderMakeItAQuoteImage,
} as const;

export type ImageThemeNameType = keyof typeof imageThemeList;
export type ImageThemeList = (typeof imageThemeList)[keyof typeof imageThemeList];
