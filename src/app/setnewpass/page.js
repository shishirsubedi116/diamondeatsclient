'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

const Page = () => {
  
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(password!==cpassword){
      alert("passwords do not match")
      return
    }
    try {
        const fetchData = await fetch('https://diamondeats.onrender.com/api/auth/newpass', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('tempToken')
            },
            body: JSON.stringify({ password })
        })
        const data = await fetchData.json()
        if(data.success){
            alert(data.message)
            router.push('/login')
        }
        else{
            alert(data.message)
            router.refresh()
        }

    } catch (error) {
        console.log(error);
    }
}

  return (
    <main className={styles.setnewpass}>
    <section className={styles.newPassword}>
        <h2>Set New Password</h2>
      <form>
        <div className={styles.formGroup}>
          <label for="newPasswordInput">New Password:</label>
          <input type="password" id="newPasswordInput" name="newPassword" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        </div>

        <div className={styles.formGroup}>
          <label for="confirmPasswordInput">Confirm Password:</label>
          <input type="password" id="confirmPasswordInput" name="confirmPassword" value={cpassword} onChange={(e)=>setCpassword(e.target.value)}  required/>
        </div>

        <button type="submit" onClick={handleSubmit}>Set Password</button>
      </form>
    </section>
  </main>

  )
}

export default Page