"use client";
import { useEffect, useMemo, useState } from "react";
import { TweetApiUtilsData } from "twitter-openapi-typescript";
import { RenderBasicImage } from "../render/basic/image.js";

export default function Home() {
  const toAPi = (e: string) => `/api/twitter?id=${e}`;
  const toId = (e: string) => (isNaN(Number(e)) ? e.split("/").pop()! : e);

  const [state, setState] = useState<TweetApiUtilsData | null>(null);
  const [id, setId] = useState("1518623997054918657");

  const render = useMemo(() => new RenderBasicImage({ width: 600 }), []);


  useEffect(() => {
    fetch(toAPi(toId(id)))
      .then((e) => e.json())
      .then((e) => setState(e.data));
  }, [id]);
  return (
    <>
      <input value={id} onChange={(e) => setId(e.target.value)} />
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
