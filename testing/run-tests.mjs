import fs from "node:fs"
import { results } from "./test-utils.mjs"

import "./tests/urlcreate.test.mjs"
import "./tests/dataextraction.test.mjs"
import "./tests/request.test.mjs"
import "./tests/throttledrequest.test.mjs"
import { runIntegrationTests } from "./tests/integration.test.mjs"

const apiKey = fs.readFileSync("key.txt", { encoding: "utf8" }).trim()

async function run() {
  try {
        
    await runIntegrationTests(apiKey)
    
    const success = results()
    process.exit(success ? 0 : 1)
    
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()
