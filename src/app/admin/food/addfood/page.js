'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Page = () => {

    const router = useRouter()

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [foodId, setFoodId] = useState(1)
    const [unit, setUnit] = useState('')
    const [image, setImage] = useState('')

    useEffect(() => {
        if (!sessionStorage.getItem('token') || !sessionStorage.getItem('isAdmin')) {
            router.push('/');
        };
    })
    useEffect(() => {
        console.clear()
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!sessionStorage.getItem('token') || !sessionStorage.getItem('isAdmin')) {
            router.push('/')
        }

        const formdata = new FormData();

        formdata.append('Name', name);
        formdata.append('foodId', foodId);
        formdata.append('Category', category);
        formdata.append('Price', price);
        formdata.append('Unit', unit);
        formdata.append('Picture', image, image.name);


        try {
            let url = 'https://diamondeats.onrender.com/api/admin/food/addfood'
            let response = await axios.post(url, formdata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token': sessionStorage.getItem('token')
                }
            })
            console.log(response);
            if (response.data.success) {
                router.push('/admin')
                alert(response.data.message)
            }
            else {
                alert(response.data.message)
            }
        } catch (err) {
            console.clear()
        }
    }


    return (
        <main className={styles.addfood}>
            <section className={styles.adminForm}>
                <h2>Add New Food Item</h2>
                <form>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} required />

                    <label htmlFor="price">Price:</label>
                    <input type="Number" id="price" name="price" required value={price} onChange={(e) => setPrice(e.target.value)} />

                    <label htmlFor="foodId">Food Id:</label>
                    <input type="Number" id="foodId" name="foodId" value={foodId} onChange={(e) => setFoodId(e.target.value)} required />

                    <label htmlFor="unit">Unit:</label>
                    <input type="text" id="unit" name="unit" value={unit} onChange={(e) => setUnit(e.target.value)} required />

                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />

                    <button type="submit" onClick={handleSubmit}>Add Item</button>
                </form>
            </section>
        </main>
    )
}

export default Page