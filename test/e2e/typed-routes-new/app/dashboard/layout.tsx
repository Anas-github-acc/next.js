import React from 'react'

export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <div>
      <h2>Dashboard Layout</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3>Main Content</h3>
          {children}
        </div>
        <div style={{ flex: 1 }}>
          <h3>Analytics</h3>
          {analytics}
        </div>
        <div style={{ flex: 1 }}>
          <h3>Team</h3>
          {team}
        </div>
      </div>
    </div>
  )
}
