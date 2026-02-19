import React from 'react'
import Container from '../components/Container'
import VideoPlaceholder from '../components/VideoPlaceholder'
import './ProblemSection.css'

const ProblemSection = () => {
  return (
    <section className="problem-section">
      <Container maxWidth="content">
        <div className="problem-section__content">
          <h2 className="problem-section__title">
            The Real Problem Isn't Your Age. It's The Missing Building Blocks.
          </h2>
          <div className="problem-section__text">
            <p className="problem-section__intro">
              <strong>Here's what researchers discovered that changes everything:</strong>
            </p>
            <p>
              Estrogen doesn't just affect hot flashes and mood.
            </p>
            <p className="problem-section__highlight">
              <strong>Estrogen triggers collagen production</strong> – the actual building blocks your tendons need to repair.
            </p>
            <div className="problem-section__callout">
              <p>
                *<strong>Without estrogen, your body stops making the collagen</strong> that tendons require to rebuild and stay strong.
              </p>
              <p>
                When estrogen drops during menopause, your tendons literally can't get the materials they need to fix themselves.
              </p>
            </div>
            <p className="problem-section__conclusion">
              That's why:
            </p>
            <ul className="problem-section__list">
              <li>
                <strong>Rest doesn't work</strong> (your tendons are like a construction crew without materials – they can't rebuild without collagen)
              </li>
              <li>
                <strong>Physical therapy often backfires</strong> (you're forcing damaged tendons to work harder without repair capacity)
              </li>
            </ul>
            <p className="problem-section__final">
              Your hip isn't giving up on you. It's waiting for <strong>building materials</strong> that never arrive anymore.
            </p>
          </div>
          <div className="problem-section__media">
            <VideoPlaceholder />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ProblemSection
