import {
    RenderFierySunsetColorImage,
    RenderOceanBlueColorImage,
    RenderOceanBlueDarkColorImage,
    RenderOceanBlueShadowColorImage,
    RenderOceanBlueShadowDarkColorImage,
    RenderPlainColorImage,
    RenderPlainDarkColorImage,
    RenderSunsetGardenColorImage,
    RenderSunsetGardenDarkColorImage,
    RenderTransparentDarkImage,
    RenderTransparentImage,
    RenderTwilightSkyColorImage,
    RenderTwilightSkyDarkColorImage,
    RenderTwilightSkyShadowColorImage,
    RenderTwilightSkyShadowDarkColorImage
} from "render/color/image";

import { RenderMakeItAQuoteImage } from "render/makeItAQuote/image";

export const RenderColorKey = [
    RenderOceanBlueColorImage,
    RenderOceanBlueDarkColorImage,
    RenderOceanBlueShadowColorImage,
    RenderOceanBlueShadowDarkColorImage,
    RenderSunsetGardenColorImage,
    RenderSunsetGardenDarkColorImage,
    RenderFierySunsetColorImage,
    RenderTwilightSkyColorImage,
    RenderTwilightSkyDarkColorImage,
    RenderTwilightSkyShadowColorImage,
    RenderTwilightSkyShadowDarkColorImage,
    RenderPlainColorImage,
    RenderPlainDarkColorImage,
    RenderTransparentImage,
    RenderTransparentDarkImage,
    RenderMakeItAQuoteImage,
] as const;
