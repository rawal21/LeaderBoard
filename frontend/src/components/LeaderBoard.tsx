import type { User } from "../types"
import styles from "../styles/LeaderBoard.module.css"

interface LeaderboardProps {
  users: User[]
}

export default function Leaderboard({ users }: LeaderboardProps) {
  // Sort users by total points in descending order
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return `#${rank}`
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🏆 Leaderboard</h2>
      <div className={styles.leaderboard}>
        {sortedUsers.map((user, index) => {
          const rank = index + 1
          return (
            <div key={user.id} className={`${styles.userCard} ${rank <= 3 ? styles.topThree : ""}`}>
              <div className={styles.rank}>{getRankIcon(rank)}</div>
              <div className={styles.userInfo}>
                <div className={styles.userName}>{user.name}</div>
                {/* <div className={styles.userEmail}>{user.email}</div> */}
              </div>
              <div className={styles.points}>
                <span className={styles.pointsValue}>{user.totalPoints}</span>
                <span className={styles.pointsLabel}>points</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
