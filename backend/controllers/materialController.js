const Material = require('../models/materialModel')
const mongoose = require('mongoose')


// Create a new material
const createNewMaterial = async (req, res) => {
    const { name, totalCost, quantity } = req.body

    Number(totalCost, quantity)
    const costPerPart = totalCost / quantity
    String(totalCost, quantity, costPerPart)

    const userUID = req.session.uniqueID

    try {
        if(req.session.authorized) {
            const material = await Material.create({name, totalCost, quantity, userUID, costPerPart})
            return res.status(200).json(material)
        }
        else {
            return res.status(400).json("Not Authorized")
        }
    }
    catch(error) {
        return res.status(400).json({error: error.message})
    }
}

const getMaterials = async (req, res) => {
    try {
        if(req.session.authorized){
            const userUID = req.session.uniqueID
            const materials = await Material.find({userUID: userUID}).sort({createdAt: -1}).exec()
            return res.status(200).json(materials)
        }
    } 
    catch(error) {
        return res.status(400).json({error: error.message})
    }
}

// Update a material
const updateMaterial = async (req, res) => {
    const { id } = req.params

    await Material.findOneAndUpdate({_id: id}, {...req.body}, {new: true}).exec()
        .then((docs)=>{
        console.log("Result :", docs);
     })
    .catch((err)=>{
        console.log(err);
    })

    res.status(200).json("Update got")
}

// Delete a material
const deleteMaterial = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json('Order Not Found')
    }

    const deletion = await Material.findOneAndDelete({_id: id}).exec()

    if(!deletion){
        return res.status(400).json('Order Not Found')
    }

    return res.status(400).json("Order Deleted")
}

module.exports = {
    getMaterials, 
    createNewMaterial,
    updateMaterial,
    deleteMaterial
}