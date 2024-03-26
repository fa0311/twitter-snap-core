import { FFmpegInfrastructure } from "../../infrastructure/ffmpeg";
import { TweetRenderVideo, TweetVideoRenderType } from "../../render/base/video";

export type RenderMakeItAQuotVideoParam = {
    ffmpeg?: FFmpegInfrastructure;
};

export class RenderMakeItAQuoteVideo extends TweetRenderVideo {
    static readonly themeName = "make-it-a-quote" as const;
    static readonly description = "Make it a quote theme";

    constructor(props: RenderMakeItAQuotVideoParam) {
        super(props.ffmpeg);
    }

    render: TweetVideoRenderType = () => {
        throw new Error("Method not implemented.");
    };
}

