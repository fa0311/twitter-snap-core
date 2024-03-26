import { TweetRender, TweetRenderMerge } from "../base/base";
import { RenderBasicImage, RenderBasicImageParam } from "./image";
import { RenderBasicVideo, RenderBasicVideoParam } from "./video";




export type RenderBasicParam = TweetRenderMerge<RenderBasicImageParam & RenderBasicVideoParam>;

export class RenderBasic extends TweetRender {
  /*  基本のテーマの基底クラス */
  constructor(props: RenderBasicParam) {
    super({ image: new RenderBasicImage(props), video: new RenderBasicVideo(props) });
  }
}
