import { describe, it, assertEqual } from "../test-utils.mjs"
import * as urlCreate from "../../output/urlcreate.js"

await describe("urlcreate", async () => {
    await it("latestMRR returns correct URL structure", () => {
        const key = "test-key-123"
        const url = urlCreate.latestMRR(key)

        assertEqual(url.includes("https://api.stlouisfed.org/fred/series/observations"), true, "Base URL")
        assertEqual(url.includes("series_id=DFEDTARU"), true, "Series ID")
        assertEqual(url.includes("limit=1"), true, "Limit parameter")
        assertEqual(url.includes("sort_order=desc"), true, "Sort order")
        assertEqual(url.includes("file_type=json"), true, "File type")
        assertEqual(url.includes(`api_key=${key}`), true, "API key")
    })

    await it("todaysDataReleases returns correct URL", () => {
        const key = "test-key-456"
        const url = urlCreate.todaysDataReleases(key)
        
        assertEqual(url.includes("fred/releases"), true, "Releases endpoint")
        assertEqual(url.includes(`api_key=${key}`), true, "API key")
    })

    await it("dataReleasesForDate returns correct URL with date", () => {
        const key = "test-key"
        const date = "2024-01-15"
        const url = urlCreate.dataReleasesForDate(key, date)
        
        assertEqual(url.includes(`realtime_start=${date}`), true, "Start date")
        assertEqual(url.includes(`realtime_end=${date}`), true, "End date")
    })

    await it("releaseDatesForId returns correct URL with parameters", () => {
        const key = "test-key"
        const id = "123"
        const start = "2020-01-01"
        const end = "2024-12-31"
        const url = urlCreate.releaseDatesForId(key, id, start, end)

        assertEqual(url.includes("release/dates"), true, "Release dates endpoint")
        assertEqual(url.includes(`release_id=${id}`), true, "Release ID")
        assertEqual(url.includes(`realtime_start=${start}`), true, "Start date")
        assertEqual(url.includes(`realtime_end=${end}`), true, "End date")
    })
})
