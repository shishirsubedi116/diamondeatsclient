'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

const Page = () => {
    const [foodId, setFoodId] = useState(0)
    const router = useRouter();

    useEffect(()=>{
        if(!sessionStorage.getItem('isAdmin') || !sessionStorage.getItem('token')){
            router.push('/')
        }
    },[])

    const deleteFood = async (e) => {
        e.preventDefault()
        try {
            const confirmed = window.confirm(`Are you sure you want to delete food ${foodId}`)
            if(confirmed == false){
                return
            }
            const response = await fetch(`https://diamondeats.onrender.com/api/admin/food/delete/${foodId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "token": sessionStorage.getItem('token'),
                },
            })
            const data = await response.json()
            if(data.success){
                alert(data.message)
                router.push('/admin')
            }else{
                alert(data.message)
                router.push('/admin')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <main className={styles.deleteFoodMain}>
            <section className={styles.deleteForm}>
                <form>
                    <div className={styles.formGroup}>
                        <label for="foodIdInput">Food ID:</label>
                        <input type="text" id="foodIdInput" name="foodId" required value={foodId} onChange={(e) => setFoodId(e.target.value)} />
                    </div>

                    <button type="submit" onClick={deleteFood}>Delete Food Item</button>
                </form>
            </section>
        </main>
    )
}

export default Page