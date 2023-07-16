'use client'


import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';

const Page = () => {

    const [otp, setOtp] = useState(0)
    const router = useRouter();

    useEffect(() => {
        if (!sessionStorage.getItem('tempEmail')) {
            router.push('/login')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (sessionStorage.getItem('ForgotPass') == true) {
            try {
                const postData = await fetch('https://diamondeats.onrender.com/api/auth/verify', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: sessionStorage.getItem('tempEmail'), otp: toString(otp) })
                })
                const data = await postData.json()
                if (data.success) {
                    alert(data.message)
                    router.push('/login')
                } else {
                    alert(data.message)
                    router.push('/signup')
                }
            } catch (error) {

            }
        }
        else {

            try {
                const postData = await fetch('https://diamondeats.onrender.com/api/auth/verifyotp', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: sessionStorage.getItem('tempEmail'), otp })
                })
                const data = await postData.json()
                if (data.success) {
                    alert(data.message)
                    router.push('/login')
                } else {
                    alert(data.message)
                    router.push('/signup')
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <main className={styles.verifyOtp}>
            <form className={styles.otpForm}>
                <label htmlFor="otp-input">Enter the OTP sent to your email:</label>
                <input type="Number" value={otp} onChange={(e) => setOtp(e.target.value)} id="otp-input" name="otp" maxlength="6" required />
                <button type="submit" onClick={handleSubmit}>Verify</button>
            </form>
        </main>
    )
}

export default Page