import React from 'react'
import './Button.css'

const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
  return (
    <a
      href="https://www.google.com"
      className={`button button--${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

export default Button
