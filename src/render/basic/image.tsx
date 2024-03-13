import split from "graphemesplit";
import React from "react";
import { TweetImageRenderType, TweetRenderImage } from "render/base/image";
import { NoteTweetResultRichTextTagRichtextTypesEnum as RichtextTypesEnum } from "twitter-openapi-typescript-generated";
import { getBiggerMedia, getResizedMediaByWidth } from "utils/utils";

export type RenderBasicImageParam = {
    width: number;
    video?: boolean;
};

export class RenderBasicImage extends TweetRenderImage {
    width: NonNullable<RenderBasicImageParam["width"]>;
    video: NonNullable<RenderBasicImageParam["video"]>;

    constructor(props: RenderBasicImageParam) {
        super();
        this.width = props.width;
        this.video = props.video ?? false;
    }

    render: TweetImageRenderType = ({ data }) => {
        const icon = data.user.legacy.profileImageUrlHttps;
        const name = data.user.legacy.name;
        const id = data.user.legacy.screenName;
        const lang = data.tweet.legacy!.lang;

        return (
            <div
                lang={lang}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    padding: 20,
                    background:
                        "linear-gradient(-45deg, #0077F2ee 0%, #1DA1F2ee 50%,#4CFFE2ee 100%)",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        background: "white",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "10px",
                        padding: "12px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <img
                            alt="icon"
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                marginRight: "12px",
                            }}
                            src={icon}
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "15px",
                                    fontWeight: "700",
                                    margin: "0px",
                                }}
                            >
                                {name}
                            </p>
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
                    <this.tweetRender data={data} />
                </div>
            </div>
        );
    };

    tweetRender: TweetImageRenderType = ({ data }) => {
        const note = data.tweet.noteTweet?.noteTweetResults.result;
        const legacy = data.tweet.legacy!;

        const text = note?.text ?? legacy.fullText;

        const noteEntity = note?.entitySet;
        const legacySet = data.tweet.legacy!.entities;
        const extEntities = legacy.extendedEntities;

        const inlineMedia = note?.media?.inlineMedia ?? [];
        const richtextTags = note?.richtext?.richtextTags ?? [];

        const [i, blank] = getBiggerMedia(extEntities?.media ?? []);

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
                remove: this.video && type !== "photo",
                idStr,
                mediaUrlHttps,
            })
        );
        const normalizeNoteMedia = [...(noteEntity?.media ?? [])].map(
            ({ indices, idStr, mediaUrlHttps, type }) => ({
                start: normalizeMap.findIndex(({ array }) => array === indices[0]),
                end: normalizeMap.findIndex(({ array }) => array === indices[1]),
                remove: this.video && type !== "photo",
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

        if (blank && this.video) {
            const resizedMedia = getResizedMediaByWidth(
                blank.videoInfo!.aspectRatio[0],
                blank.videoInfo!.aspectRatio[1],
                this.width - 20 * 2
            );
            insert.push({
                index: trueSplit.length,
                fn: () => (
                    <div
                        key={"biggerMedia"}
                        style={{
                            width: resizedMedia.width,
                            height: resizedMedia.height,
                        }}
                    ></div>
                ),
            });
        }

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
            const link = [...normalizeHashtags, ...normalizeUrls].some(
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

            return {
                char: char,
                index: index,
                properties: {
                    ...(link ? { color: "#1d9bf0" } : {}),
                    ...(bold ? { fontWeight: "700" } : {}),
                    ...(italic ? { italic: "italic" } : {}),
                },
            };
        }, [] as { char: string; properties: React.CSSProperties }[]);

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

        const textElement: React.ReactElement[] = [];

        textDataList.forEach((t, i) => {
            textElement.push(
                <p
                    key={i}
                    style={{
                        fontSize: "17px",
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
                .filter(({ index }) => t.start <= index && index < t.end)
                .forEach(({ fn }) => textElement.push(fn()));
        });

        const last = textDataList[textDataList.length - 1]?.end ?? 0;
        insert
            .filter(({ index }) => index >= last)
            .forEach(({ fn }) => textElement.push(fn()));

        return (
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "12px",
                }}
            >
                {textElement}
            </div>
        );
    };



}