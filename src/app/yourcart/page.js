'use client'
import React, { useContext, useEffect } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import CartContext from '@/context/CartContext'

const Page = () => {
  const router = useRouter()
  const { cartData, setCartData } = useContext(CartContext)
  let totalpayprice = 0
  

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      router.push('/login')
      alert('Please Login')
    }
  })

  const deleteItem = async (id) => {
    let newCartData = cartData.filter((elem) => {
      return elem.FoodId !== id
    })
    setCartData(newCartData)
  }

  return (
    <main className={styles.yourCartPage}>
      <h1>Your Cart</h1>
      <section className={styles.cartPage}>
        <div className={styles.cartItems}>
          { cartData.length == 0?<> <h3>No Items</h3></>:
            cartData.map((elem) => {
              totalpayprice = parseFloat(totalpayprice) + parseFloat(elem.TotalFoodPrice)
              return (
                <div className={styles.cartItem}>
                  <h2>{elem.FoodName}</h2>
                  <p>Price per Quantity: {elem.FoodPrice}</p>
                  <p>Quantity: {elem.Quantity}</p>
                  <p>Price: {elem.TotalFoodPrice}</p>
                  <button onClick={() => deleteItem(elem.FoodId)}>Remove</button>
                </div>
              )
            })
          }
        </div>

        <div className={styles.totalPrice}>
          <h2>Total Price: Npr {totalpayprice}</h2>
        </div>

        <button className={styles.placeOrderButton} onClick={() => router.push('/orderform')} type="button">Order Now</button>
      </section>
    </main>
  )
}

export default Page