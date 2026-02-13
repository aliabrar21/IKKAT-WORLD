import { Link } from 'react-router-dom'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const getAvailabilityClass = (availability) => {
    if (availability.includes('Out of Stock')) return 'out-of-stock'
    if (availability.includes('Only 1 Piece')) return 'limited'
    if (availability.includes('Made to Order')) return 'made-to-order'
    return ''
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-wrapper">
        <img 
          src={product.images[0] || '/placeholder-saree.jpg'} 
          alt={product.name}
          className="product-image"
        />
        <div className={`availability-badge ${getAvailabilityClass(product.availability)}`}>
          {product.availability}
        </div>
        <div className="product-overlay">
          <span className="view-details">View Details</span>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
      </div>
    </Link>
  )
}

export default ProductCard
