import { useState, useEffect } from "react"

const ProductForm = () => {
    const [materials, setMaterials] = useState('')

    const [productInputs, setProductInputs] = useState([
        {material: '', amount: 0}
    ])


    const [name, setName] = useState("")
    const [costToProduce, setCostToProduce] = useState(0)
    const [pricePerUnit, setPricePerUnit] = useState(0)
    const [error, setError] = useState(null)

    // DATA UPDATES BASED ON INPUTS

    useEffect(() => {
        const getMaterials = async () => {
            const response = await fetch('/control-materials', {
                method: 'GET'
            })
    
            const json = await response.json()
    
            if(response.ok) {
                setMaterials(json)
            }
    
            // TO-DO : handle unable to retrieve materials
        }
        getMaterials()
    }, [])

    useEffect(() => {
        const getTotalCost = () => {
            if(materials) {
                let totalCost = 0
                productInputs.forEach(input => {
                    materials.forEach(material => {
                        if(input.material === material.name)
                        {
                            const inputCost = Number(material.costPerPart) * Number(input.amount)
                            totalCost += inputCost
                        }
                    })
                })
                const newSellingPrice = totalCost * 3
                setCostToProduce(totalCost)
                setPricePerUnit(newSellingPrice)
            }
        }
        getTotalCost()
    }, [productInputs, materials])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newProduct = { name, costToProduce, pricePerUnit }

        const response = await fetch('/control-products', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newProduct)
        })

        const json = await response.json()

        if(response.ok) {
            setName("")
            setCostToProduce("")
            setPricePerUnit("")
            setError(null)
        }

        else {
            setError(json.error)
        }
    }


    // HANDLING FORM INPUTS

    // adds another form for new product inputs
    const handleAddMaterialComponent = (e) => {
        e.preventDefault()
        setProductInputs([...productInputs, {material: '', amount: 0}])
    }

    // handle changes to material information forms
    const handleMaterialChange = (e, index) => {
        e.preventDefault()

        const previousState = [...productInputs]
        previousState[index].material = e.target.value
        setProductInputs(previousState)
    }

    // handle changes in input for amount of material used
    const handleWeightChange = (e, index) => {
        e.preventDefault()
        
        const previousState = [...productInputs]
        previousState[index].amount = e.target.value
        setProductInputs(previousState)
    }

    return (
        <form className="create-product">
            <h2>Add a New Product</h2>
            <br></br>

            <label>Product Name: </label>
            <input
                type="string"
                onChange={(e)=>setName(e.target.value)}
                id="name"
            />

            <br></br>

            <h2>Materials Used:</h2>

            {productInputs.map((input, index) => (
                <div className="new-product-inputs">
                    <select onChange = {(e) => handleMaterialChange(e, index)}>
                        {materials && materials.map((material) => (
                            <option 
                            className="material"
                            value={material.name}>
                            {material.name}
                            </option>
                        ))}
                    </select>
                    
                    <label>Amount Used: </label>
                    <input
                        type="string"
                        onChange={(e => handleWeightChange(e, index))}
                        id="weight"
                        step={.01}
                        min={0}
                    />
                </div>
            ))}

            <button onClick={handleAddMaterialComponent}>Add Material</button>

            <button onClick={handleSubmit}>Add Product</button>

        {error && <div className="error">{error}</div>}
    </form>
    )
}

export default ProductForm