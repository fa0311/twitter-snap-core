import fs from "fs/promises";

export const getFont = async () => {
    const segoeui300 = Buffer.from(await fs.readFile("fonts/SEGOEUIL.TTF"));
    const segoeui400 = Buffer.from(await fs.readFile("fonts/SEGOEUISL.TTF"));
    const segoeui500 = Buffer.from(await fs.readFile("fonts/SEGOEUI.TTF"));
    const segoeui600 = Buffer.from(await fs.readFile("fonts/SEGUISB.TTF"));
    const segoeui700 = Buffer.from(await fs.readFile("fonts/SEGOEUIB.TTF"));
    const segoeui800 = Buffer.from(await fs.readFile("fonts/SEGUIBL.TTF"));

    const segoeui300i = Buffer.from(await fs.readFile("fonts/SEGUILI.TTF"));
    const segoeui400i = Buffer.from(await fs.readFile("fonts/SEGUISLI.TTF"));
    const segoeui500i = Buffer.from(await fs.readFile("fonts/SEGOEUII.TTF"));
    const segoeui600i = Buffer.from(await fs.readFile("fonts/SEGUISBI.TTF"));
    const segoeui700i = Buffer.from(await fs.readFile("fonts/SEGOEUIZ.TTF"));
    const segoeui800i = Buffer.from(await fs.readFile("fonts/SEGUIBLI.TTF"));

    return {
        segoeui300,
        segoeui400,
        segoeui500,
        segoeui600,
        segoeui700,
        segoeui800,
        segoeui300i,
        segoeui400i,
        segoeui500i,
        segoeui600i,
        segoeui700i,
        segoeui800i,
    };
};
