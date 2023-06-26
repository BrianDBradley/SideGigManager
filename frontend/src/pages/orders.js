import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Orders = () => {

    const [orders, setOrders] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const getOrders = async () => {
            const response = await fetch('/control-orders', {
                method: 'GET'
            }) 
            const json = await response.json()
    
            if(response.ok) {
                setOrders(json)
            }
            else {
                console.log('Could not retrieve list of orders')
                navigate('/dashboard')
            }
        }
        getOrders()
    }, [navigate])


    return (
        <div className="orders">
            <h1>Orders</h1>
            <br></br>
            {orders && orders.map((order) => (
                <><p>{order.name}</p>
                <p>{order.quantity}</p>
                <p>{order.orderDate}</p>
                <br></br></>
            ))}
        </div>
    )

}

export default Orders