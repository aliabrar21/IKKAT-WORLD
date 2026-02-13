import { useState, useEffect } from 'react'
import Button from '../components/Button'
import './CustomOrder.css'

const CustomOrder = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    sareeType: '',
    colorPreference: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const message = `Custom Order Request:
Name: ${formData.name}
Phone: ${formData.phone}
Saree Type: ${formData.sareeType}
Color Preference: ${formData.colorPreference}
Message: ${formData.message}

Delivery: 30 Days`

    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank')
    
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({
        name: '',
        phone: '',
        sareeType: '',
        colorPreference: '',
        message: ''
      })
    }, 1000)
  }

  return (
    <div className="custom-order-page">
      <div className="custom-order-hero">
        <div className="container">
          <h1 className="page-title">Custom Order</h1>
          <p className="page-subtitle">Create Your Unique Piece</p>
        </div>
      </div>

      <section className="custom-order-section section">
        <div className="container">
          <div className="custom-order-content">
            <div className="order-info">
              <h2 className="section-title">Want a Custom Color or Design?</h2>
              <p className="info-description">
                We understand that every saree tells a story, and sometimes you want to create your own. 
                Our custom order service allows you to work directly with our master weavers to bring your vision to life.
              </p>
              <div className="info-features">
                <div className="info-feature">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Choose your preferred colors and patterns</span>
                </div>
                <div className="info-feature">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Work directly with master weavers</span>
                </div>
                <div className="info-feature">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Delivery in 30 days</span>
                </div>
                <div className="info-feature">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>100% authentic handloom</span>
                </div>
              </div>
              <div className="delivery-info">
                <h3>Delivery Information</h3>
                <p>Custom orders typically take 30 days from order confirmation. We'll keep you updated throughout the process and share progress photos of your piece being woven.</p>
              </div>
            </div>

            <div className="order-form-container">
              <form className="custom-order-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sareeType">Saree Type *</label>
                  <select
                    id="sareeType"
                    name="sareeType"
                    value={formData.sareeType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Silk Ikat">Silk Ikat</option>
                    <option value="Cotton Ikat">Cotton Ikat</option>
                    <option value="Dupatta">Dupatta</option>
                    <option value="Lehenga">Lehenga</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="colorPreference">Color Preference *</label>
                  <input
                    type="text"
                    id="colorPreference"
                    name="colorPreference"
                    value={formData.colorPreference}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Maroon and Gold, Cream and Beige"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Additional Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Any specific design preferences, occasions, or special requirements..."
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Custom Order Request'}
                </Button>

                <p className="form-note">
                  * After submitting, you'll be redirected to WhatsApp to confirm your order details with our team.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CustomOrder
