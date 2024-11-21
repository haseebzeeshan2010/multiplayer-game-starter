const express = require('express')
const app = express()
const port = 3000

//Socket.io setup
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io');
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 });

app.use(express.static('public')) //Makes any file in this directory available to public (js folder)

app.get('/', (req, res) => { //Sends file of index.html if visiting url homepage
  res.sendFile(__dirname + '/index.html')
})

const backEndPlayers = {}

io.on('connection', (socket) => {
  console.log('a user connected');
  backEndPlayers[socket.id] = {
    x: 500 * Math.random(),
    y: 500 * Math.random(),
    color: `hsl(${360 * Math.random()},100%,50%)`
  }

  io.emit('updatePlayers', backEndPlayers) //broadcasts event to update player frontend

  socket.on('disconnect', (reason) => {
    console.log(reason)
    delete backEndPlayers[socket.id]
    io.emit('updatePlayers', backEndPlayers)
  })

  console.log(backEndPlayers)
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


console.log('server loaded test')