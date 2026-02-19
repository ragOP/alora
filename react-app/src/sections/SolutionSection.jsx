import React from 'react'
import Container from '../components/Container'
import './SolutionSection.css'

const SolutionSection = () => {
  return (
    <section className="solution-section">
      <Container maxWidth="content">
        <h2 className="solution-section__title">
          Here's how each wavelength brings the factory back online:
        </h2>
        <div className="solution-section__grid">
          <div className="solution-section__item">
            <div className="solution-section__badge">660nm</div>
            <div className="solution-section__content">
              <h3 className="solution-section__item-title">The Primer</h3>
              <p className="solution-section__item-text">
                Increases oxygen-rich circulation in the skin and superficial fascia, opening a biological pathway for the deeper wavelengths to travel through.
              </p>
            </div>
          </div>
          <div className="solution-section__item">
            <div className="solution-section__badge">830nm</div>
            <div className="solution-section__content">
              <h3 className="solution-section__item-title">The Activator</h3>
              <p className="solution-section__item-text">
                Directly stimulates mitochondrial ATP production in tendon cells — restoring the cellular energy that estrogen once provided and triggering renewed collagen synthesis.
              </p>
            </div>
          </div>
          <div className="solution-section__item">
            <div className="solution-section__badge">940nm</div>
            <div className="solution-section__content">
              <h3 className="solution-section__item-title">The Healer</h3>
              <p className="solution-section__item-text">
                Reaches the deepest tissue layers, calming the inflammatory response while guiding newly produced collagen into organised, structurally sound tendon fibre.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SolutionSection
