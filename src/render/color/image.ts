import { RenderBasicImage, RenderBasicImageParam } from "../basic/image";

export type RenderColorImageParam = {
  width: number;
  scale?: number;
  video?: boolean;
};

const omitList = [
  "backgroundColor",
  "subBackgroundColor",
  "textColor",
  "subTextColor",
  "borderColor",
  "imageBorderColor",
  "boxShadow",
  "cardSuffix",
] as const;

type RenderColorBaseImageParamOmit = Omit<
  RenderBasicImageParam,
  (typeof omitList)[number]
>;
export type RenderColorBaseImageParam = RenderColorBaseImageParamOmit & {
  dark: boolean;
  shadow: "none" | "dark" | "light";
};

const none = "#ffffff00";

export class RenderColorBaseImage extends RenderBasicImage {
  /*  色の付いたテーマの基底クラス */
  constructor(props: RenderColorBaseImageParam) {
    const boxShadow = (() => {
      switch (props.shadow) {
        case "none":
          return `0px 0px 0px 0px ${none}`;
        case "dark":
          return "0px 0px 20px 0px #00000088";
        case "light":
          return "0px 0px 20px 0px #ffffff88";
      }
    })();

    super({
      ...props,
      boxShadow: boxShadow,
      backgroundColor: props.dark ? "#000000" : "#ffffff",
      subBackgroundColor: props.dark ? "#16181c" : "#f7f9f9",
      textColor: props.dark ? "#ffffff" : "#000000",
      subTextColor: props.dark ? "#71767b" : "#536471",
      borderColor: props.dark ? "#2f3336" : "#cfd9de",
      imageBorderColor: props.dark ? "#000000" : "#e6e6e6",
      cardSuffix: props.dark ? "-dark" : "",
    });
  }
}

export class RenderOceanBlueColorImage extends RenderColorBaseImage {
  /* 海をのような青緑と青のグラデーション */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient:
        "linear-gradient(-45deg, #0077F2ee 0%, #1DA1F2ee 50%,#4CFFE2ee 100%)",
      shadow: "none",
      dark: false,
    });
  }
}

export class RenderOceanBlueDarkColorImage extends RenderColorBaseImage {
  /* 海をのような青緑と青のグラデーション */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient:
        "linear-gradient(-45deg, #0077F2ee 0%, #1DA1F2ee 50%,#4CFFE2ee 100%)",
      shadow: "dark",
      dark: true,
    });
  }
}

export class RenderSunsetGardenColorImage extends RenderColorBaseImage {
  /* 夕暮れの庭園のような緑とオレンジのグラデーション */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient:
        "linear-gradient(135deg, #ffced6 0%, #ffdeba 50%, #b5f4b5 100%)",
      shadow: "none",
      dark: false,
    });
  }
}

export class RenderSunsetGardenDarkColorImage extends RenderColorBaseImage {
  /* 夕暮れの庭園のような緑とオレンジのグラデーション */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient:
        "linear-gradient(135deg, #ffced6 0%, #ffdeba 50%, #b5f4b5 100%)",
      shadow: "dark",
      dark: true,
    });
  }
}

export class RenderDawnBlossomColorImage extends RenderColorBaseImage {
  /* 夜明けの花のような赤とピンクのグラデーション */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient: "linear-gradient(45deg, #ffd5dc 0%, #aa55aa 100%)",
      shadow: "none",
      dark: false,
    });
  }
}

export class RenderDawnBlossomDarkColorImage extends RenderColorBaseImage {
  /* 夜明けの花のような赤とピンクのグラデーション */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient: "linear-gradient(45deg, #ffd5dc 0%, #aa55aa 100%)",
      shadow: "dark",
      dark: true,
    });
  }
}

export class RenderFierySunsetColorImage extends RenderColorBaseImage {
  /* 炎のような赤とオレンジのグラデーション */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient: "linear-gradient(135deg, #FF0000aa 0%, #FFA500aa 100%)",
      shadow: "none",
      dark: false,
    });
  }
}

export class RenderFierySunsetDarkColorImage extends RenderColorBaseImage {
  /* 炎のような赤とオレンジのグラデーション */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient: "linear-gradient(135deg, #FF0000aa 0%, #FFA500aa 100%)",
      shadow: "dark",
      dark: true,
    });
  }
}

export class RenderTwilightSkyColorImage extends RenderColorBaseImage {
  /* 薄明の空のような青と紫のグラデーション */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient: "linear-gradient(-45deg, #0077F2ee 0%,#c783ebee 100%)",
      shadow: "none",
      dark: false,
    });
  }
}

export class RenderTwilightSkyDarkColorImage extends RenderColorBaseImage {
  /* 薄明の空のような青と紫のグラデーション */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient: "linear-gradient(-45deg, #0077F2ee 0%,#c783ebee 100%)",
      shadow: "dark",
      dark: true,
    });
  }
}

export class RenderPlainColorImage extends RenderColorBaseImage {
  /* 無地 */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient: "#ffffff",
      shadow: "dark",
      dark: false,
    });
  }
}

export class RenderPlainDarkColorImage extends RenderColorBaseImage {
  /* 無地 */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient: "#000000",
      shadow: "light",
      dark: true,
    });
  }
}

export class RenderTransparentImage extends RenderColorBaseImage {
  /* 透明 */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient: none,
      shadow: "none",
      dark: false,
    });
  }
}

export class RenderTransparentDarkImage extends RenderColorBaseImage {
  /* 透明 */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient: none,
      shadow: "none",
      dark: true,
    });
  }
}

export class RenderTransparentShadowImage extends RenderColorBaseImage {
  /* 透明 */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient: none,
      shadow: "dark",
      dark: false,
    });
  }
}

export class RenderTransparentShadowDarkImage extends RenderColorBaseImage {
  /* 透明 */
  constructor(props: RenderColorImageParam) {
    super({
      ...props,
      gradient: none,
      shadow: "dark",
      dark: true,
    });
  }
}
