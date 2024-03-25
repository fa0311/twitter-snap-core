import { FFmpegInfrastructure } from "../../infrastructure/ffmpeg";
import { TweetRenderVideo, TweetVideoRenderType } from "../../render/base/video";

export type RenderColorBaseVideoParam = {
    ffmpeg?: FFmpegInfrastructure;
};

export class RenderColorBaseVideo extends TweetRenderVideo {

    constructor(props: RenderColorBaseVideoParam) {
        super(props.ffmpeg);
    }

    render: TweetVideoRenderType = () => {
        throw new Error("Method not implemented.");
    };
}

