
import {
  RenderColorBaseImageParam,
  RenderColorImageParam,
  RenderTransparentShadowDarkImage,
  RenderTransparentShadowImage
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



export class RenderOceanBlueColor extends TweetRender {
  static readonly themeName = "ocean-blue" as const;
  static readonly description = "Ocean Blue theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderOceanBlueColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderOceanBlueDarkColor extends TweetRender {
  static readonly themeName = "ocean-blue-dark" as const;
  static readonly description = "Ocean Blue Dark theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderOceanBlueDarkColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderSunsetGardenColor extends TweetRender {
  static readonly themeName = "sunset-garden" as const;
  static readonly description = "Sunset Garden theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderSunsetGardenColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderSunsetGardenDarkColor extends TweetRender {
  static readonly themeName = "sunset-garden-dark" as const;
  static readonly description = "Sunset Garden Dark theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderSunsetGardenDarkColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderDawnBlossomColor extends TweetRender {
  static readonly themeName = "dawn-blossom" as const;
  static readonly description = "Dawn Blossom theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderDawnBlossomColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderDawnBlossomDarkColor extends TweetRender {
  static readonly themeName = "dawn-blossom-dark" as const;
  static readonly description = "Dawn Blossom Dark theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderDawnBlossomDarkColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderFierySunsetColor extends TweetRender {
  static readonly themeName = "fiery-sunset" as const;
  static readonly description = "Fiery Sunset theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderFierySunsetColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderFierySunsetDarkColor extends TweetRender {
  static readonly themeName = "fiery-sunset-dark" as const;
  static readonly description = "Fiery Sunset Dark theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderFierySunsetDarkColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderTwilightSkyColor extends TweetRender {
  static readonly themeName = "twilight-sky" as const;
  static readonly description = "Twilight Sky theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderTwilightSkyColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderTwilightSkyDarkColor extends TweetRender {
  static readonly themeName = "twilight-sky-dark" as const;
  static readonly description = "Twilight Sky Dark theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderTwilightSkyDarkColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderPlainColor extends TweetRender {
  static readonly themeName = "plain" as const;
  static readonly description = "Plain theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderPlainColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderPlainDarkColor extends TweetRender {
  static readonly themeName = "plain-dark" as const;
  static readonly description = "Plain Dark theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderPlainDarkColorImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderTransparentDark extends TweetRender {
  static readonly themeName = "transparent-dark" as const;
  static readonly description = "Transparent Dark theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderTransparentDarkImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderTransparent extends TweetRender {
  static readonly themeName = "transparent" as const;
  static readonly description = "Transparent theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderTransparentImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderTransparentShadow extends TweetRender {
  static readonly themeName = "transparent-shadow" as const;
  static readonly description = "Transparent Shadow theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderTransparentShadowImage(props), video: new RenderBasicVideo(props) });
  }
}

export class RenderTransparentDarkShadow extends TweetRender {
  static readonly themeName = "transparent-dark-shadow" as const;
  static readonly description = "Transparent Dark Shadow theme";

  constructor(props: RenderColorParam) {
    super({ image: new RenderTransparentShadowDarkImage(props), video: new RenderBasicVideo(props) });
  }
}