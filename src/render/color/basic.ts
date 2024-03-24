import { TweetRender, TweetRenderMerge } from "../base/base";
import { RenderBasicVideo, RenderBasicVideoParam } from "../basic/video";
import {
  RenderBrightSpaceColorImage,
  RenderColorParam,
  RenderDarkTwilightSkyColorImage,
  RenderDarkVoidColorImage,
  RenderDawnBlossomColorImage,
  RenderFierySunsetColorImage,
  RenderOceanBlueColorImage,
  RenderSunsetGardenColorImage,
  RenderTwilightMoonColorImage,
  RenderTwilightSkyColorImage,
} from "./image";





export type RenderBasicParam = TweetRenderMerge<RenderColorParam & RenderBasicVideoParam>;

export class RenderOceanBlueColor extends TweetRender {
  constructor(props: RenderBasicParam) {
    super({ image: new RenderOceanBlueColorImage(props), video: new RenderBasicVideo(props) });
  }
}
export class RenderSunsetGardenColor extends TweetRender {
  constructor(props: RenderBasicParam) {
    super({ image: new RenderSunsetGardenColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderDawnBlossomColor extends TweetRender {
  constructor(props: RenderBasicParam) {
    super({ image: new RenderDawnBlossomColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderFierySunsetColor extends TweetRender {
  constructor(props: RenderBasicParam) {
    super({ image: new RenderFierySunsetColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderTwilightSkyColor extends TweetRender {
  constructor(props: RenderBasicParam) {
    super({ image: new RenderTwilightSkyColorImage(props), video: new RenderBasicVideo(props) });
  }
}


export class RenderDarkVoidColor extends TweetRender {
  constructor(props: RenderBasicParam) {
    super({ image: new RenderDarkVoidColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderBrightSpaceColor extends TweetRender {
  constructor(props: RenderBasicParam) {
    super({ image: new RenderBrightSpaceColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderTwilightMoonColor extends TweetRender {
  constructor(props: RenderBasicParam) {
    super({ image: new RenderTwilightMoonColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderDarkTwilightSkyColor extends TweetRender {
  constructor(props: RenderBasicParam) {
    super({ image: new RenderDarkTwilightSkyColorImage(props), video: new RenderBasicVideo(props) });
  }
}



