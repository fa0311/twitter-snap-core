import { promises as fs } from "fs";




type ResType = {
    segoeui300: ArrayBuffer;
    segoeui400: ArrayBuffer;
    segoeui500: ArrayBuffer;
    segoeui600: ArrayBuffer;
    segoeui700: ArrayBuffer;
    segoeui800: ArrayBuffer;
    segoeui300i: ArrayBuffer;
    segoeui400i: ArrayBuffer;
    segoeui500i: ArrayBuffer;
    segoeui600i: ArrayBuffer;
    segoeui700i: ArrayBuffer;
    segoeui800i: ArrayBuffer;

}



export const getFont = async (): Promise<ResType> => {

    const base = 'https://github.com/fa0311/twitter-snap-core/releases/download/assets-fonts/'

    const list = [
        ["SEGOEUIL.TTF", "segoeui", 300, "normal"],
        ["SEGOEUISL.TTF", "segoeui", 400, "normal"],
        ["SEGOEUI.TTF", "segoeui", 500, "normal"],
        ["SEGUISB.TTF", "segoeui", 600, "normal"],
        ["SEGOEUIB.TTF", "segoeui", 700, "normal"],
        ["SEGUIBL.TTF", "segoeui", 800, "normal"],
        ["SEGUILI.TTF", "segoeui", 300, "italic"],
        ["SEGUISLI.TTF", "segoeui", 400, "italic"],
        ["SEGOEUII.TTF", "segoeui", 500, "italic"],
        ["SEGUISBI.TTF", "segoeui", 600, "italic"],
        ["SEGOEUIZ.TTF", "segoeui", 700, "italic"],
        ["SEGUIBLI.TTF", "segoeui", 800, "italic"],
    ];


    const fonts = list.map(async ([file, name, weight, style]) => {
        const suffix = style === "normal" ? "" : "i";
        const path = `fonts/${file}`;
        try {
            const buffer = await fs.readFile(path);
            return [`${name}${weight}${suffix}`, buffer] as const;
        } catch (e) {
            const url = `${base}${file}`;
            const res = await fetch(url);
            const buffer = await res.arrayBuffer();
            await fs.writeFile(path, Buffer.from(buffer));
            return [`${name}${weight}${suffix}`, buffer] as const;
        }
    });

    return Object.fromEntries(await Promise.all(fonts)) as ResType;
}
