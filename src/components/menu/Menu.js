'use client'

import React, { useEffect, useState } from 'react'
import styles from './menu.module.css'
import FoodContainer from '../foodcontainer/FoodContainer'
import Link from 'next/link'

const Menu = () => {

    const [foods, setFoods] = useState([])
    const [searchValue, setSearchValue] = useState('')
    // const [page, setPage] = useState(1)
    const getData = async () => {
        try {
            const response = await fetch(`https://diamondeats.onrender.com/api/food/getallfoods`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await response.json()
            if (data.success) {
                setFoods(data.message)
            }
            else {
                alert(data.message)
            }

        } catch (error) {
            //(error);
        }
    }

    // const handleInfiniteScroll = async () => {

    //     try {
    //         if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
    //             setPage((prev) => prev + 1)
    //         }

    //     } catch (error) {
    //         //(error);
    //     }

    // }

    useEffect(() => {
        getData()
    }, [])

    // useEffect(() => {
    //     window.addEventListener("scroll", handleInfiniteScroll)
    //     return ()=> window.removeEventListener('scroll', handleInfiniteScroll)
    // }, [])

    return (
        <div className={styles.menudiv}>

            <h2>Our Menu</h2>
            <div className={styles.searchSection}>
                <input type="text" id="search" name="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search..." />
                <button type="button"><Link href={`/searchitems/${searchValue}`}>Search</Link></button>
            </div>

            <div className={styles.foodList}>
                {
                    foods.map((elem) => {
                        return (
                            <FoodContainer key={elem._id} Name={elem.Name} Price={elem.Price} Availability={elem.Availability} Category={elem.Category} Picture={elem.Picture} Unit={elem.Unit} id={elem._id} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Menu


{/* <div className={styles.foodItem}>
                    <img src="./vegburger.jpg" alt="Food 1" />
                    <h3>Food Item 1</h3>
                    <p>Category: Category 1</p>
                    <p>Price: $10.99</p>
                    <p>Availbility: Availble</p>
                    <p>Availbility: Availble</p>
                    <button className={styles.addtocart}>View Food</button>
                </div> */}