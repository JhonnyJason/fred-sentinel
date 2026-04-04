import { describe, it } from "../test-utils.mjs"
import { FRED } from "../../output/index.js"

export async function runIntegrationTests(apiKey) {
    await describe("integration - FRED API", async () => {
        
        await it("getCurrentMRR returns valid data", async () => {
            const fred = new FRED(apiKey)
            const { mrr, mrrDate } = await fred.getCurrentMRR()
            
            if (typeof mrr !== "number") throw new Error(`MRR should be number, got ${typeof mrr}`)
            if (!(mrrDate instanceof Date)) throw new Error(`mrrDate should be Date, got ${mrrDate.constructor.name}`)
            if (mrr < 0 || mrr > 20) throw new Error(`MRR ${mrr} seems out of reasonable range`)
        })

        await it("handles invalid API key gracefully", async () => {
            const fred = new FRED("invalid-key-12345")
            
            try { await fred.getCurrentMRR() } 
            catch (err) { return }
            
            throw new Error("Should have thrown an error with invalid key")
        })

        await it("getTodaysDataReleases returns array", async () => {
            const fred = new FRED(apiKey)
            const releases = await fred.getTodaysDataReleases()
            
            if (!Array.isArray(releases)) throw new Error("Should return array")
            if (releases.length === 0) throw new Error("Should have releases")
        })

        await it("getDataReleasesForDate returns releases for specific date", async () => {
            const fred = new FRED(apiKey)
            const date = new Date("2024-01-15")
            const releases = await fred.getDataReleasesForDate(date)
            
            if (!Array.isArray(releases)) throw new Error("Should return array")
        })

        await it("getReleaseDatesForId returns dates", async () => {
            const fred = new FRED(apiKey)
            const dates = await fred.getReleaseDatesForId("10")
            
            if (!Array.isArray(dates)) throw new Error("Should return array")
        })

        await it("getFutureReleaseDatesForId returns dates from today", async () => {
            const fred = new FRED(apiKey)
            const dates = await fred.getFutureReleaseDatesForId("10")
            
            if (!Array.isArray(dates)) throw new Error("Should return array")
        })
    })
}
