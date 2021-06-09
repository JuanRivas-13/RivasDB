//Funcionalidades servidor generico, uso de dominio y puerto
const server = require("http").createServer()
//Servidos de socket io
const { Server: ServerIo } = require("socket.io")

const RivasDB = require("./RivasDB")
const rivas = new RivasDB()

let io = new ServerIo(server.listen(4000, "localhost"), {
    cors: {
        origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
        methods: ["GET", "POST"],
    },
})
//sockets
io.on("connection", (socket) => {
    console.log("conection from: " + socket.id)
    socket.on("use", (data) => {
        let datares = rivas.use(data.db)
        socket.emit("useresponse", { datares })
    })
    socket.on("read", (data) => {
        let datares = rivas.read(data.tname)
        socket.emit("readresponse", { datares })
    })
    socket.on("createdb", (data) => {
        rivas.createdb(data.db)
        socket.emit("createdbresponse")
    })
    socket.on("createtable", (data) => {
        rivas.createtable(data.table)
        socket.emit("createtableresponse")
    })
    socket.on("insert", (data) => {
        let datares = rivas.create(data.tname, data.obj)
        socket.emit("insertresponse", { datares })
    })
    socket.on("update", (data) => {
        let datares = rivas.update(data.tname, data.serial, data.obj)
        socket.emit("updateresponse", { datares })
    })
    socket.on("delete", (data) => {
        let datares = rivas.delete(data.tname, data.serial)
        socket.emit("deleteresponse", { datares })
    })


})
