'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

const page = () => {
    const [updatedData, setUpdatedData] = useState('Name')
    const [value, setValue] = useState('')
    const [foodId, setFoodId] = useState(0)
    const router = useRouter()

    useEffect(()=>{
        if(!sessionStorage.getItem('isAdmin')){
            router.push('/')
        }
    })
    
    const handleUpdate = async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch(`https://diamondeats.onrender.com/api/admin/food/update/${foodId}`,{
                method:'PATCH',
                headers:{
                    "Content-Type": "application/json",
                    "token" : sessionStorage.getItem('token')
                },
                body: JSON.stringify({[updatedData]:value})
            })
            const data = await response.json()
            if(data.success){
                alert(data.message)
                router.push('/admin')
            }
            else{
                alert(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className={styles.updateFoodAdmin}>
            <section className={styles.adminForm}>
                <h2>Update Food Item</h2>
                <form>
                    <p>FoodId: <input type="text" name="" id="" value={foodId} onChange={(e)=>setFoodId(e.target.value)} /></p>
                    <label htmlFor="availability">Key:</label>
                    <select id="availability" name="availability" required value={updatedData} onChange={(e) => setUpdatedData(e.target.value)}>
                        <option value="Name">Name</option>
                        <option value="foodId">Food Id</option>
                        <option value="Category">Category</option>
                        <option value="Price">Price</option>
                        <option value="Unit">Unit</option>
                        <option value="Availability">Availability</option>
                        <option value="Specials">Specials</option>
                    </select>

                    <label htmlFor="unit">Value:</label>
                    <input type="text" id="unit" name="unit" required value={value} onChange={(e)=>setValue(e.target.value)} />


                    <button type="submit" onClick={handleUpdate}>Update Item</button>
                </form>
            </section>
        </main>
    )
}

export default page