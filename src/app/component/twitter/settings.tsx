"use client";
import Link from "next/link";
import { useState } from "react";
import { type TwitterJSX } from "../../api/twitter/route";
import { ImageThemeNameType, imageThemeList } from "../../key";

type TwitterJSXProps = Parameters<typeof TwitterJSX>[0];

export const TwitterSettings = ({ tweetId, theme, img }: TwitterJSXProps) => {
  const [id, setId] = useState(tweetId);
  const [selectedTheme, setTheme] = useState(theme);
  const getURL = (img: boolean) => {
    const param = new URLSearchParams();
    param.append("theme", selectedTheme);
    return `/${id}?${param.toString()}&img=${img}`;
  };

  return (
    <>
      <input value={id} onChange={(e) => setId(e.target.value)} />
      <select
        value={selectedTheme}
        onChange={(e) => setTheme(e.target.value as ImageThemeNameType)}
      >
        {Object.keys(imageThemeList).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <Link href={getURL(false)}>
        <button>Apply</button>
      </Link>
      <Link href={getURL(true)}>
        <button>Image</button>
      </Link>
    </>
  );
};
