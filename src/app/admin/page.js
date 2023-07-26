'use client'

import React, { useEffect } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem('isAdmin') || !sessionStorage.getItem('token')) {
      router.push('/')
      alert('Some error occured')
    }
  })
  useEffect(() => {
    console.clear()
})
  return (
    <main className={styles.mainAdminPage}>
      <section className={styles.adminLinks}>
        <h2>Admin Dashboard</h2>
        <ul>
          <li><Link href="/admin/order/todayorders">Today&apos; s Orders</Link></li>
          <li><Link href="/admin/food/addfood">Add Food Item</Link></li>
          <li><Link href="/admin/food/deletefood">Delete Food</Link></li>
          <li><Link href="/admin/food/updatefood">Update Food Item</Link></li>
          <li><Link href="/admin/order/getallorders">All Orders</Link></li>
          <li><Link href="/admin/order/shippedorders">Shipped Orders</Link></li>
          <li><Link href="/admin/order/cancelledorders">Cancelled Orders</Link></li>
          <li><Link href="/admin/order/discardedorders">Discarded Orders</Link></li>
          <li><Link href="/admin/order/allincompleteorders">Incomplete Orders</Link></li>
        </ul>
      </section>
    </main>
  )
}

export default Page