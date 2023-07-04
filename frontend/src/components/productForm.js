import { useState, useEffect } from "react"

const ProductForm = () => {
    const [materials, setMaterials] = useState('')

    const [productInputs, setProductInputs] = useState([
        {material: '', amount: 0}
    ])


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

    const handleAdd = (e) => {
        e.preventDefault()
        setProductInputs([...productInputs, {material: '', amount: 0}])
    }

    return (
        <form className="create-product" onSubmit={handleSubmit}>
            <h2>Add a New Product</h2>
            <br></br>

            {productInputs.map((material, index) => (
                <div>
                    <select>
                        {materials && materials.map((material) => (
                            <option value={material.name}>{material.name}</option>

                        ))}
                    </select>
                </div>
            ))}

            <button onClick={handleAdd}>Add Material</button>

        {error && <div className="error">{error}</div>}
    </form>
    )
}

export default ProductForm