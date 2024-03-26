import { FFmpegInfrastructure } from "../../infrastructure/ffmpeg";
import { TweetRenderVideo, TweetVideoRenderType } from "../base/video";

export type RenderColorBaseVideoParam = {
  ffmpeg?: FFmpegInfrastructure;
};

export class RenderColorBaseVideo extends TweetRenderVideo {
  /*  カラーのテーマの動画クラス */
  constructor(props: RenderColorBaseVideoParam) {
    super(props.ffmpeg);
  }

  render: TweetVideoRenderType = () => {
    throw new Error("Method not implemented.");
  };
}
