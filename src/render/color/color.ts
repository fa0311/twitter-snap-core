import {
  RenderColorBaseImage,
  RenderColorBaseImageParam,
  RenderColorImageParam,
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
import { TweetRender, TweetRenderMerge } from "../base/base";
import { RenderBasicVideo, RenderBasicVideoParam } from "../basic/video";


export type RenderColorBaseParam = TweetRenderMerge<RenderColorBaseImageParam & RenderBasicVideoParam>;
export type RenderColorParam = TweetRenderMerge<RenderColorImageParam & RenderBasicVideoParam>;


export class RenderColorBase extends TweetRender {
  constructor(props: RenderColorBaseParam) {
    super({ image: new RenderColorBaseImage(props), video: new RenderBasicVideo(props) });
  }
}


export class RenderOceanBlueColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderOceanBlueColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderOceanBlueDarkColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderOceanBlueDarkColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderOceanBlueShadowColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderOceanBlueShadowColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderOceanBlueShadowDarkColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderOceanBlueShadowDarkColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderSunsetGardenColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderSunsetGardenColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderSunsetGardenDarkColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderSunsetGardenDarkColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderFierySunsetColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderFierySunsetColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderTwilightSkyColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderTwilightSkyColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderTwilightSkyDarkColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderTwilightSkyDarkColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderTwilightSkyShadowColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderTwilightSkyShadowColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderTwilightSkyShadowDarkColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderTwilightSkyShadowDarkColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderPlainColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderPlainColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderPlainDarkColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderPlainDarkColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderTransparent extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderTransparentImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderTransparentDark extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderTransparentDarkImage(props), video: new RenderBasicVideo(props) });
  }
}


