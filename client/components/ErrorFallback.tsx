import React from "react"

export  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div role="alert">
        <h3>Something went wrong...</h3>
        <p>{error.message}</p>
        <button onClick={resetErrorBoundary}>
          Try again
        </button>
      </div>
    )
  }