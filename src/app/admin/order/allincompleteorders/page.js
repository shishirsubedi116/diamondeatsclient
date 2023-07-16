'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import OrderItem from '@/components/orderItem/orderItem'

const Page = () => {

    const [searchvalue, setSearchvalue] = useState('')
    const [orders, setOrders] = useState([]);
    const router = useRouter();


    const fetchAllOrders = async () => {
        try {
            const fetchItems = await fetch('https://diamondeats.onrender.com/api/admin/order/allincompleteorders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': sessionStorage.getItem('token')
                }
            })
            const data = await fetchItems.json()
            if (data.success) {
                setOrders(data.message)
            }
            else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllOrders()
    }, [])

    return (
        <main className={styles.getAllOrders}>
            <section className={styles.adminOrders}>
                <h2>All Incomplete Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Name</th>
                            <th>Phone No</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Order Items</th>
                            <th>Order Status</th>
                            <th>Ordered At</th>
                            <th>Delivery At</th>
                            <th>Price</th>
                            <th>Edit Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchData.length == 0 ?
                                orders.map((elem) => {
                                    return (
                                        <OrderItem _id={elem._id} OrderId={elem.OrderId} customerName={elem.customerName} phoneNo={elem.phoneNo} Address={elem.Address} Email={elem.Email} orderItems={elem.orderItems} OrderStatus={elem.OrderStatus} OrderedAt={elem.OrderedAt.slice(0, 10)} Price={elem.Price} deliveryAt={elem.deliveryAt.slice(0, 10)} />
                                    )
                                }) : searchData.map((elem) => {
                                    return (
                                        <OrderItem _id={elem._id} OrderId={elem.OrderId} customerName={elem.customerName} phoneNo={elem.phoneNo} Address={elem.Address} Email={elem.Email} orderItems={elem.orderItems} OrderStatus={elem.OrderStatus} OrderedAt={elem.OrderedAt.slice(0, 10)} Price={elem.Price} deliveryAt={elem.deliveryAt.slice(0, 10)} />
                                    )
                                })
                        }

                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default Page