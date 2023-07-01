import { useState, useEffect } from "react"

const ProductForm = () => {
    const [materials, setMaterials] = useState("")
    const [weight, setWeight] = useState("")

    const [name, setName] = useState("")
    const [costToProduce, setCostToProduce] = useState("")
    const [pricePerUnit, setPricePerUnit] = useState("")
    const [error, setError] = useState(null)

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
    }, [materials])

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
            />

            <br></br>

            <h2>Materials Used:</h2>

            <select>
            {materials && materials.map((material) => (
                    <option value={material.name}>{material.name}</option>
            ))}
            </select>

            <label>Amount Used: </label>
            <input
                type="string"
                onChange={(e)=>setWeight(e.target.value)}
                id="weight"
                step={.01}
                min={0}
            />

            <button>Add Material</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ProductForm