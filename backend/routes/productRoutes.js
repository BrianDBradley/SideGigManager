const express = require('express')
const router = express.Router()
const {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProducts
} = require('../controllers/productController')

router.get('/', getAllProducts)

router.get('/:id', getProduct)

router.post('/', createProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

module.exports = router