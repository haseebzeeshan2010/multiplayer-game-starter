const express = require('express')
const app = express()
const port = 3000

//Socket.io setup
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static('public')) //Makes any file in this directory available to public (js folder)

app.get('/', (req, res) => { //Sends file of index.html if visiting url homepage
  res.sendFile(__dirname + '/index.html')
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


console.log('server loaded test')