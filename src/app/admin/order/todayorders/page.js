'use client'


import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import OrderItem from '@/components/orderItem/orderItem'

const page = () => {

    const [searchvalue, setSearchvalue] = useState('')
    const [orders, setOrders] = useState([]);
    const router = useRouter();
    const [searchData, setSearchData] = useState([])

    const getSearchData = async (e) => {
        e.preventDefault()
        try {
            const fetchItems = await fetch(`https://diamondeats.onrender.com/api/admin/order/searchorder/${searchvalue}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': sessionStorage.getItem('token')
                }
            })
            const data = await fetchItems.json()
            console.log(data);
            if (data.success) {
                setSearchData(data.message)
            }
            else {
                alert(data.message)
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAllOrders = async () => {
        try {
            const fetchItems = await fetch('https://diamondeats.onrender.com/api/admin/order/todayorders', {
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
            <div className={styles.searchSection}>
                <input type="text" id="search" name="search" value={searchvalue} onChange={(e) => setSearchvalue(e.target.value)} placeholder="Search order..." />
                <button type="button" onClick={getSearchData}>Search</button>
            </div>


            <section className={styles.adminOrders}>
                <h2>Today's Orders</h2>
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

export default page