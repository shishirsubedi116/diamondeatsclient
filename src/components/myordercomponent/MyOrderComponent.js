'use client'
import React from 'react'
import styles from './myordercomponent.module.css'

const MyOrderComponent = ({ orderData }) => {
    console.log(orderData);
    const { OrderId, customerName, orderItems, Address, phoneNo, deliveryAt, OrderStatus, OrderedAt, Email } = orderData
    console.log(orderItems);

    const cancelOrder = async (id) => {
        try {
            const isConfirmed = window.confirm(`Are you sure you want to cancel order ${OrderId}`)
            if (isConfirmed == true) {

                const response = await fetch(`https://diamondeats.onrender.com/api/order/cancelorder/${OrderId}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "token": sessionStorage.getItem('token')
                    }
                })
                const data = await response.json();
                if (data.success) {
                    alert(data.message)
                }
                else {
                    alert(data.message)
                }
            }
            else {
                return
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className={styles.orderItem}>
            <h3>OrderId <b>{OrderId}</b></h3>
            <p>Customer Name: <b>{customerName}</b></p>
            <p className={styles.foodOrdersItems}>Order Items: <b>
                {
                    orderItems.map((elem, index) => {
                        const { FoodName, FoodId, Quantity, TotalFoodPrice } = elem
                        return (
                            <> <br />
                                <span>SN:{index + 1}</span> &nbsp;
                                <span>Name: {FoodName}</span> <br />
                                <span>FoodId: {FoodId}</span> <br />
                                <span>Quantity: {Quantity}</span> <br />
                                <span>Price: {TotalFoodPrice}</span> <br />
                            </>
                        )
                    })
                }
            </b> </p>
            <p>Address: <b>{Address}</b></p>
            <p>Email: <b>{Email}</b></p>
            <p>Phone No: <b>{phoneNo}</b></p>
            <p>Delivery Date: <b>{deliveryAt.slice(0, 10)}</b></p>
            <p>Ordered Date: <b>{OrderedAt.slice(0, 10)}</b></p>
            <p>Order Status: <b>{OrderStatus}</b></p>
            <p><button onClick={cancelOrder}>Cancel Order</button></p>
        </div>
    )
}

export default MyOrderComponent