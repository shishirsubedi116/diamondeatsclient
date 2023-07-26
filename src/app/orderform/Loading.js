import React from 'react'
import styles from '@/components/loading/loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loadingScreen}>
    <div className={styles.loader}></div>
  </div>
  )
}

export default Loading