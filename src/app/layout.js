import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import { CartProvider } from '@/context/CartContext'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DiamondEats',
  description: 'This is a website used to order food',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='body'>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
