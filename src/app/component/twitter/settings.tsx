"use client";
import { type TwitterJSX } from "app/api/twitter/route";
import Link from 'next/link';
import { useState } from "react";


const themeKey = ["video-false", "video-true"] as const;
export type ThemeKeyType = typeof themeKey[number];

type TwitterJSXProps = Parameters<typeof TwitterJSX>[0];

export const TwitterSettings = ({ tweetId, theme }: TwitterJSXProps) => {
    const [id, setId] = useState(tweetId);
    const [selectedTheme, setTheme] = useState(theme);

    const getURL = () => {
        const url = new URL(window.location.href);
        url.pathname = `/${id}`
        url.searchParams.set("theme", selectedTheme);
        return url.href;
    }

    return (
        <>
            <input value={id} onChange={(e) => setId(e.target.value)} />
            <select value={selectedTheme} onChange={(e) => setTheme(e.target.value as ThemeKeyType)}>
                {
                    themeKey.map((e) => (
                        <option key={e} value={e}>{e}</option>
                    ))
                }
            </select>
            <Link href={getURL()} >
                <button>Apply</button>
            </Link>
        </>
    );
}
