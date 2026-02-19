import React from 'react'
import Container from '../components/Container'
import ImagePlaceholder from '../components/ImagePlaceholder'
import Button from '../components/Button'
import './HeroSection.css'

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-section__background">
        <Container maxWidth="full">
          <div className="hero-section__content">
            <div className="hero-section__image-wrapper">
              <ImagePlaceholder alt="Hero image" />
            </div>
            <div className="hero-section__text">
              <h1 className="hero-section__title">
                Get Your Life Back From Gluteal Tendinopathy
              </h1>
              <p className="hero-section__subtitle">
                <span className="hero-section__highlight">Menopause</span>{' '}
                <span className="hero-section__highlight">stole your estrogen.</span>{' '}
                Now gluteal tendinopathy is{' '}
                <u>stealing your sleep, your mobility, and the life</u>{' '}
                you worked so hard to build.
              </p>
              <Button variant="primary" className="hero-section__cta">
                <strong>END YOUR HIP PAIN TODAY</strong>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default HeroSection
