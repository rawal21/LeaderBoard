/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import UserList from "./components/UserList"
import ClaimButton from "./components/ClaimButton"
import Leaderboard from "./components/LeaderBoard"
import PointHistory from "./components/PointHistory"
import styles from "./styles/Home.module.css"

import type { User, HistoryEntry, ClaimPointsResponse } from "./types"
import { getUsers, claimPoints, getHistory } from "./service/api"

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<string>("")

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const usersFromServer = await getUsers()
        const historyFromServer = await getHistory()

        setUsers(usersFromServer)
        setHistory(historyFromServer)
      } catch (error) {
        console.error("Error fetching initial data:", error)
      }
    }

    fetchInitialData()
  }, [])

  const handleClaimPoints = async () => {
    if (!selectedUserId) {
      setNotification("Please select a user first!")
      setTimeout(() => setNotification(""), 3000)
      return
    }

    setLoading(true)
    try {
      const result = await claimPoints(selectedUserId)

      // Update user points in state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUserId ? { ...user, totalPoints: user.totalPoints + result.pointsAwarded } : user
        )
      )

      // Fetch latest history from backend
      const updatedHistory = await getHistory()
      setHistory(updatedHistory)

      setNotification(`${result.pointsAwarded} points awarded!`)
      setTimeout(() => setNotification(""), 3000)
    } catch (error) {
      console.error(error)
      setNotification("Error claiming points. Please try again.")
      setTimeout(() => setNotification(""), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>User Points System</h1>
        <p className={styles.subtitle}>Select a user and claim points to see the leaderboard update!</p>
      </header>

      {notification && <div className={styles.notification}>{notification}</div>}

      <div className={styles.mainContent}>
        <div className={styles.leftPanel}>
          <div className={styles.claimSection}>
            <h2 className={styles.sectionTitle}>Claim Points</h2>
            <UserList users={users} selectedUserId={selectedUserId} onUserSelect={setSelectedUserId} />
            <ClaimButton onClick={handleClaimPoints} loading={loading} disabled={!selectedUserId} />
          </div>

          <PointHistory history={history} />
        </div>

        <div className={styles.rightPanel}>
          <Leaderboard users={users} />
        </div>
      </div>
    </div>
  )
}
