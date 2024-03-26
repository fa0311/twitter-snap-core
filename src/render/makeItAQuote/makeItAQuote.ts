import { TweetRender, TweetRenderMerge } from "../base/base";
import { RenderMakeItAQuoteImage, RenderMakeItAQuoteImageParam } from "./image";
import { RenderMakeItAQuotVideoParam, RenderMakeItAQuoteVideo } from "./video";




export type RenderMakeItAQuoteParam = TweetRenderMerge<RenderMakeItAQuoteImageParam & RenderMakeItAQuotVideoParam>;

export class RenderMakeItAQuote extends TweetRender {
  static readonly themeName = "make-it-a-quote" as const;
  static readonly description = "Make it a quote theme";

  constructor(props: RenderMakeItAQuoteParam) {
    super({ image: new RenderMakeItAQuoteImage(props), video: new RenderMakeItAQuoteVideo(props) });
  }
}
