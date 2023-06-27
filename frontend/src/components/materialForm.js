import { useState } from "react"

const MaterialForm = () => {
    const [totalCost, setTotalCost] = useState("")
    const [quantity, setQuantity] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newMaterial = { totalCost, quantity }

        const response = await fetch('/control-materials', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newMaterial)
        })

        const json = await response.json()

        if(response.ok) {
            setTotalCost("")
            setQuantity("")
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
                type="number"
                onChange={(e)=>setTotalCost(e.target.value)}
                id="totalCost"
            />

            <br></br>

            <label>Quantity: </label>
            <input
                type="number"
                onChange={(e)=>setQuantity(e.target.value)}
                id="quantity"
            />

            <br></br>

            <button>Add Material</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default MaterialForm