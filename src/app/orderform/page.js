'use client'

import React, { useContext, useEffect, useState } from 'react'
import styles from './page.module.css'
import {CartContext} from '@/context/CartContext'
import { useRouter } from 'next/navigation'

const Page = () => {
    const { cartData, setCartData } = useContext(CartContext)
    let quantity = 0
    let totalprice = 0
    const router = useRouter()

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            router.push('/login')
            alert('Please Login')
        }
        if (cartData.length == 0) {
            router.push('/menu')
        }
    })

    const [allValues, setAllValues] = useState({
        address: '',
        phoneNo: 0,
        deliveryAt: ''
    });

    const changeHandler = e => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('https://diamondeats.onrender.com/api/order/neworder', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "token": sessionStorage.getItem('token'),
                },
                body: JSON.stringify({ orderItems: cartData, Address: allValues.address, phoneNo: allValues.phoneNo, deliveryAt: allValues.deliveryAt, Price: parseFloat(totalprice) + 120 })
            })

            const data = await response.json()
            console.log(data);
            if (data.success) {
                alert(data.message)
                router.push('/myorders')
                setCartData([])
            }
            else {
                alert(data.message)
                router.push('/menu')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className={styles.orderFormMain}>
            <div className={styles.cartItems}>
                <h2>Your Cart</h2>
                {
                    cartData.map((elem, index) => {
                        quantity = parseInt(quantity) + parseInt(elem.Quantity)
                        totalprice = parseFloat(totalprice) + parseFloat(elem.TotalFoodPrice)
                        return (
                            <div key={index} className={styles.cartItem}>
                                <p>Name: {elem.FoodName}</p>
                                <p>Quantity: {elem.Quantity}</p>
                                <p>Price: {elem.TotalFoodPrice}</p>
                            </div>
                        )
                    })
                }
                <p className={styles.totalItems}><b>Total Food Items: </b> <i>{cartData.length}</i></p>
                <p className={styles.totalItems}><b>Total Food Quantity: </b> <i>{quantity}</i></p>
                <p className={styles.totalItems}><b>Total Paying Price: <i><b>Npr {parseFloat(totalprice) + 120}</b> (Rs 120 delivery charge)</i></b></p>
            </div>

            <div className={styles.orderForm}>
                <h2>Order Form</h2>
                <form>

                    <div className={styles.formGroup}>
                        <label htmlFor="addressInput">Address:</label>
                        <textarea id="addressInput" name="address" rows="4" placeholder='Country, District, City/town - wardno, tole.
                         eg: Nepal, Kaski, Pokhara, Chhorepatan-17. (You can give specific area name if you want eg: xyz tol)
                        ' required onChange={changeHandler}></textarea>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phoneInput">Phone No:</label>
                        <input type="Number" id="phoneInput" name="phoneNo" required onChange={changeHandler} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="deliveryTimeInput">Delivery Date:</label>
                        <input type="Date" id="deliveryTimeInput" name="deliveryAt" required onChange={changeHandler} />
                    </div>

                    <button type="submit" onClick={handleSubmit}>Place Order</button>
                </form>
            </div>
        </main>
    )
}

export default Page