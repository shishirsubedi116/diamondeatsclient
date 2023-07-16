'use client'
import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import CartContext from '@/context/CartContext'
import { useState } from 'react'
// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'DiamondEats',
//   description: 'This is a website used to order food',
// }

export default function RootLayout({ children }) {
  const [cartData, setCartData] = useState([])
  return (
    <html lang="en">
      <body className='body'>
        <CartContext.Provider value={{ cartData, setCartData }}>
            <Navbar />
            {children}
            <Footer />
        </CartContext.Provider>
      </body>
    </html>
  )
}
