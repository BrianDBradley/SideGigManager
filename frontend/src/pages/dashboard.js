import { Link } from "react-router-dom"

const Dashboard = () => {
    return (
        <div> 
            <h1>User Dashboard</h1>
            <Link to="/materials">Materials</Link>
            <br />
            <Link to="/products">Products</Link>
            <br />
            <Link to="/orders">Orders</Link>
        </div>

    )
}

export default Dashboard