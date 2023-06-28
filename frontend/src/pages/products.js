import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ProductForm from "../components/productForm"

const Products = () => {
    const [products, setProducts] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch('/control-products', {
                method: 'GET'
            })
            const json = await response.json()

            if(response.ok) {
                setProducts(json)
            }
            else {
                console.log("Could Not Retrieve Products")
                navigate('/dashboard')
            }
        }
        getProducts()
    }, [navigate])

    if(!Array.isArray(products) || !products.length) {
        return (
            <div className="noProducts">
                <div>
                    <h1>No Products Found</h1>
                </div>
                <ProductForm></ProductForm>
            </div>
        )
    }

    return (
    <div className="product-page">
        <div className="products">
            <h1>Products</h1>
            <br></br>
            {products && products.map((product) => (
                <><p>{product.name}</p>
                <p>{product.costToProduce}</p>
                <p>{product.pricePerUnit}</p>
                <br></br></>
        ))}
        </div>
        <ProductForm></ProductForm>
    </div>
    )
}

export default Products