import { describe, it, assertRejects, assertEqual } from "../test-utils.mjs"
import { request } from "../../output/request.js"
import { NetworkError, HttpError, ParseError } from "../../output/errors.js"

const urlForJSON = "https://raw.githubusercontent.com/mdn/dom-examples/refs/heads/main/fetch/fetch-json/products.json"

await describe("request - error handling", async () => {
    await it("Succeeds to retrieve JSON", async () => {
        const result = await request(urlForJSON)

        assertEqual(typeof result, "object", "Result was not an object!")
    })

    await it("throws NetworkError for invalid URL", async () => {
        await assertRejects(
            () => request("not-a-valid-url"),
            NetworkError,
            "Should throw NetworkError"
        )
    })
  
    await it("throws HttpError for 404", async () => {
        await assertRejects(
            () => request("https://dotv.ee/404"),
            HttpError,
            "Should throw HttpError for 404"
        )
    })
  
    await it("throws ParseError for invalid JSON", async () => {
        await assertRejects(
            () => request("https://dotv.ee"),
            ParseError,
            "Should throw ParseError for non-JSON response"
        )
    })
})
