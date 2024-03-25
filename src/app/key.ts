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
    RenderTwilightSkyColorImage,
    RenderTwilightSkyDarkColorImage,
} from "render/color/image";

import { RenderMakeItAQuoteImage } from "render/makeItAQuote/image";

export const RenderColorKey = [
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
    RenderMakeItAQuoteImage,
] as const;
