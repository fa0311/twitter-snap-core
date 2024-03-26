import { TweetApiUtilsData } from "twitter-openapi-typescript";
import { FFmpegInfrastructure } from "../../infrastructure/ffmpeg";

export type TweetVideoRenderType = (props: {
    data: TweetApiUtilsData,
    image: string,
    output: string,
}) => Promise<{
    temp: string[];
}>;

export abstract class TweetRenderVideo {
    static readonly themeName: string;
    static readonly description: string;

    ffmpeg: FFmpegInfrastructure;

    constructor(ffmpeg?: FFmpegInfrastructure) {
        this.ffmpeg = ffmpeg ?? new FFmpegInfrastructure();
    }
    abstract render: TweetVideoRenderType;
}
