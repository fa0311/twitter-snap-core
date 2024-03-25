
import {
  RenderColorBaseImage,
  RenderColorBaseImageParam,
  RenderColorImageParam,
} from "render/color/image";

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

export class RenderDawnBlossomColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderDawnBlossomColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderDawnBlossomDarkColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderDawnBlossomDarkColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderFierySunsetColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderFierySunsetColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderFierySunsetDarkColor extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderFierySunsetDarkColorImage(props), video: new RenderBasicVideo(props) });
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

export class RenderTransparentDark extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderTransparentDarkImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderTransparent extends TweetRender {
  constructor(props: RenderColorParam) {
    super({ image: new RenderTransparentImage(props), video: new RenderBasicVideo(props) });
  }
}
