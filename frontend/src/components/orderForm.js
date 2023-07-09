import { useState, useEffect } from "react"

const OrderForm = () => {
    const [products, setProducts] = useState([])

    const [orderInputs, setOrderInputs] = useState([
        {product: '', quantity: 0}
    ])

    const [customer, setCustomer] = useState("")
    const [totalOrderPrice, setTotalOrderPrice] = useState(0)

    const [error, setError] = useState(null)

    // get products to form order
    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch('/control-products', {
                method: 'GET'
            })
    
            const json = await response.json()
    
            if(response.ok) {
                setProducts(json)
            }
    
            // TO-DO : handle unable to retrieve materials
        }
        getProducts()
    }, [])

    useEffect(() => {
        const getTotalCost = () => {
            if(products) {
                let totalPrice = 0
                orderInputs.forEach(input => {
                    products.forEach(product => {
                        if(input.product === product.name)
                        {
                            const productCost = input.quantity * product.pricePerUnit
                            totalPrice += productCost
                        }
                    })
                })
            setTotalOrderPrice(totalPrice)
            }
        }
        getTotalCost()
    }, [orderInputs, products])



    // HANDLING FORM INPUTS

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(orderInputs)
        const newOrder = { customer, orderInputs, totalOrderPrice }

        const response = await fetch('/control-orders', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newOrder)
        })

        const json = await response.json()

        if(response.ok) {
            setError(null)
        }

        else {
            setError(json.error)
        }
    }

    // adds another form for new product inputs
    const handleAddProductForm = (e) => {
        e.preventDefault()
        setOrderInputs([...orderInputs, {product: '', quantity: 0}])
    }

    // handle changes to material information forms
    const handleProductChange = (e, index) => {
        e.preventDefault()

        const previousState = [...orderInputs]
        previousState[index].product = e.target.value
        setOrderInputs(previousState)
    }

    // handle changes in input for amount of material used
    const handleQuantityChange = (e, index) => {
        e.preventDefault()
        
        const previousState = [...orderInputs]
        previousState[index].quantity = e.target.value
        setOrderInputs(previousState)
    }

    return (
        <form className="create-order">
            <h2>Create a New Order</h2>
            <br></br>

            <label>Customer Name:</label>
            <input
                type="string"
                onChange={(e)=>setCustomer(e.target.value)}
                id="customer"
            />

            <br></br>

            {orderInputs.map((input, index) => (
                <div className="new-order-inputs">
                    <select onChange = {(e) => handleProductChange(e, index)}>
                        {products && products.map((product) => (
                            <option 
                            className="product"
                            value={product.name}>
                            {product.name}
                            </option>
                        ))}
                    </select>
                    
                    <label>Number of Items: </label>
                    <input
                        type="number"
                        onChange={(e => handleQuantityChange(e, index))}
                        id="quantity"
                    />
                </div>
            ))}

            <button onClick={handleAddProductForm}>Add Material</button>

            <button onClick={handleSubmit}>Create Order</button>

        {error && <div className="error">{error}</div>}
    </form>
    )
}

export default OrderForm