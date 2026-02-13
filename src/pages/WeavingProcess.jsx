import { useEffect } from 'react'
import './WeavingProcess.css'

const WeavingProcess = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const steps = [
    {
      title: 'Design & Planning',
      description: 'The journey begins with conceptualizing the design. Our master weavers sketch traditional Ikat patterns, ensuring each motif carries forward centuries of heritage.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      )
    },
    {
      title: 'Yarn Preparation',
      description: 'High-quality silk or cotton yarns are carefully selected and prepared. The yarns are then wound onto bobbins, ready for the intricate dyeing process.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      )
    },
    {
      title: 'Resist Dyeing (Ikat Technique)',
      description: 'This is the heart of Ikat weaving. Sections of yarn are tightly bound with threads before dyeing, creating resist patterns. The process is repeated multiple times with different colors to achieve the desired design.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        </svg>
      )
    },
    {
      title: 'Warping & Setting Up the Loom',
      description: 'The dyed yarns are carefully arranged on the loom as warp threads. This requires immense skill and precision, as the alignment determines the final pattern quality.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="3" y1="3" x2="21" y2="3"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="21" x2="21" y2="21"/>
        </svg>
      )
    },
    {
      title: 'Hand Weaving',
      description: 'The actual weaving begins. Our skilled artisans work on traditional handlooms, carefully interlacing the weft threads with the warp. Each pass of the shuttle is deliberate and precise.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        </svg>
      )
    },
    {
      title: 'Finishing & Quality Check',
      description: 'Once weaving is complete, the fabric undergoes careful finishing. Edges are hemmed, and each piece is thoroughly inspected to ensure it meets our exacting standards of quality and authenticity.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      )
    }
  ]

  return (
    <div className="weaving-process-page">
      <div className="process-hero">
        <div className="container">
          <h1 className="page-title">Our Weaving Process</h1>
          <p className="page-subtitle">The Art of Pochampally Ikat</p>
        </div>
      </div>

      <section className="introduction section">
        <div className="container">
          <div className="intro-content">
            <h2 className="section-title">A Timeless Tradition</h2>
            <div className="intro-text">
              <p>
                Pochampally Ikat is more than just a fabric—it's a living art form that has been passed down through generations. 
                The name "Ikat" comes from the Malay-Indonesian word "mengikat," meaning "to tie" or "to bind," referring to the 
                resist-dyeing technique that creates these distinctive patterns.
              </p>
              <p>
                Each piece takes weeks, sometimes months, to complete. From the initial design to the final thread, every step 
                is performed by hand with meticulous attention to detail. Our weavers are not just craftspeople—they are artists 
                preserving a heritage that dates back centuries.
              </p>
              <p>
                What makes Pochampally Ikat unique is the precision required in aligning the dyed yarns during weaving. When done 
                correctly, the patterns emerge with perfect clarity, creating geometric and floral motifs that are instantly recognizable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="process-steps section">
        <div className="container">
          <h2 className="section-title centered">The Journey of Each Thread</h2>
          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className="process-step" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <div className="step-icon">{step.icon}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="artisan-story section">
        <div className="container">
          <div className="story-content">
            <div className="story-image">
              <div className="image-placeholder">
                <img src="/public/images/IKKAT.png" alt="" srcset="" />
              </div>
            </div>
            <div className="story-text">
              <h2 className="section-title">Meet Our Artisans</h2>
              <p>
                Behind every saree is a master weaver who has dedicated their life to perfecting this craft. Many of our artisans 
                come from families that have been weaving Ikat for generations, with skills passed down from parent to child.
              </p>
              <p>
                We work directly with these talented craftspeople, ensuring fair compensation and supporting the continuation of 
                this beautiful tradition. When you purchase a Pochampally Ikat piece from us, you're not just buying a saree—you're 
                supporting an entire community of artisans and helping preserve a cultural heritage.
              </p>
              <p className="quote">
                "Every thread tells a story. Every pattern carries a memory. This is not just weaving—it's keeping our heritage alive."
                <span className="quote-author">— Master Weaver, Pochampally</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="heritage-timeline section">
        <div className="container">
          <h2 className="section-title centered">Our Heritage</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">1995</div>
              <div className="timeline-content">
                <h3>Foundation</h3>
                <p>Started working directly with master weavers in Pochampally</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2005</div>
              <div className="timeline-content">
                <h3>Recognition</h3>
                <p>Received recognition for preserving traditional Ikat techniques</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2015</div>
              <div className="timeline-content">
                <h3>Expansion</h3>
                <p>Expanded to serve customers across India</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2025</div>
              <div className="timeline-content">
                <h3>Today</h3>
                <p>Continuing to preserve and promote authentic Pochampally Ikat</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WeavingProcess
