import express from 'express'
import ItemsController from '../controllers/items.js'

const router = express.Router()

router.get('/', ItemsController.getItems)
router.get('/:itemId', ItemsController.getItemById)
router.post('/', ItemsController.createItem)
router.delete('/:id', ItemsController.deleteItem)
router.patch('/:id', ItemsController.updateItem)

export default router