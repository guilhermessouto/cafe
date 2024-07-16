import express from 'express'
import tasksRouter from './routes/tasks.js'

const app = express()
const port = 3000

app.use(express.json())

app.use('/tasks', tasksRouter)

app.listen(port, (req, res) => {
  console.log("hello")
})