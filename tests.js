const RivasDB = require("./RivasDB")
const rivas = new RivasDB()

libro3 = {
    "title": "the return book",
    "description": "Es un libro donde regresas,",
    "serial": 1
}

rivas.use("rivitas")
console.log(rivas.db)
// rivas.createtabla("luding")
rivas.create("luding", libro3)


// console.log(rivas.read("tlibros"))
// console.log(rivas.create("tlibros", libro3))
// console.log(rivas.delete("tlibros", 2))
//console.log(rivas.update("tlibros", 2, libro3))


// rivas.createdb("rivitas")
