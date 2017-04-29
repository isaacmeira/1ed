// Carrega os módulos
var http = require('http');
var url  = require('url')
var mysql      = require('mysql');

// Retorna os carros para a tela
function getCarros(response,tipo) {
	// Faz a leitura do arquivo de forma assíncrona
	// Cria a conexão com MySQL
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'livro',
		  password : 'livro123',
		  database : 'livro'
		});

		// Conecta no banco de dados	
		connection.connect();

		// Cria uma consulta
		connection.query("select id,nome,tipo from carro where tipo = '" + tipo + "'", function (error, results, fields) {
		  if (error) throw error;
		  
		  // Aqui quero fazer um for e imprimir mas nao consigo

		  // Converte o array de resultados para JSON
		  var json = JSON.stringify(results)
		  
		  // Envia o JSON como resposta
		  response.end(json)
		});

		// Fecha a conexão.
		connection.end();
}

// Função de callback para o servidor HTTP
function callback(request, response) {
	// Cabeçalho (header) com o tipo da resposta + UTF-8 como charset
	// response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
	// Faz o parser da URL separando o caminho (path)
	var parts = url.parse(request.url);
	var path = parts.path;

	// Configura o tipo de retorno para application/json
	response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});

	// Verifica o path
	if (path == '/carros/classicos') {
		getCarros(response, "classicos")
	} else if (path == '/carros/esportivos') {
		getCarros(response, "esportivos")
	} else if (path == '/carros/luxo') {
		getCarros(response, "luxo")
	} else {
		response.end("Not found: " + path);
	}
}
// Cria um servidor HTTP que vai responder "Hello World" para todas requisições.
var server = http.createServer(callback);
// Porta que o servidor vai escutar
server.listen(3000);
// Mensagem ao iniciar o servidor
console.log("Servidor iniciado em http://localhost:3000/");