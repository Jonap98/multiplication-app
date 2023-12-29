import fs from "fs";
import { yarg } from "./config/plugins/args.plugin";

// console.log(yarg);
const { b: base, l: limit, s: showTable } = yarg;

let outputMessage = '';
// const base: number = baseYarg as number;
// const limit: number = limitYarg as number;
const header: string = `
=============================================
                Tabla del ${ base }
=============================================\n
`;

for (let index = 1; index <= limit; index++) {
    outputMessage += `${base} x ${index} = ${5*index}\n`;
}

outputMessage = header + outputMessage;
if( showTable )
    console.log(outputMessage);

const outputDir = `outputs/folder1/folder2`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(`${outputDir}/tabla-${base}.txt`, outputMessage);
console.log('File created');