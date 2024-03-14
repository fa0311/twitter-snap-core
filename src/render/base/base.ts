import { TweetImageRenderType, TweetRenderImage } from "./image.js";
import { TweetRenderVideo, TweetVideoRenderType } from "./video.js";


export type TweetRenderMerge<T> = {
    [K in keyof T]: T[K]
}

export type TweetRenderParam = {
    image: TweetRenderImage;
    video: TweetRenderVideo;
};

export abstract class TweetRender {
    imageRender: TweetImageRenderType;
    videoRender: TweetVideoRenderType;
    constructor(props: TweetRenderParam) {
        this.imageRender = props.image.render;
        this.videoRender = props.video.render;
    }
}


