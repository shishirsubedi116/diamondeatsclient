'use client'

import React, { useContext, useEffect, useState } from 'react'
import styles from "./navbar.module.css"
import Link from 'next/link'
import logo from '../../../public/logo.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { CartContext } from '@/context/CartContext'


const Navbar = () => {
  const router = useRouter();
  const { cartData } = useContext(CartContext)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const logOut = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('isAdmin')
    router.push('/login')
    router.refresh()
  }

  return (
    <>
      {
        isClient ? <header className={styles.header}>
          <nav>
            <div className={styles.logo}>
              <Link href="/"><Image src={logo} alt="" title="" width="100%" height={40} /></Link>
            </div>
            <ul className={styles.navLinks}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/menu">Menu</Link></li>
              <li><Link href="/">Specials</Link></li>
              <li><Link href="/">Contact</Link></li>
              {
                sessionStorage.getItem('isAdmin') ? <li><Link href="/admin">admin</Link></li> : <></>
              }
            </ul>
            <div className={styles.authButtons}>
              {
               sessionStorage.getItem('token') ? <><Link onClick={logOut} href={'/login'}><button className={styles.loginButton}>Log Out</button></Link><button className={styles.loginButton} onClick={() => router.push('/yourcart')}>Your Cart ({cartData.length})</button></> : <><Link href={'/login'}> <button className={styles.loginButton}>Login</button></Link><Link href={'/signup'}><button className={styles.loginButton}>Sign Up</button></Link></> 
              }

            </div>
          </nav>
        </header> : <></>
      }

    </>
  )
}

export default Navbar

