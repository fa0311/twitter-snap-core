import React from "react";
import { TweetApiUtilsData } from "twitter-openapi-typescript";

export type TweetImageRenderType = (props: { data: TweetApiUtilsData }) => React.ReactElement;

export abstract class TweetRenderImage {
    static readonly themeName: string;
    static readonly description: string;

    static window = false;

    get window() {
        return TweetRenderImage.window;
    }
    abstract render: TweetImageRenderType;
}