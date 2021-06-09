const io = require("socket.io-client")
const RivasDB = require("./RivasDB")
const socket = io("http://localhost:4000")
const time = 1000

async function connect() {
    let response;
    let message;
    await new Promise((resolve) => {
        socket.on("connect", () => {
            response = [
                {
                    message: "Conected to rivasDB"
                }
            ]
            resolve();
        });
        setTimeout(() => {
            message = "Time exceeded";
            resolve();
        }, time);
    });
    return response;
}


// setTimeout(() => {
//     socket.emit("loguse", {db: "rivitas" })
// }, 2000);

// setTimeout(() => {
//     socket.emit("read", {tname: "luding" })
//     socket.on("readresponse", (data) => {
//         console.log(data.datatname)
//     })
// }, 3000);


async function query(query) {
    query = query.toLowerCase().split(" ")
    switch (query[0]) {
        case "use":
            return await use(query)
            break;
        case "select":
            return await select(query)
            break;
        case "create":
            return await create(query)
            break;
        case "insert":
            return await insert(query)
            break;
        case "update":
            return await update(query)
            break;
        case "delete":
            return await deletedata(query)
            break;
        default:
            console.error("accion no definida");
            break;
    }
}

async function use(query) {
    let response;
    let message;
    await new Promise((resolve) => {
        let db = query[1];
        socket.emit("use", { db });
        socket.on("useresponse", (responseio) => {
            response = responseio.datares
            resolve()
        });
        setTimeout(() => {
            response = [
                {
                    successfully: false,
                    message: "Time exceeded", 
                    error: null
                }
            ]
            resolve()
        }, time)
    })
    return response;
}

async function select(query) {
    let response;
    await new Promise((resolve) => {
        let index = query.indexOf("from") + 1;
        socket.emit("read", { tname: query[index] });
        socket.on("readresponse", (data) => {
            response = data.datares;
            resolve();
        });

        setTimeout(() => {
            response = [
                {
                    error: "Time exceeded",
                },
            ];
            resolve();
        }, time);
    });
    return response;
}

async function create(query) {
    let response;
    await new Promise((resolve) => {
        switch (query[1]) {
            case "database":
                db = query[2]
                socket.emit("createdb", { db })
                socket.on("createdbresponse", (data) => {
                    response = [{
                        message: "Db was created"
                    }]
                    resolve()
                });
                break;
            case "table":
                table = query[2]
                socket.emit("createtable", { table })
                socket.on("createtableresponse", (data) => {
                    response = [{
                        message: "Table was created"
                    }]
                    resolve()
                });
                break
            default:
                break;
        }
        setTimeout(() => {
            response = [{
                error: "Time exceeded",
            },
            ]
            resolve()
        }, time)
    })
    return response
}

async function insert(query) {
    let response;
    let message;
    await new Promise((resolve) => {
        let index = query.indexOf("into") + 1
        let obj = query[query.indexOf("set") + 1]
        obj = obj
            .replace(/=/g, '":')
            .replace(/'/g, '"')
            .replace(/,/g, ',"')
            .replace(/_/g, " ")
        obj = JSON.parse('{"' + obj + '}')
        socket.emit("insert", { tname: query[index], obj })
        socket.on("insertresponse", (data) => {
            response = [{
                message: "Created successfully"
            }]
            resolve()
        });

        setTimeout(() => {
            response = [
                {
                    error: "Time exceeded",
                },
            ];
            resolve();
        }, time);
    });
    return response;
}

async function update(query) {
    let response;
    let message;
    await new Promise((resolve) => {
        let index = query.indexOf("update") + 1
        let serial = query[query.indexOf("where") + 1]
        serial = serial.replace("serial=", "")
        let obj = query[query.indexOf("set") + 1]
        obj = obj
            .replace(/=/g, '":')
            .replace(/'/g, '"')
            .replace(/,/g, ',"')
            .replace(/_/g, " ")
        obj = JSON.parse('{"' + obj + '}')
        socket.emit("update", { tname: query[index], serial, obj })
        socket.on("updateresponse", (data) => {
            response = [{
                message: "Updated successfully"
            }]
            resolve()
        });

        setTimeout(() => {
            response = [
                {
                    error: "Time exceeded",
                },
            ];
            resolve();
        }, time);
    });
    return response;
}

async function deletedata(query) {
    let response;
    let message;
    await new Promise((resolve) => {
        let index = query.indexOf("from") + 1
        let serial = query[query.indexOf("where") + 1]
        serial = serial.replace("serial=", "")
        socket.emit("delete", { tname: query[index], serial })
        socket.on("deleteresponse", (data) => {
            response = [{
                message: "Deleted successfully"
            }]
            resolve()
        });

        setTimeout(() => {
            response = [
                {
                    error: "Time exceeded",
                },
            ];
            resolve();
        }, time);
    });
    return response;
}


(async () => {
    // console.log(await connect())
    let datares = await query("USE libros")
    // SELECT * FROM "tname"
    // let datares = await query("SELECT * FROM tlibros")
    // let datares = await query("UPDATE tlibros SET title='the_bye_book',description='es_un_libro_donde_dices_adios_XD',serial=2 WHERE serial=2")
    // console.log(await query("CREATE DATABASE gatico"))
    // console.log(await query("CREATE TABLE gatico"))
    // console.log(await query("INSERT INTO tlibros SET title='the_bye_book',description='es_un_libro_donde_dices_adios_XD',serial=2 "))
    // console.log(await query("DELETE FROM tlibros WHERE serial=2 "))
    console.log(datares)
})()

// "title": "the return book",
// "description": "Es un libro donde regresas,",
// "serial": 2
