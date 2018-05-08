require("dotenv").config()
const path = require("path")
const headerMiddleware = require("./headerMiddleware")

const express = require("express")
const bodyParser = require("body-parser")
const compression = require("compression")

const app = express()

headerMiddleware.init(app)

app.use(compression({ threshold: 512 }))

const clientAppHtml = (req, res) =>
  res.sendFile(path.resolve(`${__dirname}/../dist/index.html`))
app.use("/testRunner*", clientAppHtml)
app.use("/view2*", clientAppHtml)
app.use("/", express.static(`${__dirname}/../dist`))

app.use("/img/", express.static(`${__dirname}/../web-resources/img`))
app.use("/css/", express.static(`${__dirname}/../web-resources/css`))
app.use(bodyParser.json({ limit: "5000kb" }))

const httpServerPort = process.env.PORT || "8080"
app.listen(httpServerPort, () => {
  console.log("server listening on port", httpServerPort)
})
