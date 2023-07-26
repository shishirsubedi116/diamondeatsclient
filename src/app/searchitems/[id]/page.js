'use client'


import React, { useEffect, useState } from 'react'
import styles from '../page.module.css'
import FoodContainer from '@/components/foodcontainer/FoodContainer'


const Page = ({ params }) => {
    const id = params.id
    useEffect(() => {
        console.clear()
    })
    const [foods, setFoods] = useState([])
    const getData = async () => {
        try {
            const response = await fetch(`https://diamondeats.onrender.com/api/food/foodItem/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await response.json()
            if(data.success){
                setFoods(data.message)
            }
            else{
                alert(data.message)
            }

        } catch (error) {
            //(error);
        }
    }

    useEffect(()=>{
        getData()
    })

    return (
        <div className={styles.menudiv}>

        <h2>Search Items</h2>

        <div className={styles.foodList}>
            {
                foods.map((elem)=>{
                    return(
                        <FoodContainer key={elem._id} Name={elem.Name} Price={elem.Price} Availability={elem.Availability} Category={elem.Category}  Picture={elem.Picture} Unit={elem.Unit} />
                    )
                })
            }
        </div>
    </div>
    )
}

export default Page