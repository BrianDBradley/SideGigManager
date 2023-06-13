const express = require('express')
const router = express.Router()
const {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')

router.get('/', getProduct)

router.post('/', createProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

module.exports = router