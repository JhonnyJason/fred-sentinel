import fs from "node:fs"

import { FRED } from "../output/index.js"

// importing Testcases
// import 


const apiKey = fs.readFileSync("key.txt", {encoding: "utf8"})

//For retrieving the IDs for the release names
const releasesString = fs.readFileSync("release-names.json", {encoding: "utf8"})
const releaseNames = JSON.parse(releasesString)
const wantedNameSet = new Set(releaseNames)
const nameMap = new Map()
const maxIterations = 365

function mapFoundReleaseIds(releases) {
    for(var i = 0; i < releases.length; i++) {
        var rel = releases[i]
        if(wantedNameSet.has(rel.name)) { nameMap.set(rel.name, rel.id) }
    }
}

function writeOutMap() {
    result = []
    for (var entry of nameMap.entries()) {
        var obj = Object.create(null)
        obj.name = entry[0]
        obj.id = entry[1]
        result.push(obj)
    }

    resultString = JSON.stringify(result, null, 4)
    fs.writeFileSync("release-map.json", resultString)
}


async function run() {try {
    console.log(apiKey)
    const fred = new FRED(apiKey)
        
    // just to see first feedback when executing :-) - to be removed...
    // const { mrr, mrrDate } = await fred.getCurrentMRR()
    // console.log(mrr)
    // console.log(mrrDate)
    
    //For retrieving the IDs for the release names
    var date = new Date()
    var i = 0
    while(nameMap.size < releaseNames.length && i < maxIterations) {
        var releases = await fred.getDataReleasesForDate(date)
        mapFoundReleaseIds(releases)
        date = date.setDate(date.getDate() - 1)
        i++
    }
    writeOutMap()

    // TODO: actually executing the Testcases

    console.log("All tests ran successfully!")
} catch(err) {console.error(err)}}

run()
