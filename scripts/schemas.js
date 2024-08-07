/** Config values possible */
const values = ["js", "dart", null];

/** Config formats possible */
const formats = ["json", "yaml"];

const cmdname = "pkl";
let commonargs = ["eval", "gen.pkl"];

console.log("Begin generating config...\n");

for (const item of values) {
    for (const fmt of formats) {
        const args = commonargs.concat("-f", fmt, ...(item ? ["-p", `type=${item ?? "common"}`] : []), "-o", `schemas/${item ?? "common"}/openapi.${fmt}`);
        console.log(`Producing openapi schema for dyte ${item ?? "common"} config - ${fmt} format`);
        const { code, stdout, stderr } = await new Deno.Command(cmdname, { args }).output();

        if (code != 0) {
            console.error(`Error producing config from ${[cmdname, ...args].join(", ")}`, `Stdout: ${new TextDecoder().decode(stdout)}`, `Stderr: ${new TextDecoder().decode(stderr)}`)
        }
    }
}

console.log("All Done!");