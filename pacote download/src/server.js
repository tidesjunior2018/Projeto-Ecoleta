const express = require("express")
//__dirname => é sempre o diretório no qual o script está em execução


const server = express()

// pegar o banco de dados

const db = require("./database/db") // ./ => pasta local do meu projeto.Ex:src

// a função express.static()=>Para entregar arquivos estáticos como
// imagens,arquivos css e os arquivos javascript

// configurar a pasta public

server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// configurar caminhos da minha aplicação
// pagina inicial
// req=>Requisição (pedido)
// res=>Resposta

//utilizando template engine
const nunjucks = require("nunjucks")
const { urlencoded } = require("express")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", function (req, res) {
    res.render('index.html', { title: "Um titulo" })
})

server.get("/create-point", (req, res) => {

    // req.query=> contém os parametros da consulta da url.
    // console.log(req.query)

    res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // req.body=>O corpo do nosso formulário
    // console.log(req.body)

    // inserir dados no banco de dados

    const query = `
    INSERT INTO places(
        name,
        image,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!!!")
        }
        console.log("Cadastrado com sucesso.")
        console.log(this)
        return res.render("create-point.html",{saved:true})
    }
    db.run(query, values, afterInsertData)
})



server.get("/search-results", function (req, res) {

    const search = req.query.search

    if(search == ""){
        // pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            console.log(err)
        }
        console.log("Aqui estão seus registros:")
        console.log(rows)

        const total = rows.length

        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })

})

// ligar o servidor

server.listen(3000)