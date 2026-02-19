import React from 'react'
import HeroSection from './sections/HeroSection'
import ProblemSection from './sections/ProblemSection'
import SolutionSection from './sections/SolutionSection'
import TestimonialSection from './sections/TestimonialSection'
import CtaSection from './sections/CtaSection'
import './styles/App.css'

function App() {
  return (
    <main className="app">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <TestimonialSection />
      <CtaSection />
    </main>
  )
}

export default App
