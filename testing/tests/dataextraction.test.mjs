import { describe, it, assertDeepEqual } from "../test-utils.mjs"
import * as extr from "../../output/dataextraction.js"

await describe("dataextraction - currentMRR", async () => {
  await it("extracts MRR from valid response", () => {
    const result = {
      observations: [{
        value: "5.25",
        date: "2024-01-15"
      }]
    }
    
    const { mrr, mrrDate } = extr.currentMRR(result)
    assertDeepEqual(mrr, 5.25, "MRR value")
    assertDeepEqual(mrrDate instanceof Date, true, "MRR date is Date object")
  })
  
  await it("handles decimal values", () => {
    const result = {
      observations: [{
        value: "4.875",
        date: "2023-12-20"
      }]
    }
    
    const { mrr } = extr.currentMRR(result)
    assertDeepEqual(mrr, 4.875, "Decimal MRR value")
  })
})

await describe("dataextraction - dataReleases", async () => {
  await it("extracts releases from response", () => {
    const result = {
      releases: [
        { name: "GDP", id: "1", realtime_start: "2024-01-01", realtime_end: "2024-01-31" },
        { name: "CPI", id: "2", realtime_start: "2024-01-01", realtime_end: "2024-01-31" }
      ]
    }
    
    const releases = extr.dataReleases(result)
    assertDeepEqual(releases.length, 2, "Two releases")
    assertDeepEqual(releases[0].name, "GDP", "First release name")
    assertDeepEqual(releases[1].id, "2", "Second release ID")
  })
})

await describe("dataextraction - releaseDates", async () => {
  await it("extracts dates from release dates response", () => {
    const result = {
      release_dates: [
        { date: "2024-01-15" },
        { date: "2024-02-15" }
      ]
    }
    
    const dates = extr.releaseDates(result)
    assertDeepEqual(dates.length, 2, "Two dates")
    assertDeepEqual(dates[0], "2024-01-15", "First date")
    assertDeepEqual(dates[1], "2024-02-15", "Second date")
  })
})
