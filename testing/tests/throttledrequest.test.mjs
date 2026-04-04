import { describe, it, assertRejects, assertEqual } from "../test-utils.mjs"
import { request } from "../../output/throttledrequest.js"
import { HttpError } from "../../output/errors.js"

const urlForJSON = "https://raw.githubusercontent.com/mdn/dom-examples/refs/heads/main/fetch/fetch-json/products.json"

await describe("throttled request - deduplication", async () => {
    await it("shares result for identical simultaneous requests", async () => {
        const url = urlForJSON +"?json={\"test\":true}"
        const [r1, r2] = await Promise.all([request(url), request(url)])
        assertEqual(r1, r2, "Result objects were not identical!")
    })
  
    await it("shares error for identical simultaneous requests", async () => {
        const url = "https://dotv.ee/404"
        const prom1 = request(url)
        const prom2 = request(url)

        await assertRejects(() => prom1, HttpError)
        await assertRejects(() => prom2, HttpError)

        try { await prom1 }
        catch(err) {var err1 = err}

        try {await prom2 }
        catch(err) {var err2 = err}

        assertEqual(err1, err2, "Error objects were not identical!")
    })
})

await describe("throttled request - rate limiting", async () => {
    await it("handles burst of 2 requests within 1 second", async () => {
        const url = urlForJSON+"?json={\"n\":"
        const start = performance.now()
        await Promise.all([
            request(url + "1}"),
            request(url + "2}")
        ])
        const elapsed = performance.now() - start
        assertEqual(elapsed < 1000, true, "Two requests should complete quickly")
    })

    await it("waits after burst of 2 requests", async () => {
        const url = urlForJSON+"?json={\"n\":"
        const start = performance.now()
        await Promise.all([
            request(url + "1}"),
            request(url + "2}"),
            request(url + "3}")
        ])
        const elapsed = performance.now() - start
        assertEqual(elapsed >= 1000, true, "Third request should wait")
    })
})
