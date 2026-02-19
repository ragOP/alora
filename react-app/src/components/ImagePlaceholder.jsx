import React from 'react'
import './ImagePlaceholder.css'

const ImagePlaceholder = ({ alt = 'Image placeholder', className = '' }) => {
  return (
    <div className={`image-placeholder ${className}`}>
      <div className="image-placeholder__content">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="#999" strokeWidth="2" fill="none"/>
          <path d="M8 12h8M12 8v8" stroke="#999" strokeWidth="2"/>
        </svg>
        <span>Image Placeholder</span>
      </div>
    </div>
  )
}

export default ImagePlaceholder
