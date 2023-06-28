import { useState } from "react"

const ProductForm = () => {
    const [name, setName] = useState("")
    const [costToProduce, setCostToProduce] = useState("")
    const [pricePerUnit, setPricePerUnit] = useState("")
    const [error, setError] = useState(null)

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

    return (
        <form className="create-product" onSubmit={handleSubmit}>
            <h1>Add a New Product</h1>
            <br></br>

            <label>Product Name: </label>
            <input
                type="string"
                onChange={(e)=>setName(e.target.value)}
                id="name"
                step={.01}
                min={0}
            />

            <br></br>

            <label>Cost to Produce: </label>
            <input
                type="number"
                onChange={(e)=>setCostToProduce(e.target.value)}
                id="productionCost"
            />

            <br></br>

            <label>Price Per Unit: </label>
            <input
                type="number"
                onChange={(e)=>setPricePerUnit(e.target.value)}
                id="pricePerUnit"
                step={.01}
                min={0}
            />

            <br></br>

            <button>Add Product</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ProductForm