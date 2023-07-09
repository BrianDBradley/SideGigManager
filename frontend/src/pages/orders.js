import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import OrderForm from "../components/orderForm"

const Orders = () => {

    const [orders, setOrders] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const getOrders = async () => {
            const response = await fetch('/control-orders', {
                method: 'GET'
            }) 
            const json = await response.json()
            console.log(json)
    
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

    if(!Array.isArray(orders) || !orders.length) {
        return (
            <div className="no-orders">
                <div>
                    <h1>No Orders Found</h1>
                </div>
                <OrderForm></OrderForm>
            </div>
        )
    }

    return (
        <div className="order-page">
            <div className="orders">
                <h1>Orders</h1>
                <br></br>
                <div className="order-contents">
                    {orders && orders.map((order) => (
                        <><p>{order.customerName}</p>
                        {order.contents.map((content) => (
                            <p>{content.product}: {content.quantity}</p>
                        ))}
                        <p>{order.totalPrice}</p>
                        <p>{order.orderDate}</p>
                        <br></br></>
                    ))}
                </div>
            </div>
            <OrderForm> </OrderForm>
        </div>
    )
}

export default Orders