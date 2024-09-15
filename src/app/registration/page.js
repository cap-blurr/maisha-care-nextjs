'use client'

import { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'
import styles from './Registration.module.css'

export default function Registration() {
  const router = useRouter()
  const { isAuthenticated, isRegistered, isLoading, userRole, setRole } = useAuth()
  const [selectedRole, setSelectedRole] = useState(null)

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/')
      } else if (isRegistered && userRole) {
        router.push(`/dashboard/${userRole}`)
      }
    }
  }, [isAuthenticated, isRegistered, isLoading, userRole, router])

  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated || isRegistered) return null

  const handleRoleSelection = (role) => {
    setSelectedRole(role)
    router.push(`/form/${role}`)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Choose Your Role</h1>
      <div className={styles.cardContainer}>
        <div className={styles.card} onClick={() => handleRoleSelection('patient')}>
          <h2 className={styles.cardTitle}>Patient</h2>
          <p className={styles.cardDescription}>Register as a patient to manage your health records</p>
        </div>
        <div className={styles.card} onClick={() => handleRoleSelection('doctor')}>
          <h2 className={styles.cardTitle}>Doctor</h2>
          <p className={styles.cardDescription}>Register as a doctor to access and update patient records</p>
        </div>
      </div>
    </div>
  )
}