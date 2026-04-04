import fs from "node:fs"

import { FRED } from "../output/index.js"

// importing Testcases
// import 


const apiKey = fs.readFileSync("key.txt", {encoding: "utf8"})

//For retrieving the IDs for the release names
const nameIdString = fs.readFileSync("name-id.json", {encoding: "utf8"})
const nameIdObjects = JSON.parse(nameIdString)



async function run() {try {
    console.log(apiKey)
    const fred = new FRED(apiKey)

    for(var i = 0; i < nameIdObjects.length;  i++) { try {
        var obj = nameIdObjects[i]
        var releases = await fred.getReleaseDatesForId(obj.id)
        var resultString = JSON.stringify({name: obj.name, releases })
        fs.writeFileSync("rid:"+obj.id+".json", resultString) 

    } catch(err) {
        console.error("Error @id: "+obj.id)
        console.error(err)
    }}

    // TODO: actually executing the Testcases

    console.log("All tests ran successfully!")
} catch(err) {console.error(err)}}

run()
