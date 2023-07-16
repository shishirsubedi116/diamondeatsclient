'use client'

import React, { useState } from 'react'
import styles from '../page.module.css'
import { useRouter } from 'next/navigation';

const page = ({ params }) => {
    const id = params.id;

    const [status, setStatus] = useState('Completed')
    const router = useRouter()

    const updateOrder = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://diamondeats.onrender.com/api/admin/order/editorder/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'token': sessionStorage.getItem('token')
                },
                body:JSON.stringify({status})
            })
            const data = await response.json()
            if (data.success) {
                alert(data.message)
                router.push('/admin/order/todayorders')
            }
            else {
                alert(data.message)
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <main className={styles.editOrder}>
            <section className={styles.adminForm}>
                <h2>Update Orders</h2>
                <form>
                    <label htmlFor="status">Status:</label>
                    <select id="status" name="status" required value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Completed">Completed</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Discarded">Discarded</option>
                        <option value="Incomplete">Incomplete</option>
                    </select>
                    <button type='submit' onClick={updateOrder}>Update Order</button>
                </form>
            </section>
        </main>
    )
}

export default page