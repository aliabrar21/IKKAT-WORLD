import { useEffect } from 'react'
import Button from '../components/Button'
import './Contact.css'

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleWhatsAppClick = () => {
    window.open(
      'https://wa.me/919346591460?text=Hello! I would like to get in touch.',
      '_blank'
    )
  }

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">We'd love to hear from you</p>
        </div>
      </div>

      <section className="contact-section section">
        <div className="container">
          <div className="contact-content">

            {/* LEFT SIDE CONTACT INFO */}
            <div className="contact-info">
              <h2 className="section-title">Get in Touch</h2>
              <p className="contact-description">
                Have questions about our collection? Want to discuss a custom order?
                Or simply want to learn more about Pochampally Ikat? We're here to help.
              </p>

              <div className="contact-details">

                {/* Phone */}
                <div className="contact-item">
                  <div className="contact-text">
                    <h3>Phone</h3>
                    <a href="tel:+919346591460">+91 93465 91460</a>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-item">
                  <div className="contact-text">
                    <h3>Email</h3>
                    <a href="mailto:info@pochampallyikat.com">
                      info@pochampallyikat.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="contact-item">
                  <div className="contact-text">
                    <h3>WhatsApp</h3>
                    <button
                      onClick={handleWhatsAppClick}
                      className="whatsapp-link-btn"
                    >
                      Chat with us on WhatsApp
                    </button>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="contact-item">
                  <div className="contact-text">
                    <h3>Business Hours</h3>
                    <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="whatsapp-cta-box">
                <h3>Quick Enquiry?</h3>
                <p>Chat with us directly on WhatsApp for instant responses</p>
                <Button variant="primary" onClick={handleWhatsAppClick}>
                  Start WhatsApp Chat
                </Button>
              </div>
            </div>

            {/* RIGHT SIDE MAP */}
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30297.81450398354!2d78.78370239627698!3d17.345354301225233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb7bb75d44abd5%3A0x93540f0dfc1eaceb!2sIKAT%20WORLD%2C%20Handloom%20Market%2C%20Pochampally!5e0!3m2!1sen!2sin!4v1707924512345"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="IKAT WORLD Location"
              ></iframe>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
