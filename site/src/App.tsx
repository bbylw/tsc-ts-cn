import { useEffect } from 'react'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import Features from './components/Features.tsx'
import Stages from './components/Stages.tsx'
import Proof from './components/Proof.tsx'
import Stats from './components/Stats.tsx'
import Cta from './components/Cta.tsx'
import Footer from './components/Footer.tsx'

export default function App() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Stages />
        <Proof />
        <Stats />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
