import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
const port = 3000

async function main() {
  const allTasks = await prisma.task.findMany()
  console.log(allTasks)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

app.get('/tasks', (req, res) => {
  res.send('hello get')
})

app.post('/tasks', (req, res) => {
  res.send('hello post')
})

app.get('/tasks/:id', (req, res) => {
  res.send('hello get/:id')
})

app.put('/tasks/:id', (req, res) => {
  res.send('hello put')
})

app.delete('/tasks:id', (req, res) => {
  res.send('hello delete')
})

app.listen(port, (req, res) => {
  console.log("hello")
})