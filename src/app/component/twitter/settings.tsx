"use client";
import { type TwitterJSX } from "app/api/twitter/route";
import Link from 'next/link';
import { useState } from "react";


const themeKey = [
    "ocean-blue",
    "sunset-garden",
    "dawn-blossom",
    "fiery-sunset",
    "twilight-sky",
    "dark-void",
    "bright-space",
    "dark-twilight-sky",
    "dark-twilight-moon",
    "video-true",
    "make-it-a-quote"
] as const;

export type ThemeKeyType = typeof themeKey[number];

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
