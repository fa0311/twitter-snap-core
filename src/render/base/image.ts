import { TweetApiUtilsData } from "twitter-openapi-typescript";

export type TweetImageRenderType = (props: { data: TweetApiUtilsData }) => React.ReactElement;

export abstract class TweetRenderImage {
    abstract render: TweetImageRenderType;
}