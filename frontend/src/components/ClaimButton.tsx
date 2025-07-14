"use client"

import styles from "../styles/ClaimButton.module.css"

interface ClaimButtonProps {
  onClick: () => void
  loading: boolean
  disabled: boolean
}

export default function ClaimButton({ onClick, loading, disabled }: ClaimButtonProps) {
  return (
    <button
      className={`${styles.button} ${loading ? styles.loading : ""} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <span className={styles.spinner}></span>
          Claiming...
        </>
      ) : (
        "Claim Points"
      )}
    </button>
  )
}
