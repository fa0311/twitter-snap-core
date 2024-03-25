"use client";
import { type TwitterJSX } from "app/api/twitter/route";
import Link from 'next/link';
import { useState } from "react";
import { RenderColorKey } from "../../key";



export type ThemeKeyType = typeof RenderColorKey[number]["theme"];

type TwitterJSXProps = Parameters<typeof TwitterJSX>[0];

export const TwitterSettings = ({ tweetId, theme }: TwitterJSXProps) => {
    const [id, setId] = useState(tweetId);
    const [selectedTheme, setTheme] = useState(theme);
    const getURL = () => {
        const param = new URLSearchParams();
        param.append("theme", selectedTheme);
        return `/${id}?${param.toString()}`;
    }

    return (
        <>
            <input value={id} onChange={(e) => setId(e.target.value)} />
            <select value={selectedTheme} onChange={(e) => setTheme(e.target.value as ThemeKeyType)}>
                {
                    RenderColorKey.map((e) => (
                        <option key={e.theme} value={e.theme}>{e.theme}</option>
                    ))
                }
            </select>
            <Link href={getURL()} >
                <button>Apply</button>
            </Link>
        </>
    );
}
