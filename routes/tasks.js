import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('hello get')
})

router.get('/:id', (req, res) => {
    res.send('hello get/:id')
})
  
router.post('/', (req, res) => {
    res.send('hello post')
})
    
router.put('/:id', (req, res) => {
    res.send('hello put')
})

router.delete('/:id', (req, res) => {
    res.send('hello delete')
})

export default router