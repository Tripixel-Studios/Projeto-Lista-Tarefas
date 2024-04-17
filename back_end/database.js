import { sql } from './db.js';

export class Database {

    async createUser(name, email, password) {
        try {
            const userExists = await sql`
                SELECT 1 FROM TB_USUARIO WHERE EMAIL_USUARIO = ${email}
            `;

            if (userExists.length > 0) {
                return 'E-mail já registrado.'
            }

            await sql`
                INSERT INTO TB_USUARIO (NOME_USUARIO, EMAIL_USUARIO, SENHA_USUARIO)
                VALUES (${name}, ${email}, ${password})
            `;

            return 'Usuário criado com sucesso.'
        } catch (error) {
            console.error('Erro ao criar usuário:', error)
            return 'Erro interno no servidor'
        }
    }

    async fetchUsers()
    {
      try{
        const userExists = await sql`SELECT * FROM TB_USUARIO`
        
        if(userExists.length === 0) 
          return 'Sem usuários cadastrados.'

        const usuarios = await sql`SELECT * FROM TB_USUARIO`
        return usuarios
      }
      catch(error){
        console.error('Erro ao buscar usuários: ', error)
        return 'Erro interno no servidor'
      }
    }

    async updateUser(id, name, email, password)
    {
      try{
        const userExists = await sql`SELECT 1 FROM TB_USUARIO WHERE ID_USUARIO = ${id}`
        
        if(userExists.length === 0) 
          return 'Usuario não encontrado.'
      
        await sql`UPDATE TB_USUARIO SET 
        NOME_USUARIO = ${name}, 
        EMAIL_USUARIO = ${email}, 
        SENHA_USUARIO = ${password}
        WHERE ID_USUARIO = ${id}`

        return 'Usuario atualizado com sucesso'
      }
      catch(error){
        console.error('Erro ao atualizar cadastro: ', error)
        return 'Erro interno no servidor'
      }
    }

    async deleteUser(id)
    {
      try{
        const userExists = await sql`SELECT 1 FROM TB_USUARIO WHERE 
        ID_USUARIO = ${id}`
    
        if(userExists.length === 0) 
            return 'Usuario não encontrado ou credenciais invalidas.'
    
        await sql`DELETE FROM TB_USUARIO WHERE ID_USUARIO = ${id}`
    
        return 'Usuario deletado com sucesso'
      }
      catch(error){
        console.error('Erro ao deletar usuário: ', error)
        return 'Erro interno no servidor'
      }
    }

    async fetchCategories(idUser)
    {
      try{
        const categorias = await sql`SELECT * FROM TB_CATEGORIA WHERE ID_USUARIO = ${idUser}`
        return categorias
      }
      catch (error) {
        console.error('Erro ao buscar categorias:', error);
        throw new Error('Erro interno do servidor.')
      }
    }

    async updateCategory(id, name)
    {
      try{
        const categoryExists = await sql`SELECT 1 FROM TB_CATEGORIA WHERE 
        ID_CATEGORIA = ${id}`

        if(categoryExists.length === 0) 
            return 'Categoria não encontrada.'

        const result = await sql`UPDATE TB_CATEGORIA SET NOME_CATEGORIA = ${name} WHERE ID_CATEGORIA = ${id}`;
        
        return 'Categoria alterada com sucesso!';
      }
      catch (error){
        console.error('Erro ao buscar categorias:', error)
        return 'Erro interno no servidor'
      }
    }

    async createCategory(id, name)
    {
      try {
        const userExists = await sql`
                SELECT 1 FROM TB_USUARIO WHERE ID_USUARIO = ${id}
            `

            if (userExists.length === 0) {
                return 'Usuário não encontrado.'
            }

        await sql`
                INSERT INTO TB_CATEGORIA (ID_USUARIO, NOME_CATEGORIA)
                VALUES(${id}, ${name})`
               
        return 'Categoria criada com sucesso'
      } 
      catch (error) {
        console.error('Erro ao criar categoria', error)
        return 'Erro interno no servidor'
      }
    }

    async deleteCategory(id)
    {
      try {
    
        const categoryExists = await sql`SELECT 1 FROM TB_CATEGORIA WHERE ID_CATEGORIA = ${id}`
    
        if(categoryExists.length === 0) return 'Categoria não encontrada.'

        await sql`DELETE FROM TB_CATEGORIA WHERE ID_CATEGORIA = ${id}`

        return 'Categoria deletada com sucesso.'
      } 
      catch (error) {
        console.error('Erro ao deletar categoria', error)
        return 'Erro interno no servidor'
      }
    }

    async createTask(id, name)
    {
      console.log('id: ', id, 'name: ', name)
      try 
      {
        const categoryExists = await sql`SELECT 1 FROM TB_CATEGORIA
         WHERE ID_CATEGORIA = ${id}`
        
         if (!categoryExists.length)
         {
           return 'Categoria não encontrada.';
         }

        await sql`INSERT INTO TB_TAREFA (ID_CATEGORIA, NOME_TAREFA) 
        VALUES (${id}, ${name})`

         return 'Categoria criada com sucesso'
      }
      catch (error) {
        console.error('Erro ao criar categoria: ', error)
        return 'Erro interno no servidor'
      }
    }

    async fetchTasks(id)
    {
      try 
      {
        const categoryExists = await sql`SELECT 1 FROM TB_TAREFA
         WHERE ID_CATEGORIA = ${id}`
        
        if(categoryExists === 0)
        {
          return 'Nenhuma categoria encontrada.'
        }

        const categorias = await sql`SELECT * FROM TB_TAREFA WHERE ID_CATEGORIA = ${id}`

        return categorias
      } 
      catch (error) {
        console.error('Erro ao buscar categorias', error)
        return 'Erro interno no servidor'
      }
    }

    async updateTask(id, name, state)
    {
      try 
      {
        const taskExists = await sql`SELECT 1 FROM TB_TAREFA
         WHERE ID_CATEGORIA = ${id}`
        
        if(taskExists === 0)
        {
          return 'Tarefa não encontrada.'
        }

        await sql`UPDATE TB_TAREFA
         SET NOME_TAREFA = ${name}, ESTADO_TAREFA = ${state} WHERE ID_TAREFA = ${id}`

        return 'Tarefa atualizada com sucesso.'
      } 
      catch (error) {
        console.error('Erro ao atualizar tarefa: ', error)
        return 'Erro interno no servido.'
      }
    }
}