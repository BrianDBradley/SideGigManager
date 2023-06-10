const express = require('express')
const router = express.Router()
const {
    getMaterials,
    createNewMaterial,
    updateMaterial,
    deleteMaterial
} = require('../controllers/materialController')

// GET all orders page
router.get('/', getMaterials)

// POST new orders
router.post('/', createNewMaterial)

// UPDATE an order
router.put('/:id')

// DELTE an order
router.delete('/:id')

module.exports = router