'use client'
import React, { useContext, useEffect, useState } from 'react'
import styles from '../page.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CartContext } from '@/context/CartContext'

const Page = ({ params }) => {
  const id = params.id

  const [foodItem, setFoodItem] = useState({})
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const { cartData, setCartData } = useContext(CartContext)

  const fetchData = async () => {
    try {
      const response = await fetch(`https://diamondeats.onrender.com/api/food/singlefood/${id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      if (data.success) {
        setFoodItem(data.message)
      }
      else {
        alert(data.message)
        router.push('/menu')
      }

    } catch (error) {
      console.log(error);
    }
  }

  const addItem = async () => {
    if (!sessionStorage.getItem('token')) {
      alert('Please Login First')
      router.push('/login')
      return
    }
    try {
      const order = {
        "FoodName": foodItem.Name,
        "FoodId": foodItem.foodId,
        "FoodPrice": foodItem.Price,
        "Quantity": quantity,
        "TotalFoodPrice": foodItem.Price * quantity,
      }
      setCartData([...cartData, order])
      router.push('/menu')
      alert('Item Added')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  })

  useEffect(() => {
    if (quantity < 1) {
      setQuantity(1)
    }
  }, [quantity])

  const handleChange = (e) => {
    if (e.target.value < 1) {
      setQuantity(1)
    }
    else {
      setQuantity(e.target.value)
    }
  }

  const handleSum = (type) => {
    if (type == 'plus') {
      setQuantity(quantity + 1)
    }
    if (type == 'minus') {
      setQuantity(quantity - 1)
    }
  }

  return (
    <main className={styles.viewFoodBox}>
      <section className={styles.foodItem}>
        <div className={styles.foodItem__image}>
          <Image src={`https://diamondeats.onrender.com/public/images/${foodItem.Picture}`} alt=' Food Image' height={400} width={500} />
        </div>
        <div className={styles.foodItem__details}>
          <h2><b>{foodItem.Name}</b></h2>
          <p>Category: <b>{foodItem.Category}</b></p>
          <p>FoodId: <b>{foodItem.foodId}</b></p>
          <p>Price: <b>{foodItem.Price}</b></p>
          <p>Availability: <b>{foodItem.Availability == 'true' ? <>Available</> : <>Not Available</>}</b></p>
          <p>Quantity: <input type="Number" value={quantity} onChange={(e) => handleChange(e)} /></p>
          <button onClick={() => handleSum('plus')}>+</button> <button onClick={() => handleSum('minus')}>-</button><br />
          {
            foodItem.Availability == 'true' ? <button type="button" onClick={addItem}>Add to Cart</button> :
              <button type="button" onClick={addItem} disabled style={{ cursor: 'not-allowed' }}>Add to Cart</button>
          }
        </div>
      </section>

    </main>
  )
}

export default Page