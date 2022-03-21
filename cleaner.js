/* 
This tool has been used to clean raw picosong files
This has been created in like 5 minutes? Perhaps less, so don't expect this code to be clean. But hey, at least it works!
*/

const fs = require("fs");
var combined = [];

var part = "p0";

async function xd() {
    const files = fs.readdirSync(`./picoFiles/${part}`);

    files.forEach(async (file, i) => {
        await fs.readFileSync(`./picoFiles/${part}/${file}`, "utf8").split("\n").map(x => {
            if (!x.includes("com,amazonaws,s3,picosong)")) return;
    
            let name = decodeURI(x.split(" ")[2].split("/")[4].split("?Signature=")[0])
            let link = `https://web.archive.org/web/${x.split(" ")[1]}if_/${x.split(" ")[2]}`
            let part = x.split(" ")[10]

            combined.push(link);
        })

        return fs.writeFileSync(`./${part}.json`, JSON.stringify(combined, null, 2));
    })

}

xd();
