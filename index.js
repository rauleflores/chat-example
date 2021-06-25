const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const port = 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
    console.log('A user connected.')
    socket.on('disconnect', () => {
        console.log("User disconnected.")
    })

    socket.on('chat message', msg => {
        console.log('message:' + msg)
    })

    socket.on('chat message', msg => {
        io.emit('chat message', msg)
    })
})

server.listen(port, () => {
    console.log(`Server listening on port: ${port}\nServer available at http://localhost:3000`)
})