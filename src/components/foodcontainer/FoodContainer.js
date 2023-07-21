import React from 'react'
import styles from './foodcontainer.module.css'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


const FoodContainer = ({ Name, Price, Availability, Category, Picture, Unit, id }) => {
    const router = useRouter()
    const src = `https://diamondeats.onrender.com/public/images/${Picture}`;
    return (
        <div className={styles.foodItem}>
            {/* <Image src={source} width={400} height={300} alt="Food" /> */}
            <Image loader={() => src} alt=' Food Image' src={src} width={500} height={500}/>
            <h3>{Name}</h3>
            <p>Category: {Category}</p>
            <p>Price: Rs {Price} per {Unit}</p>
            <p>Availbility: {Availability== 'true'?<>Available</>:<>Not Available</>}</p>
            <button className={styles.addtocart} onClick={() => router.push(`/viewfood/${id}`)}>View Food</button>
        </div>
    )
}

export default FoodContainer