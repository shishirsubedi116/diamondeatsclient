import React from 'react'
import Link from 'next/link'
import styles from './orderitem.module.css'

const OrderItem = (props) => {
  return (
    <tr key={props._id}>
      <td>{props.OrderId}</td>
      <td>{props.customerName}</td>
      <td>{props.phoneNo}</td>
      <td>{props.Email}</td>
      <td>{props.Address}</td>
      <td><p>
        {
          props.orderItems.map((elem, index) => {
            const { FoodName, FoodId, Quantity, TotalFoodPrice } = elem
            return (
              <> <br />
                <span>Name: {FoodName}</span> <br />
                <span>FoodId: {FoodId}</span> <br />
                <span>Quantity: {Quantity}</span> <br />
                <span>Price: {TotalFoodPrice}</span> <br />
              </>
            )
          })
        }
      </p></td>
      <td>{props.OrderStatus}</td>
      <td>{props.OrderedAt}</td>
      <td>{props.deliveryAt}</td>
      <td>{props.Price}</td>
      <td><Link href={`/admin/order/editorder/${props._id}`}>Edit</Link></td>
    </tr>
  )
}

export default OrderItem