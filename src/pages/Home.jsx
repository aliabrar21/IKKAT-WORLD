import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import productsData from '../data/products.json'
import './Home.css'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919876543210?text=Hello! I am interested in your Pochampally Ikat collection.', '_blank')
  }

  const featuredProducts = productsData.slice(0, 6)

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="container">
            <h1 className="hero-title">Authentic Pochampally Ikkat</h1>
            <p className="hero-subtitle">Direct From Weavers</p>
            <p className="hero-description">
              Preserving the timeless art of handloom weaving. Each piece is a masterpiece of tradition and craftsmanship.
            </p>
            <div className="hero-buttons">
              <Link to="/collection">
                <Button variant="primary">View Collection</Button>
              </Link>
              <Button variant="secondary" onClick={handleWhatsAppClick}>
                Enquire Now
              </Button>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* About Brand Section */}
      <section className="about-brand section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">Our Heritage</h2>
              <p className="about-description">
                Preserving the timeless art of Pochampally Ikat weaving. Each saree is handcrafted with precision and tradition, 
                carrying forward centuries of heritage in every thread.
              </p>
              <p className='about-description'>
                Every piece we create reflects the dedication of skilled artisans who have inherited this craft through generations. From the intricate tying and dyeing of yarns to the final weaving on traditional looms, every stage is carried out with care, patience, and uncompromising attention to detail.
              </p>
              <p className="about-description">
                Since 1995, we have been working directly with master weavers, ensuring authenticity and supporting the artisan community 
                that keeps this beautiful craft alive.
              </p>
              <div className="heritage-badge">
                <span className="badge-year">Est. 1995</span>
                <span className="badge-text">Three Decades of Excellence</span>
              </div>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <img src="/images/IKKAT1.png" alt="Heritage" className="heritage-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="featured-collection section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Collection</h2>
            <p className="section-subtitle">Handpicked pieces from our exclusive collection</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="view-all-link">
            <Link to="/collection">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">What makes our Ikat special</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Direct from Weavers</h3>
              <p>We work directly with master weavers, ensuring fair trade and authentic craftsmanship.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Pure Handloom</h3>
              <p>Every piece is handwoven on traditional looms, preserving the authentic Ikat technique.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <h3>Custom Orders Available</h3>
              <p>Want a specific color or design? We offer custom orders with 30-day delivery.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3>PAN India Shipping</h3>
              <p>We deliver our handcrafted pieces across India with secure packaging.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="whatsapp-cta section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <h2 className="cta-title">Looking for something special?</h2>
            <p className="cta-description">Chat with us directly to discuss custom orders, availability, or any questions about our collection.</p>
            <Button variant="primary" onClick={handleWhatsAppClick} className="cta-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat With Us to Order
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
