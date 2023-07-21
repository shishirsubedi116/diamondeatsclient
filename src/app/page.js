// import Link from 'next/link'
'use client'
import Image from 'next/image'
import styles from './page.module.css'
import vegburger from '../../public/vegburger.jpg'
import {  useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  
  useEffect(()=>{
    router.refresh()
  },[router])


  return (
    <main className={styles.homeContainer}>
      <div className={styles.content}>
        <h1>Welcome to DiamondEats</h1>
        <p>Enjoy our delicious fast food made with love.</p>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search any food item..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <button className={styles.searchButton} onClick={() => router.push(`/searchitems/${searchValue}`)}>Search</button>
        </div>
      </div>
      <div className={styles.foodImage}>
        <Image src={vegburger} alt="" title="" width="100%" height="100%" />
      </div>
    </main>
  )
}

