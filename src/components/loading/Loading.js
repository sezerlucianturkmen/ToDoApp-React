import React from 'react'

export default function Loading() {
  return (
    <div className="spinner-overlay d-flex justify-content-center align-items-center">
      <div className="spinner-border spinner-self" color="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
