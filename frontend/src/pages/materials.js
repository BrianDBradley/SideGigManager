import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Materials = () => {
    const [materials, setMaterials] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const getMaterials = async () => {
            const response = await fetch('/control-materials', {
                method: 'GET'
            }) 
            const json = await response.json()
    
            if(response.ok) {
                setMaterials(json)
            }
            else {
                console.log('Could not retrieve list of materials')
                navigate('/dashboard')
            }
        }
        getMaterials()
    }, [navigate])


    return (
        <div className="materials">
            <h1>Materials</h1>
            <br></br>
            {materials && materials.map((material) => (
                <><p>{material.totalCost}</p>
                <p>{material.quantity}</p>
                <p>{material.costPerPart}</p>
                <br></br></>
            ))}
        </div>
    )
}

export default Materials