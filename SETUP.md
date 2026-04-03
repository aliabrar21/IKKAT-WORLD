# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Image Setup

The project expects product images in the following structure:

```
public/
└── images/
    ├── saree1-1.jpg
    ├── saree1-2.jpg
    ├── saree1-3.jpg
    ├── saree1-4.jpg
    ├── saree2-1.jpg
    └── ... (other product images)
```

**Note**: Currently, the product data references placeholder image paths. You'll need to:
1. Add your actual product images to `public/images/`
2. Update image paths in `src/data/products.json` to match your image filenames
3. Or use a placeholder service like `https://via.placeholder.com/600x800` for testing

## Configuration

### Update Contact Information

1. **WhatsApp Number**: Update in:
   - `src/components/Header.jsx` (line 6)
   - `src/components/Footer.jsx` (line 6)
   - `src/pages/Home.jsx` (line 11)
   - `src/pages/Contact.jsx` (line 7)
   - All other pages with WhatsApp links

2. **Email**: Update in:
   - `src/components/Footer.jsx` (line 43)
   - `src/pages/Contact.jsx` (line 50)

3. **Phone**: Update in:
   - `src/components/Footer.jsx` (line 37)
   - `src/pages/Contact.jsx` (line 40)

### Update Google Maps

Update the Google Maps embed URL in `src/pages/Contact.jsx` (around line 120) with your actual business location coordinates.

## Customization

### Colors

Main colors are defined in `src/styles/index.css`:
- `--color-beige`: #F5F1E8
- `--color-cream`: #FAF8F3
- `--color-maroon`: #8B2635
- `--color-dark-maroon`: #6B1D2A
- `--color-gold`: #D4AF37

### Fonts

- Headings: Playfair Display (serif)
- Body: Lato (sans-serif)

Fonts are loaded from Google Fonts in `index.html`.

## Product Data

Edit `src/data/products.json` to add/update products. Each product should have:
- `id`: Unique identifier
- `name`: Product name
- `category`: One of "Silk Ikat", "Cotton Ikat", "Dupattas", "Lehengas"
- `price`: Price in rupees
- `availability`: Status text
- `stock`: Number (0 for out of stock or made-to-order)
- `images`: Array of image paths
- `fabric`: Fabric type
- `length`: Length description
- `blousePiece`: Blouse piece information
- `deliveryTime`: Delivery time description
- `careInstructions`: Care instructions text

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The website uses React Router for navigation
- All animations use CSS transitions
- WhatsApp integration opens chat in a new tab
- The site is fully responsive and mobile-friendly
