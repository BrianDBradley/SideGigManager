const Product = require('../models/productModel')
const mongoose = require('mongoose')

const getAllProducts = async (req, res) => {
    try {
        if(req.session.authorized){
            const userUID = req.session.uniqueID
            const products = await Product.find({userUID: userUID}).sort({createdAt: -1}).exec()
            return res.status(200).json(products)
        }
    } 
    catch(error) {
        return res.status(400).json({error: error.message})
    }
}

const createProduct = async (req, res) => {
    const { name, costToProduce, pricePerUnit } = req.body

    try {
        const userUID = req.session.uniqueID
        const product = await Product.create({name, costToProduce, userUID, pricePerUnit})
        res.status(200).json(product)
    } catch(err) {
        res.status(404).json({error: error.message})
    }
}

const getProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)

    if(product){
        res.status(200).json(product)
    } else {
        res.status(404).json('Product Not Found')
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params

    await Product.findOneAndUpdate({_id: id}, {...req.body}, {new: true}).exec()
        .then((docs)=>{
        console.log("Result :", docs);
     })
    .catch((err)=>{
        console.log(err);
    })

    res.status(200).json("Update got")
}

const deleteProduct = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json('Product Not Found')
    }

    const deletion = await Product.findOneAndDelete({_id: id}).exec()

    if(!deletion){
        return res.status(400).json('Product Not Found')
    }

    return res.status(400).json("Product Deleted")
}

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts
}