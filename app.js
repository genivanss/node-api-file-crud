//dependências
const http = require('http');
const url = require('url');
const fs = require('fs');
const queryString = require('query-string');

//endereço e porta do servidor
const hostname = '127.0.0.1';
const port = 3000;

//Implementação
const server = http.createServer((req, res) => {

  let resposta;
  const urlParse = url.parse(req.url, true);

  //receber as informações
  const params =  queryString.parse(urlParse.search); 

  //criar ou atualiar um usuário
  if(urlParse.pathname == "/criar-usuario" || urlParse.pathname == "/atualizar-usuario" ) {
    //salvar as informações
    fs.writeFile('users/'+params.id+'.txt', JSON.stringify(params), function (err) {
      if (err) throw err;
      console.log('Saved!');

      resposta = urlParse.pathname == "/criar-usuario" ? "Usuario criado com sucesso" : "Usuario alterado com sucesso";

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });

  //selecionar usuário
  } else if(urlParse.pathname == "/selecionar-usuario") { 

    fs.readFile('users/'+params.id+'.txt', function(err, data) {
      resposta = data;

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta);
    });

  //remover usuário
  } else if(urlParse.pathname == "/remover-usuario"){

    fs.unlink('users/'+params.id+'.txt', function (err) {
      if (err) throw err;
      console.log('File deleted!');

      resposta = "Usuario excluido com sucesso";

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });

    //operação não definida
  } else {
    resposta = "Operacao nao existe";

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(resposta);
  }

});

//Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//Exemplos de Operações possíveis
//http://127.0.0.1:3000/criar-usuario?nome=raquel&idade=80&id=1
//http://127.0.0.1:3000/atualizar-usuario?nome=raquel&idade=90&id=1
//http://127.0.0.1:3000/selecionar-usuario?id=1
//http://127.0.0.1:3000/remover-usuario?id=1

