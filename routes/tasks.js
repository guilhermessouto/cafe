import { PrismaClient } from '@prisma/client'
import express from 'express'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany()
    res.json(tasks)

  } catch (error) {
    res.status(500).json({ error: 'Error' })
    console.log(error)
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const task = await prisma.task.findUnique({
      where: {  id: Number(id)  }
    })

    if (!task) 
      return res.status(404).json({ error: 'Não encontrado' })
  
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ error: 'Error' })
    console.log(error)
  }
})

router.post('/', async (req, res) => {
  const { title, content } = req.body

  if (!title || !content)
    return res.status(400).json({ error: 'Campo obrigatório' })

  try {
    const task = await prisma.task.create({
      data:{ title, content }
    })
  
    res.status(201).json({ msg: 'Criado' })
  } catch (error) {
    res.status(500).json({ error: 'Error' })
    console.log(error)
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const updateTask = await prisma.task.update({
      where: { id: Number(id) },
      data: data
    })
  
    res.status(201).json({ msg: 'Atualizado' })
  } catch (error) {
    res.status(500).json({ error: 'Error' })
    console.log(error)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deleteTask = await prisma.task.delete({
      where: { id: Number(id) },
    })
  
    res.status(201).json({ msg: 'Deletado' })
  } catch (error) {
    res.status(500).json({ error: 'Error' })
    console.log(error)
  }
})

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default router