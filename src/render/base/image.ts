import React from "react";
import { TweetApiUtilsData } from "twitter-openapi-typescript";

export type TweetImageRenderType = (props: { data: TweetApiUtilsData }) => React.ReactElement;

export abstract class TweetRenderImage {
    static window = false;

    static theme = "no name";
    static description = "no description";

    get window() {
        return TweetRenderImage.window;
    }
    abstract render: TweetImageRenderType;
}