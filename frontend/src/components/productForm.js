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

    const handlePrint = (e) => {
        e.preventDefault()
        console.log(productInputs)
    }

    const handleChange = (e, index) => {
        e.preventDefault()

        const {className, value} = e.target
        const previousData = [...productInputs]
        previousData[index][className] = value
        setProductInputs(previousData)
    }

    return (
        <form className="create-product">
            <h2>Add a New Product</h2>
            <br></br>

            {productInputs.map((input, index) => (
                <div>
                    <select onChange = {(e) => handleChange(e, index)}>
                        {materials && materials.map((material) => (
                            <option 
                            className="material"
                            value={material.name}>
                            {material.name}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            <button onClick={handleAdd}>Add Material</button>

            <button onClick={handlePrint}>Log</button>

        {error && <div className="error">{error}</div>}
    </form>
    )
}

export default ProductForm