import type { HistoryEntry } from "../types"
import styles from "../styles/PointHistory.module.css"

interface PointHistoryProps {
  history: HistoryEntry[]
}

export default function PointHistory({ history }: PointHistoryProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📊 Point History</h2>
      {history.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No points claimed yet!</p>
          <p>Select a user and claim points to see history.</p>
        </div>
      ) : (
        <div className={styles.historyList}>
          {history.map((entry) => (
            <div key={entry.id} className={styles.historyItem}>
              <div className={styles.historyHeader}>
                <span className={styles.userName}>{entry.userName}</span>
                <span className={styles.points}>+{entry.pointsAwarded}</span>
              </div>
              <div className={styles.timestamp}>{formatTime(entry.timestamp)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
