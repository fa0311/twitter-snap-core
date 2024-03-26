import { TweetRender, TweetRenderMerge } from "../base/base";
import { RenderMakeItAQuoteImage, RenderMakeItAQuoteImageParam } from "./image";

export type RenderMakeItAQuoteParam =
  TweetRenderMerge<RenderMakeItAQuoteImageParam>;

export class RenderMakeItAQuote extends TweetRender {
  constructor(props: RenderMakeItAQuoteParam) {
    super({
      image: new RenderMakeItAQuoteImage(props),
    });
  }
}
