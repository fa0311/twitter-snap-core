import split from "graphemesplit";
import React from "react";
import { type TweetRenderMerge } from "render/base/base";
import {
    NoteTweetResultRichTextTagRichtextTypesEnum as RichtextTypesEnum,
    type UserProfileImageShapeEnum
} from "twitter-openapi-typescript-generated";
import { TweetImageRenderType, TweetRenderImage } from "../../render/base/image";
import { getBiggerMedia, getResizedMediaByWidth } from "../../utils/utils";

export type RenderBasicImageParam = {
    width: number;
    video?: boolean;
    background?: string;
};

type TweetImageRenderGenericsType<T> = (props: TweetRenderMerge<Parameters<TweetImageRenderType>[0]> & T) => ReturnType<TweetImageRenderType>
type TweetImageRenderQuotedType = TweetImageRenderGenericsType<{ quoted: boolean }>

export class RenderBasicImage extends TweetRenderImage {
    width: NonNullable<RenderBasicImageParam["width"]>;
    video: NonNullable<RenderBasicImageParam["video"]>;
    background: NonNullable<RenderBasicImageParam["background"]>;
    margin: number = 20;
    padding: number = 12;

    constructor(props: RenderBasicImageParam) {
        super();
        this.width = props.width;
        this.video = props.video ?? false;
        this.background = props.background ?? "linear-gradient(-45deg, #0077F2ee 0%, #1DA1F2ee 50%,#4CFFE2ee 100%)";
    }

    getBadge: TweetImageRenderType = ({ data }) => {
        const src = (() => {
            if (data.user.legacy.verifiedType === "Business") {
                return "https://raw.githubusercontent.com/fa0311/twitter-snap-core/main/assets/twitter/gold-badge.png"
            } else if (data.user.legacy.verifiedType === "Government") {
                return "https://raw.githubusercontent.com/fa0311/twitter-snap-core/main/assets/twitter/gray-badge.png"
            } else {
                return "https://raw.githubusercontent.com/fa0311/twitter-snap-core/main/assets/twitter/blue-badge.png"
            }
        })();
        return (
            <img
                style={{
                    width: "15px", height: "15px", marginTop: "4px"
                }}
                src={src}
            />
        )
    }


    getIconShape: ((props: { type: UserProfileImageShapeEnum }) => React.CSSProperties) = ({ type }) => {
        switch (type) {
            case "Square": {
                return {
                    borderRadius: "4px",
                }
            }
            case "Circle": {
                return {
                    borderRadius: "50%",
                }
            }
            case "Hexagon": {
                return {
                    borderRadius: "50%",
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }
            }
        }
    }

    textOverFlow: ((props: { lineClamp: number }) => React.CSSProperties) = ({ lineClamp }) => {
        return {
            display: this.window ? "-webkit-box" : "block",
            WebkitLineClamp: lineClamp,
            lineClamp: lineClamp,
            WebkitBoxOrient: "vertical",
            overflow: 'hidden',
        }
    }



    toKMB: ((num: number) => string) = (num) => {
        if (num < 1000) {
            return num.toString();
        } else if (num < 1000000) {
            return (num / 1000).toFixed(1) + "K";
        } else {
            return (num / 1000000).toFixed(1) + "M";
        }
    }


