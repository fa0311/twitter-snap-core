"use client";
import { useEffect, useMemo, useState } from "react";
import { TweetApiUtilsData } from "twitter-openapi-typescript";

import { TweetRenderImage } from "render";
import { RenderBasicImage } from "render/basic/image";


const themeList: { [K: string]: TweetRenderImage } = {
  "video-false": new RenderBasicImage({ width: 600, video: false }),
  "video-true": new RenderBasicImage({ width: 600, video: true }),
};

export default function Home() {
  const toAPi = (e: string) => `/api/twitter?id=${e}`;
  const toId = (e: string) => (isNaN(Number(e)) ? e.split("/").pop()! : e);



  const [state, setState] = useState<TweetApiUtilsData | null>(null);
  const [id, setId] = useState("1518623997054918657");
  const [reload, setReload] = useState(0);
  const [theme, setTheme] = useState<string>(Object.keys(themeList)[0]);


  const render = useMemo(() => themeList[theme], [theme]);



  useEffect(() => {
    fetch(toAPi(toId(id)))
      .then((e) => e.json())
      .then((e) => setState(e.data));
  }, [id, reload]);


  return (
    <>
      <button onClick={() => setReload((e) => e + 1)}>reload</button>
      <input value={id} onChange={(e) => setId(e.target.value)} />
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {
          Object.keys(themeList).map((e) => (
            <option key={e} value={e}>{e}</option>
          ))
        }
      </select>

      {state && (
        <div
          style={{
            width: "600px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <render.render data={state} />
        </div>
      )}
    </>
  );
}
