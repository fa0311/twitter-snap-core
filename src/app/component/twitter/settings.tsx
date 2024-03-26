"use client";
import { type TwitterJSX } from "app/api/twitter/route";
import Link from 'next/link';
import { useState } from "react";
import { ImageThemeNameType, imageThemeList } from "../../key";


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
            <select value={selectedTheme} onChange={(e) => setTheme(e.target.value as ImageThemeNameType)}>
                {
                    Object.keys(imageThemeList).map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))
                }
            </select>
            <Link href={getURL()} >
                <button>Apply</button>
            </Link>
        </>
    );
}
