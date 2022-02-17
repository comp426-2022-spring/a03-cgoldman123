const express = require('express')
const app = express()

var port = 5001

const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

// look at express.js example online

app.use(function(req, res) {
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
   
    
})