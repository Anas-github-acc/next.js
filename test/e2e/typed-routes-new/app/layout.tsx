import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <h1>Root Layout</h1>
        {children}
      </body>
    </html>
  )
}
