"use client"

import type { User } from "../types"
import styles from "../styles/UserList.module.css"

interface UserListProps {
  users: User[]
  selectedUserId: string
  onUserSelect: (userId: string) => void
}

export default function UserList({ users, selectedUserId, onUserSelect }: UserListProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="user-select">
        Select User:
      </label>
      <select
        id="user-select"
        className={styles.select}
        value={selectedUserId}
        onChange={(e) => onUserSelect(e.target.value)}
      >
        <option value="">Choose a user...</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.totalPoints} points)
          </option>
        ))}
      </select>
    </div>
  )
}
