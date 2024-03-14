import { TweetRender, TweetRenderMerge } from "../base/base.js";
import { RenderBasicImage, RenderBasicImageParam } from "./image.js";
import { RenderBasicVideo, RenderBasicVideoParam } from "./video.js";




export type RenderBasicParam = TweetRenderMerge<RenderBasicImageParam & RenderBasicVideoParam>;

export class RenderBasic extends TweetRender {
  constructor(props: RenderBasicParam) {
    super({ image: new RenderBasicImage(props), video: new RenderBasicVideo(props) });
  }
}
