// Importar a depedência do sqlite3
const sqlite3 = require("sqlite3").verbose()

// Criar um objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// Utililizar o objeto de banco de dados para nossas operações

//  db.serialize(()=>{
//     // Com comandos SQL, eu vou:
    
//     // 1-Criar uma tabela
//     // db.run(`
//     // CREATE TABLE IF NOT EXISTS places(
//     //     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     //     name TEXT,
//     //     image TEXT,
//     //     address TEXT,
//     //     address2 TEXT,
//     //     state TEXT,
//     //     city TEXT,
//     //     items TEXT
//     // );
//     // `)
    
//     // 2-Inserir Dados na tabela
//     // const query = `
//     // INSERT INTO places(
//     //     name,
//     //     image,
//     //     address,
//     //     address2,
//     //     state,
//     //     city,
//     //     items
//     // ) VALUES (?,?,?,?,?,?,?);
//     // `
//     // const values = [
//     //     "Colectoria",
//     //     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     //     "Gilherme Gemballa,Jardim América",
//     //     "N° 260",
//     //     "Santa Catarina",
//     //     "Rio do Sul",
//     //     "Papéis e Papelão"
//     // ]

//     // function afterInsertData(err){
//     //     if(err){
//     //         return console.log(err)
//     //     }
//     //     console.log("Cadastrado com sucesso.")
//     //     console.log(this)

//     // }
//     //db.run(query,values,afterInsertData)
    
//     // 3-Consultar os dados na tabela
    
//     // db.all(`SELECT * FROM places `,function(err,rows){
//     //     if(err){
//     //         return console.log(err)
//     //     }
//     //     console.log("Seus registros: ")
//     //     console.log(rows)
//     // }) 
    
//     // 4-Deletar os dados da tabela
    
//     // db.run(`DELETE FROM places WHERE id = ? `,[2],function(err){
//     //     if(err){
//     //         return console.log(err)
//     //     }
//     //     console.log("Registro excluído com sucesso.")
//     // })
// })