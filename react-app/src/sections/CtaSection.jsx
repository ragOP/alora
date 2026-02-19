import React from 'react'
import Container from '../components/Container'
import Button from '../components/Button'
import './CtaSection.css'

const CtaSection = () => {
  return (
    <section className="cta-section">
      <Container maxWidth="content">
        <div className="cta-section__content">
          <div className="cta-section__price">
            <span className="cta-section__price-amount">$180</span>
          </div>
          <Button variant="primary" className="cta-section__button">
            <strong>GET YOURS 50% OFF</strong>
          </Button>
          <p className="cta-section__disclaimer">
            NOT AVAILABLE ON AMAZON OR<br />
            <u>EBAY</u>
          </p>
          <ul className="cta-section__features">
            <li>Halsten Stride Therapeutic Device</li>
            <li>Premium Carrying Case</li>
            <li>2 FREE Support Guides ($114 Value)</li>
            <li>FREE Priority Shipping</li>
            <li>90-Day "Works or It's Free"</li>
          </ul>
          <Button variant="primary" className="cta-section__button">
            <strong>CLAIM YOUR 50% OFF</strong>
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default CtaSection
