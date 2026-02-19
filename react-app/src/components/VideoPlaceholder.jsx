import React from 'react'
import './VideoPlaceholder.css'

const VideoPlaceholder = ({ className = '' }) => {
  return (
    <div className={`video-placeholder ${className}`}>
      <div className="video-placeholder__content">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
          <path d="M8 5v14l11-7z" fill="#999"/>
        </svg>
        <span>Video Placeholder</span>
      </div>
    </div>
  )
}

export default VideoPlaceholder
