import React from 'react'
import styles from './foodcontainer.module.css'
import { useRouter } from 'next/navigation'

const FoodContainer = ({ Name, Price, Availability, Category, Picture, Unit, id }) => {
    const router = useRouter()
    return (
        <div className={styles.foodItem}>
            <img src={`https://diamondeats.onrender.com/public/images/${Picture}`} alt="Food" />
            <h3>{Name}</h3>
            <p>Category: {Category}</p>
            <p>Price: Rs {Price} per {Unit}</p>
            <p>Availbility: {Availability== 'true'?<>Available</>:<>Not Available</>}</p>
            <button className={styles.addtocart} onClick={() => router.push(`/viewfood/${id}`)}>View Food</button>
        </div>
    )
}

export default FoodContainer