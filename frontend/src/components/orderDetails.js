const OrderDetails = ({ order }) => {

    return (
      <div className="order-details">
        <h4>{order.name}</h4>
        <p><strong>Ordered on: </strong>{order.orderDate}</p>
        <p><strong>Quantity: </strong>{order.quantity}</p>
      </div>
    )
  }
  
  export default OrderDetails