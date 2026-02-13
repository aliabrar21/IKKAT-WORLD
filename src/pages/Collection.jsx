import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import productsData from '../data/products.json'
import './Collection.css'

const Collection = () => {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [filteredProducts, setFilteredProducts] = useState(productsData)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (selectedFilter === 'All') {
      setFilteredProducts(productsData)
    } else {
      setFilteredProducts(productsData.filter(product => product.category === selectedFilter))
    }
  }, [selectedFilter])

  const categories = ['All', 'Silk Ikkat', 'Cotton Ikkat', 'Dupattas', 'Lehengas']

  return (
    <div className="collection-page">
      <div className="collection-hero">
        <div className="container">
          <h1 className="page-title">Our Collection</h1>
          <p className="page-subtitle">Discover our handcrafted Pochampally Ikat pieces</p>
        </div>
      </div>

      <section className="collection-section section">
        <div className="container">
          <div className="filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedFilter === category ? 'active' : ''}`}
                onClick={() => setSelectedFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredProducts.length > 0 ? (
            <>
              <div className="collection-info">
                <p className="results-count">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  {selectedFilter !== 'All' && ` in ${selectedFilter}`}
                </p>
              </div>
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="no-products">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              <h3>No products found</h3>
              <p>Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Collection
