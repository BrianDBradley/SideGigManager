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

    const handleAdd = (e) => {
        e.preventDefault()
        setProductInputs([...productInputs, {material: '', amount: 0}])
    }

    const handleMaterialChange = (e, index) => {
        e.preventDefault()

        const previousState = [...productInputs]
        previousState[index].material = e.target.value
        setProductInputs(previousState)
    }

    const handleWeightChange = (e, index) => {
        e.preventDefault()
        
        const previousState = [...productInputs]
        previousState[index].amount = e.target.value
        setProductInputs(previousState)
    }

    const handlePrint = (e) => {
        e.preventDefault()
        console.log(productInputs)
    }

    return (
        <form className="create-product">
            <h2>Add a New Product</h2>
            <br></br>

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

            <button onClick={handleAdd}>Add Material</button>

            <button onClick={handlePrint}>Log</button>

        {error && <div className="error">{error}</div>}
    </form>
    )
}

export default ProductForm