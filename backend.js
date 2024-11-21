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

const players = {}

io.on('connection', (socket) => {
  console.log('a user connected');
  players[socket.id] = {
    x: 500 * Math.random(),
    y: 500 * Math.random(),
  }

  io.emit('updatePlayers', players) //broadcasts event to update player frontend

  socket.on('disconnect', (reason) => {
    console.log(reason)
    delete players[socket.id]
    io.emit('updatePlayers', players)
  })

  console.log(players)
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


console.log('server loaded test')