'use client';

import Link from 'next/link'
import React, { useContext, useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';

const Page = () => {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const postData = await fetch('https://diamondeats.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await postData.json()
      if (data.success) {
        sessionStorage.setItem('token', data.message)
        router.refresh()
        if (data.isAdmin) {
          alert('Welcome Admin');
          sessionStorage.setItem('isAdmin', true);
          router.push('/admin');
        }
        else {
          alert('Logged n Successfully Now You Can Order Food')
          router.push('/menu')
        }
      } else {
        alert(data.message)
        setEmail('')
        setPassword('')
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const forgotPassword = async(e)=>{
    e.preventDefault()
    let email = prompt('Enter Your Email Address')
    try {
      const response = await fetch('https://diamondeats.onrender.com/api/auth/forgot', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email})
      })
      const data = await response.json()
      if(data.success){
        alert(data.message)
        sessionStorage.setItem('tempEmail', email)
        router.push('/forgotpassverify')
      }
      else{
        alert(data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const changePass = (e)=>{
    e.preventDefault()
    router.push('/changepassword')
  }

  return (
    <div className={styles.loginPage}>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required />

        <button type="submit" onClick={handleSubmit}>Login</button>
        <p className={styles.forgotPass}> <button onClick={forgotPassword}>Forgot Password</button></p>
        <p className={styles.forgotPass}> <button onClick={changePass}>Change Password</button></p>
        <p className={styles.noAccount}>Don't have an account? <Link href="/signup">Signup</Link></p>
      </form>
    </div>
  )
}

export default Page