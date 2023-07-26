'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import MyOrderComponent from '@/components/myordercomponent/MyOrderComponent'
import { useRouter } from 'next/navigation'

const Page = () => {

  const router = useRouter();
  const [orderData, setOrderData] = useState([])
  useEffect(() => {
    console.clear()
  })
  const fetchdata = async () => {
    try {
      const response = await fetch('https://diamondeats.onrender.com/api/order/myallorders', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "token": sessionStorage.getItem('token')
        }
      })
      const data = await response.json()
      if (data.success) {
        setOrderData(data.message)
      }
      else {
        alert(data.message)
      }

    } catch (error) {
      //(error);
    }
  }

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      router.push('/login')
      alert('Please Login')
    }
    fetchdata()
  })


  return (
    <main className={styles.yourOrders}>
      <section className={styles.orders}>
        <h2>Your Orders</h2>
        <div className={styles.orderList}>
          {
            orderData.map((elem, index) => {
              return (
                <MyOrderComponent key={index} orderData={orderData[index]} />
              )
            })
          }
        </div>
      </section>
    </main>
  )
}

export default Page