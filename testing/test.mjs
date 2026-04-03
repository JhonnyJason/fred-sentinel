import * as tested from "../output/index.js"

import fs from "node:fs"

const apiKey = fs.readFileSync("key.txt", {encoding: "utf8"})

async function run() {

    console.log(apiKey)
}

run()
