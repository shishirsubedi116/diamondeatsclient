'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const router = useRouter();


  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch('https://diamondeats.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, Address: address, email, password })
      })

      const data = await response.json()
      if(data.success){
        sessionStorage.setItem('tempEmail', email)
        alert(data.message)
        router.push('/verifyotp')
      }else{
        alert(data.message)
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className={styles.signupPage}>
      <h1>Create an Account</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)}  required />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={address} onChange={(e)=>setAddress(e.target.value)}  required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  required />

        <button type="submit" onClick={handleSubmit}>Sign Up</button>
      </form>
      <div className={styles.loginSection}>
        <p>Already have an account? <Link href="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Page