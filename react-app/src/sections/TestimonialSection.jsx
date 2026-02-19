import React from 'react'
import Container from '../components/Container'
import ImagePlaceholder from '../components/ImagePlaceholder'
import './TestimonialSection.css'

const TestimonialSection = () => {
  return (
    <section className="testimonial-section">
      <Container maxWidth="content">
        <div className="testimonial-section__content">
          <div className="testimonial-section__card">
            <div className="testimonial-section__avatar">
              <ImagePlaceholder alt="Customer avatar" />
            </div>
            <div className="testimonial-section__quote">
              <p className="testimonial-section__text">
                "I spent $4,000 on treatments last year alone. This device cost me less than two cortisone shots, and for the first time in years, I'm sleeping on my side again. My orthopedist said I was 6 months from surgery. That was a year ago."
              </p>
            </div>
          </div>
          <div className="testimonial-section__image">
            <ImagePlaceholder alt="Testimonial image" />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default TestimonialSection