    render: TweetImageRenderType = ({ data }) => {
        const time = data.tweet.legacy!.createdAt;
        const timeString = new Date(time).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        const dateString = new Date(time).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const view = data.tweet.views?.count;
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    padding: this.margin,
                    background: this.background,
                }}
            >
                <div
                    style={{
                        width: "100%",
                        background: "white",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "10px",
                        padding: this.padding,
                        gap: "12px",
                    }}
                >
                    <this.userRender data={data} />
                    {data.tweet.card && (
                        <this.ogp data={data} />
                    )}
                    <p style={{ display: "flex", margin: "0px", gap: "2px" }}>
                        <span style={{ color: "#536471", fontSize: "15px" }}>
                            {timeString}
                        </span>
                        <span style={{ color: "#536471", fontSize: "15px" }}>·</span>
                        <span style={{ color: "#536471", fontSize: "15px" }}>
                            {dateString}
                        </span>
                        {view && (
                            <>
                                <span style={{ color: "#536471", fontSize: "15px" }}>·</span>
                                <span style={{ color: "#536471", fontSize: "15px", fontWeight: "700" }}>{this.toKMB(Number(view))}</span>
                                <span style={{ color: "#536471", fontSize: "15px" }}></span>
                                <span style={{ color: "#536471", fontSize: "15px" }}>Views</span>
                            </>
                        )}
                    </p>
                </div>
            </div>
        );
    };


    ogp: TweetImageRenderType = ({ data }) => {
        const thumbnail = data.tweet.card?.legacy?.bindingValues.find((v) => v.key === "thumbnail_image_original")?.value.imageValue;
        const summary = data.tweet.card?.legacy?.bindingValues.find((v) => v.key === "summary_photo_image_original")?.value.imageValue;
        const player = data.tweet.card?.legacy?.bindingValues.find((v) => v.key === "player_image_large")?.value.imageValue;
        const title = data.tweet.card?.legacy?.bindingValues.find((v) => v.key === "title")?.value.stringValue;
        const domain = data.tweet.card?.legacy?.bindingValues.find((v) => v.key === "domain")?.value.stringValue;
        const vanityUrl = data.tweet.card?.legacy?.bindingValues.find((v) => v.key === "vanity_url")?.value.stringValue;
        const description = data.tweet.card?.legacy?.bindingValues.find((v) => v.key === "description")?.value.stringValue;


        // data.tweet.card?.legacy?.bindingValues.forEach((v) => {
        //     console.log(v.key, v.value);
        // });

        if (summary) {
            return (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative" }}>
                        <img
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "10px",
                                border: "1px solid #e6e6e6",

                            }}
                            src={summary.url}
                        />
                        <p style={{
                            fontSize: "13px",
                            position: "absolute",
                            margin: "0px",
                            bottom: "12px",
                            left: "12px",
                            padding: "0px 4px",
                            background: "rgba(0, 0, 0, 0.77)",
                            color: "white",
                            borderRadius: "4px",
                            ...this.textOverFlow({ lineClamp: 1 }),
                        }}>{title}</p>
                    </div>
                    <p style={{
                        fontSize: "13px",
                        margin: "0px",
                        color: "#536471",
                    }}>
                        From {vanityUrl}
                    </p>
                </div>
            )
        }
        if (player || thumbnail) {
            const size = 129;
            const url = player?.url ?? thumbnail?.url;

            return (
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    borderRadius: "10px",
                    border: "1px solid rgb(207, 217, 222)"
                }}>
                    <img
                        style={{
                            width: size,
                            height: size,
                            borderRadius: "10px 0px 0px 10px",
                            objectFit: "cover",
                            borderRight: "1px solid rgb(207, 217, 222)"
                        }}
                        src={url}
                    />
                    <div style={{
                        padding: "12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        justifyContent: "center",
                        width: this.width - (this.margin + this.padding) * 2 - size,
                    }}>
                        <p style={{
                            widows: "100%",
                            fontSize: "15px",
                            margin: "0px",
                            color: "rgb(83, 100, 113)",
                            ...this.textOverFlow({ lineClamp: 1 }),
                        }}>{vanityUrl}</p>
                        <p style={{
                            fontSize: "15px",
                            margin: "0px",
                            color: "rgb(15, 20, 25)",
                            ...this.textOverFlow({ lineClamp: 1 }),
                        }}>{title}</p>
                        <p style={{
                            fontSize: "15px",
                            margin: "0px",
                            color: "rgb(83, 100, 113)",
                            ...this.textOverFlow({ lineClamp: 2 }),
                        }}>{description}</p>
                    </div>
                </div>
            )

        }
        return <p>ERROR</p>
    }



    username: TweetImageRenderType = ({ data }) => {
        const name = data.user.legacy.name;
        const label = data.user.affiliatesHighlightedLabel?.label?.badge?.url;
        return (
            <div style={{
                display: "flex",
                gap: "4px",
            }}>
                <p
                    style={{
                        margin: "0px",
                        fontSize: "15px",
                        fontWeight: "700",
                    }}
                >
                    {name}
                </p>
                {(data.user.isBlueVerified || data.user.legacy.verified) && this.getBadge({ data })}
                {label && (
                    <img
                        style={{
                            width: "15px",
                            height: "15px",
                            border: "1px solid #e6e6e6",
                            marginTop: "4px",
                        }}
                        src={label}
                    />
                )
                }
            </div>
        )
    }

    userRender: TweetImageRenderType = ({ data }) => {
        const icon = data.user.legacy.profileImageUrlHttps;
        const name = data.user.legacy.name;
        const id = data.user.legacy.screenName;

        const legacy = data.tweet.legacy!;
        const extEntities = legacy.extendedEntities;


        const videoBlank = (() => {
            const [i, blank] = getBiggerMedia(extEntities?.media ?? []);
            if (blank && this.video) {
                const resizedMedia = getResizedMediaByWidth(
                    blank.videoInfo!.aspectRatio[0],
                    blank.videoInfo!.aspectRatio[1],
                    this.width - 20 * 2
                );
                return (
                    <div style={{
                        display: "flex",
                        width: resizedMedia.width,
                        height: resizedMedia.height,
                    }}
                    ></div>
                )
            }
        })();

        return (
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                    <img
                        alt="icon"
                        style={{
                            width: "40px",
                            height: "40px",
                            margin: "4px",
                            ...this.getIconShape({ type: data.user.profileImageShape })
                        }}
                        src={icon}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {this.username({ data })}
                        <p
                            style={{ fontSize: "15px", margin: "0px", color: "#536471" }}
                        >
                            @{id}
                        </p>
                    </div>
                </div>
                <this.tweetRender data={data} quoted={false} />
                {data.quoted && (
                    <div style={{ border: "1px solid #e6e6e6", borderRadius: "16px", padding: "10px", display: "flex" }}>
                        <this.quotedRender data={data.quoted} />
                    </div>
                )}
                {videoBlank}
            </div>
        );
    }



    quotedRender: TweetImageRenderType = ({ data }) => {
        const icon = data.user.legacy.profileImageUrlHttps;
        const name = data.user.legacy.name;
        const id = data.user.legacy.screenName;
        return (
            <div style={{ display: "flex", gap: "2px", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                    <img
                        alt="icon"
                        style={{
                            width: "24px",
                            height: "24px",
                            margin: "4px",
                            ...this.getIconShape({ type: data.user.profileImageShape })
                        }}
                        src={icon}
                    />
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                        }}
                    >
                        {this.username({ data })}
                        <p
                            style={{
                                fontSize: "15px",
                                margin: "0px",
                                color: "#536471",
                            }}
                        >
                            @{id}
                        </p>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <this.tweetRender data={data} quoted={true} />
                </div>
            </div>
        );
    }


    tweetRender: TweetImageRenderQuotedType = ({ data, quoted }) => {
        const note = data.tweet.noteTweet?.noteTweetResults.result;
        const legacy = data.tweet.legacy!;

        const text = note?.text ?? legacy.fullText;

        const noteEntity = note?.entitySet;
        const legacySet = data.tweet.legacy!.entities;
        const extEntities = legacy.extendedEntities;

        const inlineMedia = note?.media?.inlineMedia ?? [];
        const richtextTags = note?.richtext?.richtextTags ?? [];

        const video = this.video && !quoted;

        const normalizeMap: {
            array: number;
            str: number;
        }[] = [{ array: 0, str: 0 }];

        const trueSplit = split(text).map((char, index) => ({ char, index }));

        trueSplit.forEach(({ char }) => {
            const last = normalizeMap[normalizeMap.length - 1];
            normalizeMap.push({
                array: Array.from(char).length + last.array,
                str: char.length + last.str,
            });
        });

        const normalizeRichtextTags = richtextTags.map(
            ({ fromIndex, toIndex, richtextTypes }) => ({
                start: normalizeMap.findIndex(({ str }) => str === fromIndex),
                end: normalizeMap.findIndex(({ str }) => str === toIndex),
                type: richtextTypes,
            })
        );

        const normalizeInlineMedia = inlineMedia.map(({ index, mediaId }) => ({
            index: normalizeMap.findIndex(({ str }) => str === index),
            mediaId,
        }));

        const normalizeHashtags = [
            ...(noteEntity?.hashtags ?? []),
            ...(legacySet?.hashtags ?? []),
        ].map(({ indices, tag }) => ({
            start: normalizeMap.findIndex(({ array }) => array === indices[0]),
            end: normalizeMap.findIndex(({ array }) => array === indices[1]),
            tag,
        }));

        const normalizeMedia = [...(extEntities?.media ?? [])].map(
            ({ indices, idStr, mediaUrlHttps, type }) => ({
                start: normalizeMap.findIndex(({ array }) => array === indices[0]),
                end: normalizeMap.findIndex(({ array }) => array === indices[1]),
                remove: video && type !== "photo",
                idStr,
                mediaUrlHttps,
            })
        );
        const normalizeNoteMedia = [...(noteEntity?.media ?? [])].map(
            ({ indices, idStr, mediaUrlHttps, type }) => ({
                start: normalizeMap.findIndex(({ array }) => array === indices[0]),
                end: normalizeMap.findIndex(({ array }) => array === indices[1]),
                remove: video && type !== "photo",
                idStr,
                mediaUrlHttps,
            })
        );

        const normalizeUrls = [
            ...(noteEntity?.urls ?? []),
            ...(legacySet?.urls ?? []),
        ].map(({ indices, displayUrl }) => ({
            start: normalizeMap.findIndex(({ array }) => array === indices[0]),
            end: normalizeMap.findIndex(({ array }) => array === indices[1]),
            displayUrl,
        }));

        const normalizeUserMentions = [
            ...(noteEntity?.userMentions ?? []),
            ...(legacySet?.userMentions ?? []),
        ].map(({ indices, screenName }) => ({
            start: normalizeMap.findIndex(({ array }) => array === indices[0]),
            end: normalizeMap.findIndex(({ array }) => array === indices[1]),
            screenName,
        }));

        const charIndices: {
            start: number;
            end: number;
            chars: string[];
        }[] = [];

        const insert: {
            index: number;
            fn: () => React.ReactElement;
        }[] = [];

        normalizeMedia.forEach((m) => {
            const inline = normalizeInlineMedia.find(
                ({ mediaId }) => mediaId === m.idStr
            );

            if (m.remove) {
                charIndices.push({
                    start: m.start,
                    end: m.end,
                    chars: [],
                });
            } else if (inline) {
                insert.push({
                    index: inline.index,
                    fn: () => (
                        <img
                            key={m.idStr}
                            alt="img"
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                                border: "1px solid #e6e6e6",
                            }}
                            src={m.mediaUrlHttps}
                        />
                    ),
                });
            } else if (note) {
                insert.push({
                    index: trueSplit.length,
                    fn: () => (
                        <img
                            key={m.idStr}
                            alt="img"
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                                border: "1px solid #e6e6e6",
                            }}
                            src={m.mediaUrlHttps}
                        />
                    ),
                });
            } else {
                charIndices.push({
                    start: m.start,
                    end: m.end,
                    chars: [],
                });
                insert.push({
                    index: m.start,
                    fn: () => (
                        <img
                            key={m.idStr}
                            alt="img"
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                                border: "1px solid #e6e6e6",
                                marginTop: "12px",
                            }}
                            src={m.mediaUrlHttps}
                        />
                    ),
                });
            }
        });

        normalizeUrls.forEach(({ start, end, displayUrl }) => {
            charIndices.push({
                start: start,
                end: end,
                chars: split(displayUrl),
            });
        });

        const replacedSplit: typeof trueSplit = [];
        trueSplit.forEach(({ char, index }) => {
            const ignore = charIndices.some(
                ({ start, end }) => start <= index && index < end
            );
            if (ignore) {
                const start = charIndices.find(({ start }) => start === index);
                start?.chars.forEach((c) => replacedSplit.push({ char: c, index }));
            } else {
                replacedSplit.push({ char, index });
            }
        });

        const charDataList = replacedSplit.map(({ char, index }) => {
            const link = [...normalizeHashtags, ...normalizeUrls, ...normalizeUserMentions].some(
                ({ start, end }) => start <= index && index < end
            );
            const bold = normalizeRichtextTags.some(
                ({ start, end, type }) =>
                    start <= index && index < end && type.includes(RichtextTypesEnum.Bold)
            );
            const italic = normalizeRichtextTags.some(
                ({ start, end, type }) =>
                    start <= index && index < end && type.includes(RichtextTypesEnum.Italic)
            );
            const properties: React.CSSProperties = {
                ...(link ? { color: "#1d9bf0" } : {}),
                ...(bold ? { fontWeight: "700" } : {}),
                ...(italic ? { fontStyle: "italic" } : {}),
            };
            return {
                char: char,
                index: index,
                properties: properties,
            };
        });

        const textDataList: {
            start: number;
            end: number;
            data: { char: string; properties: React.CSSProperties }[];
        }[] = [];

        charDataList.forEach((data) => {
            const index = data.index;
            const split = insert.some((i) => i.index === index);

            if (split || index === 0) {
                textDataList.push({
                    start: index,
                    end: index + 1,
                    data: [data],
                });
            } else {
                const last = textDataList.pop()!;
                textDataList.push({
                    start: last.start,
                    end: index,
                    data: [...last.data, data],
                });
            }
        });

        // console.log("insert", insert);
        // console.log("charIndices", charIndices);
        // console.log("textDataList", textDataList);
        // console.log("data", data);

        // console.log("insert", insert);
        // textDataList.forEach((e) => {
        //     console.log("start", e.start);
        //     console.log("end", e.end);
        // });

        const textElement: React.ReactElement[] = [];

        textDataList.forEach((t, i) => {

            insert
                .filter(({ index }) => t.start - 1 == index)
                .forEach(({ fn }) => textElement.push(fn()));

            textElement.push(
                <p
                    key={i}
                    style={{
                        fontSize: quoted ? "14px " : "17px",
                        margin: "0px",
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    {t.data.map(({ char, properties }, i) => (
                        <span
                            key={i}
                            style={{
                                ...properties,
                                ...(char == "\n" ? { width: "100%" } : {}),
                                ...(char == " " ? { width: "0.25em" } : {}),
                                ...(char == "\n" && t.data[i - 1]?.char == "\n"
                                    ? { height: "1em" }
                                    : {}),
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </p>
            );

            insert
                .filter(({ index }) => t.end + 1 == index)
                .forEach(({ fn }) => textElement.push(fn()));

        });

        if (textElement.length == 0) {
            insert.forEach(({ fn }) => textElement.push(fn()));
        }
        // } else {
        //     const last = textDataList[textDataList.length - 1];
        //     insert.filter(({ index }) => index > last.end).forEach(({ fn }) => textElement.push(fn()));
        // }

        return (
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {textElement}
            </div>
        );
    };



}