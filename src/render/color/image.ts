
import { RenderBasicImage, RenderBasicImageParam } from '../basic/image';

export type RenderColorImageParam = {
    width: number;
    video?: boolean;
};


const omitList = ["backgroundColor", "textColor", "subTextColor", "borderColor", "imageBorderColor", "boxShadow"] as const;
export type RenderColorBaseImageParam = Omit<RenderBasicImageParam, typeof omitList[number]> & { dark: boolean, shadow: 'none' | 'dark' | 'light' };

const none = "#ffffff00";

export class RenderColorBaseImage extends RenderBasicImage {
    /*  色の付いたテーマの基底クラス */
    static theme = "color-base";
    static description = "Colored theme base class";

    constructor(props: RenderColorBaseImageParam) {
        const boxShadow = (() => {
            switch (props.shadow) {
                case 'none':
                    return `0px 0px 0px 0px ${none}`;
                case 'dark':
                    return '0px 0px 20px 0px #00000088';
                case 'light':
                    return '0px 0px 20px 0px #ffffff88';
            }
        })();

        super({
            ...props,
            boxShadow: boxShadow,
            backgroundColor: props.dark ? "#000000" : "#ffffff",
            textColor: props.dark ? "#ffffff" : "#000000",
            subTextColor: props.dark ? "#71767b" : "#536471",
            borderColor: props.dark ? "#2f3336" : "#cfd9de",
            imageBorderColor: props.dark ? "#000000" : "#e6e6e6",
        });
    }
}

export class RenderOceanBlueColorImage extends RenderColorBaseImage {
    /* 海をのような青緑と青のグラデーション */
    static theme = "ocean-blue" as const;
    static description = "Ocean-like blue-green and blue gradient";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: "linear-gradient(-45deg, #0077F2ee 0%, #1DA1F2ee 50%,#4CFFE2ee 100%)",
            shadow: 'none',
            dark: false
        });
    }
}

export class RenderOceanBlueDarkColorImage extends RenderColorBaseImage {
    /* 海をのような青緑と青のグラデーション */
    static theme = "ocean-blue-dark" as const;
    static description = "Ocean-like blue-green and blue gradient";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: "linear-gradient(-45deg, #0077F2ee 0%, #1DA1F2ee 50%,#4CFFE2ee 100%)",
            shadow: 'dark',
            dark: true
        });
    }
}




export class RenderSunsetGardenColorImage extends RenderColorBaseImage {
    /* 夕暮れの庭園のような緑とオレンジのグラデーション */
    static theme = "sunset-garden" as const;
    static description = "Green and orange gradient like a sunset garden";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: "linear-gradient(135deg, #FFB6C1aa 0%, #ff9d3055 50%, #90EE90aa 100%)",
            shadow: 'none',
            dark: false
        });
    }
}


export class RenderSunsetGardenDarkColorImage extends RenderColorBaseImage {
    /* 夕暮れの庭園のような緑とオレンジのグラデーション */
    static theme = "sunset-garden-dark" as const;
    static description = "Green and orange gradient like a sunset garden";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: "linear-gradient(135deg, #FFB6C1aa 0%, #ff9d3055 50%, #90EE90aa 100%)",
            shadow: 'dark',
            dark: true
        });
    }
}



export class RenderDawnBlossomColorImage extends RenderColorBaseImage {
    /* 夜明けの花のような赤とピンクのグラデーション */
    static theme = "dawn-blossom" as const;
    static description = "Red and pink gradient like dawn flowers";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: "linear-gradient(45deg, #ffd5dc 0%, #aa55aa 100%)",
            shadow: 'none',
            dark: false
        });
    }
}

export class RenderDawnBlossomDarkColorImage extends RenderColorBaseImage {
    /* 夜明けの花のような赤とピンクのグラデーション */
    static theme = "dawn-blossom-dark" as const;
    static description = "Red and pink gradient like dawn flowers";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: "linear-gradient(45deg, #ffd5dc 0%, #aa55aa 100%)",
            shadow: 'dark',
            dark: true
        });
    }
}

export class RenderFierySunsetColorImage extends RenderColorBaseImage {
    /* 炎のような赤とオレンジのグラデーション */
    static theme = "fiery-sunset" as const;
    static description = "Red and orange gradient like flames";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: "linear-gradient(135deg, #FF0000aa 0%, #FFA500aa 100%)",
            shadow: 'none',
            dark: false
        });
    }
}


export class RenderFierySunsetDarkColorImage extends RenderColorBaseImage {
    /* 炎のような赤とオレンジのグラデーション */
    static theme = "fiery-sunset-dark" as const;
    static description = "Red and orange gradient like flames";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: "linear-gradient(135deg, #FF0000aa 0%, #FFA500aa 100%)",
            shadow: 'dark',
            dark: true
        });
    }
}



export class RenderTwilightSkyColorImage extends RenderColorBaseImage {
    /* 薄明の空のような青と紫のグラデーション */
    static theme = "twilight-sky" as const;
    static description = "Blue and purple gradient like twilight sky";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: "linear-gradient(-45deg, #0077F2ee 0%,#c783ebee 100%)",
            shadow: 'none',
            dark: false
        });
    }
}


export class RenderTwilightSkyDarkColorImage extends RenderColorBaseImage {
    /* 薄明の空のような青と紫のグラデーション */
    static theme = "twilight-sky-dark" as const;
    static description = "Blue and purple gradient like twilight sky";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: "linear-gradient(-45deg, #0077F2ee 0%,#c783ebee 100%)",
            shadow: 'none',
            dark: true
        });
    }
}


export class RenderPlainColorImage extends RenderColorBaseImage {
    /* 無地 */
    static theme = "plain" as const;
    static description = "Plain";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: "#ffffff",
            shadow: 'dark',
            dark: false
        });
    }
}


export class RenderPlainDarkColorImage extends RenderColorBaseImage {
    /* 無地 */
    static theme = "plain-dark" as const;
    static description = "Plain";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: "#000000",
            shadow: 'light',
            dark: true
        });
    }
}

export class RenderTransparentImage extends RenderColorBaseImage {
    /* 透明 */
    static theme = "transparent" as const;
    static description = "Transparent";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: none,
            shadow: 'none',
            dark: false
        });
    }
}

export class RenderTransparentDarkImage extends RenderColorBaseImage {
    /* 透明 */
    static theme = "transparent-dark" as const;
    static description = "Transparent";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: none,
            shadow: 'none',
            dark: true
        });
    }
}

export class RenderTransparentShadowImage extends RenderColorBaseImage {
    /* 透明 */
    static theme = "transparent-shadow" as const;
    static description = "Transparent";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: none,
            shadow: 'dark',
            dark: false
        });
    }
}

export class RenderTransparentShadowDarkImage extends RenderColorBaseImage {
    /* 透明 */
    static theme = "transparent-shadow-dark" as const;
    static description = "Transparent";

    constructor(props: RenderColorImageParam) {
        super({
            ...props,
            gradient: none,
            shadow: 'dark',
            dark: true
        });
    }
}


