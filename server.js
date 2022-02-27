const express = require('express')
const req = require('express/lib/request')
const app = express()

const args = require('minimist')(process.argv.slice(2))
// Define allowed argument name 'port'.
args["port"]
// Define a const `port` using the argument from the command line. 
// Make this const default to port 3000 if there is no argument given for `--port`.
const port = args.port || process.env.PORT || 5000

function coinFlips(flips) {
  var coinArray = new Array()
  for (let i=0; i < flips; i++) {
    coinArray[i] = coinFlip()
  }

  return coinArray 
}

function coinFlip() {
    let randomNum = Math.random()
    if (randomNum < .5){
      return "tails"
    } else{
      return "heads"
    }
  }

  function countFlips(myArray) {
    var headCount = 0
    var tailCount = 0
    for (let i=0; i<myArray.length; i++) {
      if (myArray[i] == 'heads') {
        headCount = headCount + 1
      } else {
        tailCount = tailCount + 1
      }
    }
    /*if (headCount ==0) {
      return "{ tails: " + tailCount + " }"
    }
    if (tailCount ==0) {
      return "{ heads: " + headCount + " }"
    }*/
    return "{tails:" + tailCount + ",heads:" + headCount + "}"
  }


const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

// look at express.js example online
app.get('/app', (req, res)  => {
    res.status(200).end('200 OK')
})

app.get('/app/flip', (req, res)  => {
    res.status(200).json({'flip' : coinFlip()})
})


app.get('/app/flip/call/heads', (req, res)  => {
  var flip = coinFlip()
  if (flip == "heads") {
    result = "win"
  } else {
    result = "lose"
  }
  res.status(200).json({'call':'tails', 'flip':flip, 'result':result})
})
// test
app.get('/app/flip/call/tails', (req, res)  => {
  var flip = coinFlip()
  if (flip == "tails") {
    result = "win"
  } else {
    result = "lose"
  }
  res.status(200).json({'call':'tails', 'flip':flip, 'result':result})
})
// making sure I committed right




app.get('/app/echo/:repeat', (req, res) => {
    res.status(200).json({'message': req.params.repeat})
})

app.get('/app/flips/:number', (req, res) => {
  var coinArray = coinFlips(req.params.number)
  var mySummary = countFlips(coinArray)
  res.status(200).json({'raw': coinArray, "summary": mySummary})
})


app.use(function(req, res) {
    res.status(404).send("404 NOT FOUND")
    res.type("text/plain")  
})