import React from 'react'
import './Container.css'

const Container = ({ children, maxWidth = 'content', className = '' }) => {
  const containerClass = `container container--${maxWidth} ${className}`
  return <div className={containerClass}>{children}</div>
}

export default Container
