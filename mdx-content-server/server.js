var express = require("express")
var cors = require("cors")
const fs = require('fs').promises

var app = express()
app.use(cors())

app.get("/content", async (req, res) => {    
    let content_docs = []
    let files = await fs.readdir("./mdx-docs")

    for (const file of files) {                
        content_docs.push({
            title: file.split(".")[0].replaceAll("_", " ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
            content: await fs.readFile(`./mdx-docs/${file}`, { encoding: 'utf8' })
        })
    }

    res.json(content_docs)
})

app.listen(3001, () => {
    console.log("Server running on port 3000");
});

