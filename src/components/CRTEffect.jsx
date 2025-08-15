import React from 'react'

export default function CRTEffect({ enabled = true, children }) {
  return (
    <div className={enabled ? 'crt' : ''}>
      {children}
    </div>
  )
}