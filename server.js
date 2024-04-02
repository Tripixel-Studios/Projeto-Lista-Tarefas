import {fastify} from 'fastify';

const serve = fastify()

// Teste
serve.get('/', async (req, res) => {
  return "Servidor Ativo!!"
})

// Rota para criar um novo usuário
serve.post('/usuario', (req, res) => {
  return "Servidor Ativo!!"
})

// Rota para alterar um usuário
serve.put('/usuario', (req, res) => {
  return "Servidor Ativo!!"
})

// Rota para deletar um usuário
serve.delete('/usuario/:id', (req, res) => {
  return "Servidor Ativo!!"
})

// Rota para buscar todas as categorias
serve.get('/categorias/:id', (req, res) => {
  return "Servidor Ativo!!"
});

// Rota para alterar uma categoria
serve.put('/categori', (req, res) => {
  return "Servidor Ativo!!"
})

// Rota para criar uma nova categoria
serve.post('/categoria', (req, res) => {
  return "Servidor Ativo!!"
})

// Rota para deletar uma categoria
serve.delete('/categoria/:id', (req, res) => {
  return "Servidor Ativo!!"
})

// Rota para criar uma nova tarefa
serve.post('/tarefa/:id', (req, res) => {
  return "Servidor Ativo!!"
})

// Rota para buscar todas as tarefas
serve.get('/tarefas/:id', (req, res) => {
  return "Servidor Ativo!!"
})

// Rota para deletar uma tarefa
serve.delete('/tarefa/:id', (req, res) => {
  return "Servidor Ativo!!"
})


serve.listen({
  port:3333
})