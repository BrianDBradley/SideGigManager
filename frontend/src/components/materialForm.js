import { useState } from "react"

const MaterialForm = () => {
    const [totalCost, setTotalCost] = useState("")
    const [quantity, setQuantity] = useState("")
    const [costPerPart, setCostPerPart] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newMaterial = { totalCost, quantity, costPerPart }

        const response = await fetch('/control-materials', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newMaterial)
        })

        const json = await response.json()

        if(response.ok) {
            setTotalCost("")
            setQuantity("")
            setCostPerPart("")
            setError(null)
        }

        else {
            setError(json.error)
        }
    }

    return (
        <form className="create-material" onSubmit={handleSubmit}>
            <h1>Add a New Material</h1>
            <br></br>

            <label>Total Cost: </label>
            <input
                type="text"
                onChange={(e)=>setTotalCost}
                value={totalCost}
            />

            <label>Quantity: </label>
            <input
                type="text"
                onChange={(e)=>setQuantity}
                value={quantity}
            />

            <button>Add Material</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default MaterialForm