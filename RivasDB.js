//fs FileSystem
const { Console } = require("console")
const fs = require("fs")
//"./servidor/libros.json"
class RivasDB {
    constructor() {
        this.db = "./dbs/"
        this.isUse = false
    }

    use(db) {
        var tempdb = "./dbs/" + db + "/"
        if (fs.existsSync(tempdb)) {
            this.db = tempdb
            this.isUse = true
            console.log("Connected to database: " + db)
            return {
                successfully: true,
                message: "Connected to database: " + db,
                error: null
            }
        } else {
            console.error("The db don't exist")
            return {
                successfully: false,
                message: "The db don't exist",
                error: null
            }
        }
    }

    createdb(db) {
        var tempdb = "./dbs/" + db + "/"
        if (!fs.existsSync(tempdb)) {
            fs.mkdirSync(tempdb)
            console.log("DB created successfully")
            return {
                successfully: true,
                message: "DB created successfully",
                error: null
            }
        } else {
            console.error("The db already exist")
            return {
                successfully: false,
                message: "The db already exist",
                error: null
            }
        }
    }

    createtable(tname, db) {
        if (!db == undefined) {
            this.use(db)
        }
        if (this.isUse) {
            fs.writeFileSync(this.db + tname + ".json", JSON.stringify([], null, 2))
            console.log("Table created successfully")
            return {
                successfully: true,
                message: "Table created successfully",
                error: null
            }
        } else {
            console.error("The db is'nt available, please create the db or use the db")
            return {
                successfully: false,
                message: "The db is'nt available, please create the db or use the db",
                error: null
            }
        }
    }

    //leer archivo
    read(tname) {
        if (this.isUse == true) {
            const tables = fs.readFileSync(this.db + tname + ".json", "utf-8")
            const tablesjson = JSON.parse(tables)
            console.log(tablesjson)
            return {
                successfully: true,
                data: tablesjson,
                message: tname + " Data has been showed",
                error: null
            }
        } else {
            console.error("Select any db with use method")
            return {
                successfully: false,
                message: "Select any db with use method",
                error: null
            }
        }
    }

    //create
    create(tname, objeto) {
        if (this.isUse == true) {
            let tablesjson = this.read(tname).data
            let dataExiste = false
            for (let i = 0; i < tablesjson.length; i++) {
                let { serial } = tablesjson[i];
                if (serial == objeto.serial) {
                    dataExiste = true
                }
            }
            if (dataExiste == false) {
                tablesjson.push(objeto)
                fs.writeFileSync(this.db + tname + ".json", JSON.stringify(tablesjson, null, 2))
                console.log("Data was created")
                return {
                    successfully: true,
                    message: "Data was created",
                    error: null
                }
            } else {
                console.error("Error, serial of the data already exists")
                return {
                    successfully: false,
                    message: "Error, serial of the data already exists",
                    error: null
                }
            }
        } else {
            console.error("Select any db with use method")
            return {
                successfully: false,
                message: "Select any db with use method",
                error: null
            }
        }

    }

    delete(tname, serial) {
        if (this.isUse == true) {
            let tablesjson = this.read(tname).data
            let dataexiste = false
            for (let i = 0; i < tablesjson.length; i++) {
                let { serial: serialtable } = tablesjson[i];
                if (serial == serialtable) {
                    dataexiste = true
                    tablesjson.splice(i, 1)
                }
            }
            if (dataexiste == false) {
                console.error("Error, data didn't exist")
                return {
                    successfully: false,
                    message: "Error, data didn't exist",
                    error: null
                }
            } else {
                fs.writeFileSync(this.db + tname + ".json", JSON.stringify(tablesjson, null, 4))
            }
            console.log("Data deleted succesfully")
            return {
                successfully: true,
                message: "Data deleted succesfully",
                error: null
            }
        } else {
            console.error("Select any db with use method")
            return {
                successfully: false,
                message: "Select any db with use method",
                error: null
            }
        }


    }

    update(tname, serial, objeto) {
        if (this.isUse == true) {
            let tablesjson = this.read(tname).data
            let dataexiste = false
            for (let i = 0; i < tablesjson.length; i++) {
                let { serial: serialtable } = tablesjson[i];
                if (serial == serialtable) {
                    dataexiste = true
                    tablesjson.splice(i, 1, objeto)

                }
            }
            if (dataexiste == false) {
                Console.error("Error, data didn't exist")
                return {
                    successfully: false,
                    message: "Error, data didn't exist",
                    error: null
                }
            } else {
                fs.writeFileSync(this.db + tname + ".json", JSON.stringify(tablesjson, null, 4))
            }
            console.log("Data updated succesfully")
            return {
                successfully: true,
                message: "Data updated succesfully",
                error: null
            }
        } else {
            console.error("Select any db with use method")
            return {
                successfully: false,
                message: "Select any db with use method",
                error: null
            }
        }
    }
}

module.exports = RivasDB

// let libro3 = {
//     "title": "the return book",
//     "description": "Es un libro donde regresas,",
//     "serial": 2
// }
// // console.log(read())
// // console.log(deleteSerial(2))
// // console.log(create(libro3))
// console.log(update(2, libro3))