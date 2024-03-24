
import { RenderBasicImage, RenderBasicImageParam } from '../basic/image';

export type RenderColorParam = {
    width: number;
    video?: boolean;
};


const omitList = ["backgroundColor", "textColor", "subTextColor", "borderColor", "imageBorderColor"] as const;
export type RenderColorImageParam = Omit<RenderBasicImageParam, typeof omitList[number]>


const none = "#ffffff00";

export class RenderColorImage extends RenderBasicImage {
    constructor(props: RenderColorImageParam, dark: boolean) {
        super({
            ...props,
            backgroundColor: dark ? "#000000" : "#ffffff",
            textColor: dark ? "#ffffff" : "#000000",
            subTextColor: dark ? "#71767b" : "#536471",
            borderColor: dark ? "#2f3336" : "#cfd9de",
            imageBorderColor: dark ? "#000000" : "#e6e6e6",
        });
    }
}

export class RenderOceanBlueColorImage extends RenderColorImage {
    constructor(props: RenderColorParam) {
        super({
            ...props,
            gradient: "linear-gradient(-45deg, #0077F2ee 0%, #1DA1F2ee 50%,#4CFFE2ee 100%)",
            boxShadow: none,
        }, false);
    }
}

export class RenderSunsetGardenColorImage extends RenderColorImage {
    constructor(props: RenderColorParam) {
        super({
            ...props,
            gradient: "linear-gradient(135deg, #FFB6C1aa 0%, #ff9d3055 50%, #90EE90aa 100%)",
            boxShadow: none,
        }, false);
    }
}

export class RenderDawnBlossomColorImage extends RenderColorImage {
    constructor(props: RenderColorParam) {
        super({
            ...props,
            gradient: "linear-gradient(45deg, #FFC0CBaa 0%, #800080aa 100%)",
            boxShadow: none,
        }, false);
    }
}


export class RenderFierySunsetColorImage extends RenderColorImage {
    constructor(props: RenderColorParam) {
        super({
            ...props,
            gradient: "linear-gradient(90deg, #FF0000aa 0%, #FFA500aa 100%)",
            boxShadow: none,
        }, false);
    }
}

export class RenderTwilightSkyColorImage extends RenderColorImage {
    constructor(props: RenderColorParam) {
        super({
            ...props,
            gradient: "linear-gradient(-45deg, #0077F2ee 0%,#c783ebee 100%)",
            boxShadow: none,
        }, false);
    }
}


export class RenderDarkVoidColorImage extends RenderColorImage {
    constructor(props: RenderColorParam) {
        super({
            ...props,
            gradient: "#000000",
            boxShadow: '0px 0px 20px 0px #ffffff88'
        }, true);
    }
}


export class RenderBrightSpaceColorImage extends RenderColorImage {
    constructor(props: RenderColorParam) {
        super({
            ...props,
            gradient: "#ffffff",
            boxShadow: '0px 0px 20px 0px #00000088'
        }, false);
    }
}




export class RenderTwilightMoonColorImage extends RenderColorImage {
    constructor(props: RenderColorParam) {
        super({
            ...props,
            gradient: "linear-gradient(-45deg, #0077F2ee 0%,#c783ebee 100%)",
            boxShadow: '0px 0px 50px 0px #00000088',
        }, true);
    }
}

export class RenderDarkTwilightSkyColorImage extends RenderColorImage {
    constructor(props: RenderColorParam) {
        super({
            ...props,
            gradient: "linear-gradient(-45deg, #0077F2ee 0%,#c783ebee 100%)",
            boxShadow: '0px 0px 50px 0px #ffffff88',
        }, true);
    }
}





// "0px 0px 50px 0px rgba(0,0,0,0.5)"

// export class RenderOceanBasicImage extends RenderThemeBasicImage {
//     constructor(props: RenderMaterializeBasicParam) {
//         super({
//             ...props,
//             gradient: "linear-gradient(-45deg, #0077F2ee 0%, #1DA1F2ee 50%,#4CFFE2ee 100%)",
//             boxShadow: '0px 0px 50px 0px #00000088'
//         }, true);
//     }
// }