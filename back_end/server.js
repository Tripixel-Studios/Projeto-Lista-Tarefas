import { fastify } from 'fastify';
import { sql } from './db.js';
import { Database } from './database.js';


const serve = fastify()

const database = new Database();


// Teste
serve.get('/', async (req, res) => {
  return "Servidor Ativo!!"
})

// Rota para criar um novo usuário
serve.post('/usuario', async (req, res) => {

    const { name, email, password } = req.body
    
    const message = await database.createUser(name, email, password);
    return message
})

// Rota para listar usuários
serve.get('/usuarios', async(req, res) => {
  const message = await database.fetchUsers()
  return message
})

// Rota para alterar um usuário
serve.put('/usuario/:id', async(req, res) => {

  const {id} = req.params
  const {name, email, password} = req.body

  const message = await database.updateUser(id, name, email, password)
  return message
})

// Rota para deletar um usuário
serve.delete('/usuario/:id', async(req, res) => {

  const {id} = req.params

  const message = await database.deleteUser(id)
  return message
})

// Rota para buscar todas as categorias
serve.get('/usuario/:iduser/categorias', async(req, res) => {
  const {iduser}  = req.params

  const message = await database.fetchCategories(iduser)
  return message
});

// Rota para criar uma nova categoria
serve.post('/usuario/:idUser/categoria', async (req, res) => {
  const {name} = req.body;
  const {idUser} = req.params

  const message = await database.createCategory(idUser, name);
  return message
});

// Rota para alterar uma categorias
serve.put('/categoria/:id', async(req, res) => {
  const {name} = req.body
  const {id} = req.params

  const message = await database.updateCategory(id, name)
  return message
})

// Rota para deletar uma categoria
serve.delete('/categoria/:id', async(req, res) => {
  const {id} = req.params

  const message = await database.deleteCategory(id);
  return message
})

// Rota para criar uma nova tarefa
serve.post('/categoria/:id/tarefa', async(req, res) => {
  const {id} = req.params
  const {name} = req.body

  const message = await database.createTask(id, name)
  return message
})

// Rota para buscar todas as tarefas
serve.get('/categoria/:id/tarefa', async(req, res) => {
  const {id} = req.params

  const message = await database.fetchTasks(id)
  return message

})

//Rota para editar tarefas
serve.put('/tarefa/:id', async(req, res) => {
  const {id} = req.params
  const {name, state} = req.body

  const message = await database.updateTask(id, name, state)
  return message
})

// Rota para deletar uma tarefa
serve.delete('/tarefa/:id', (req, res) => {
  return "Servidor Ativo!!"
})


serve.listen({
  port:3333
})