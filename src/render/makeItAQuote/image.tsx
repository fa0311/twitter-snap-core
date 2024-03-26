import split from "graphemesplit";
import React from "react";
import { TweetImageRenderType, TweetRenderImage } from "../../render/base/image";


export type RenderMakeItAQuoteImageParam = {
    width: number;
};


export class RenderMakeItAQuoteImage extends TweetRenderImage {
    width: NonNullable<RenderMakeItAQuoteImageParam["width"]>;

    constructor(props: RenderMakeItAQuoteImageParam) {
        super();
        this.width = props.width;
    }


    textAlign: (() => React.CSSProperties) = () => {
        if (this.window) {
            return { textAlign: "center" }
        } else {
            return { justifyContent: 'center' }
        }
    }


    render: TweetImageRenderType = ({ data }) => {
        const icon = data.user.legacy.profileImageUrlHttps.replace(/_normal.jpg$/, "_400x400.jpg");
        const note = data.tweet.noteTweet?.noteTweetResults.result;
        const legacy = data.tweet.legacy!;
        const text = note?.text ?? legacy.fullText;
        const name = data.user.legacy.name;
        const id = data.user.legacy.screenName;
        return (
            <div
                style={{
                    display: "flex",
                    width: this.width,
                    height: this.width * 0.5,
                    background: "#000000",
                }}
            >
                <img
                    alt="icon"
                    style={{
                        width: this.width * 0.5,
                        height: this.width * 0.5,
                        maskImage: "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))",
                    }}
                    src={icon}
                />
                <div style={{ display: "flex" }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            position: "relative",
                            width: this.width * 0.75 - 20,
                            left: this.width * -0.25,
                        }}
                    >
                        {this.tweetRender({ data })}
                        <p style={{ padding: "14px", margin: "0" }}></p>
                        <p style={{ fontSize: "14px", color: "#ffffff", margin: "0", ...this.textAlign() }}>- {name}</p>
                        <p style={{ fontSize: "14px", color: "#888888", margin: "0", ...this.textAlign() }}>@{id}</p>
                    </div>
                </div>
            </div>
        )
    }



    tweetRender: TweetImageRenderType = ({ data }) => {

        const note = data.tweet.noteTweet?.noteTweetResults.result;
        const legacy = data.tweet.legacy!;
        const text = note?.text ?? legacy.fullText;
        const trueSplit = split(text).map((char, index) => ({ char, index }));

        const textDataList: string[][] = [];

        trueSplit.forEach((data, i) => {

            if (i === 0) {
                textDataList.push([data.char]);
            } else {
                const last = textDataList.pop()!;
                const add: string[][] = [];

                if (data.char.match(/[0-9a-zA-Z\.\/]/)) {
                    last.push(data.char);
                } else if (data.char === " ") {
                    last.push(data.char);
                    add.push([]);
                } else {
                    add.push([data.char]);
                }

                textDataList.push(last);
                add.forEach((data) => textDataList.push(data));
            }
        });

        return (
            <p style={{ display: "flex", margin: "0", justifyContent: "center", flexWrap: "wrap" }}>
                {textDataList.map((data, i) => {
                    const n = (data.length == 1 && data[0] == "\n");
                    const last = i > 0 && textDataList[i - 1];
                    const lastN = last && (last.length == 1 && last[0] == "\n");

                    return (
                        <span
                            key={i}
                            style={{
                                display: "flex",
                                fontSize: "20px",
                                color: "#ffffff",
                                margin: "0",
                                ...(n ? { width: "100%" } : {}),
                                ...(lastN ? { height: "1em" } : {}),

                            }}
                        >
                            {data.map((char, i) => <span
                                key={i}
                                style={{
                                    ...(char == " " ? { width: "0.25em" } : {}),
                                }}
                            >
                                {char}
                            </span>)}
                        </span>
                    )
                })}
            </ p>
        )

    }

}