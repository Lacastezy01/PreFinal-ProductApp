import { Product } from '../types/product';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'CyberMech Hot-Swap Keyboard',
    category: 'Electronics',
    description: 'Custom 75% mechanical keyboard with tactile yellow switches, south-facing RGB, and ultra-durable PBT dye-sub keycaps designed for peak playful productivity.',
    specifications: 'Connectivity: Type-C / 2.4Ghz / BT 5.2 | Battery: 4000mAh | Switches: Gateron Yellow Pre-lubed | Plate: Polycarbonate gasket mount',
    rating: 4.9,
    price: 3850.00,
    quantity: 12, // In Stock (>= 5)
    featureImage: '/images/products/keyboard.svg',
    badge: 'BESTSELLER'
  },
  {
    id: 'prod-002',
    name: 'CyberSound Neon Headphones',
    category: 'Electronics',
    description: 'Over-ear wireless headphones with active noise cancellation, custom tuned 40mm titanium drivers, and punchy cartoon retro color accents.',
    specifications: 'Drivers: 40mm Titanium | ANC: -38dB active reduction | Playtime: 45 hours | Weight: 245g | Fast Charging: 10 mins = 5 hrs',
    rating: 4.7,
    price: 2490.00,
    quantity: 3, // Low Stock (< 5)
    featureImage: '/images/products/headphones.svg',
    badge: 'POPULAR'
  },
  {
    id: 'prod-003',
    name: 'PixelRunner Canvas High-Tops',
    category: 'Fashion',
    description: 'Vibrant vulcanized canvas sneakers with reinforced rubber toe caps, dual-density memory foam insoles, and hand-stitched pop art star badges.',
    specifications: 'Material: Heavyweight organic cotton canvas | Sole: Non-slip natural rubber | Insole: OrthoLite memory foam | Unisex sizing: EU 36-45',
    rating: 4.8,
    price: 1899.00,
    quantity: 8, // In Stock (>= 5)
    featureImage: '/images/products/sneakers.svg',
    badge: 'LIMITED'
  },
  {
    id: 'prod-004',
    name: 'SnapPop 35mm Retro Film Camera',
    category: 'Electronics',
    description: 'Pocket-sized reusable 35mm point-and-shoot camera with built-in flash, sharp 31mm optical lens, and vibrant lemon yellow casing.',
    specifications: 'Film Format: Standard 35mm (Color or B&W) | Lens: 31mm f/9 fixed focus | Shutter Speed: 1/120s | Flash: Built-in with 5s recycle',
    rating: 4.6,
    price: 1250.00,
    quantity: 2, // Low Stock (< 5)
    featureImage: '/images/products/camera.svg'
  },
  {
    id: 'prod-005',
    name: 'DoodleWorld XXL Desk Mat',
    category: 'Stationery',
    description: 'Massive extended desk pad featuring playful hand-drawn illustrations, stitched anti-fray edges, and water-resistant micro-woven cloth surface.',
    specifications: 'Dimensions: 900 x 400 x 4mm | Surface: Micro-woven spill-proof polyester | Base: Non-slip textured natural rubber | Edge: 360° precision lock stitching',
    rating: 4.5,
    price: 750.00,
    quantity: 0, // Out of Stock (= 0)
    featureImage: '/images/products/deskmat.svg',
    badge: 'RESTOCKING'
  },
  {
    id: 'prod-006',
    name: 'Monster Smile Ceramic Mug',
    category: 'Home & Living',
    description: 'Chunky handmade stoneware coffee mug with playful 3D cartoon monster teeth, glossy heat-retaining glaze, and oversized ergonomic handle.',
    specifications: 'Capacity: 420ml (14.2 oz) | Material: High-fire ceramic stoneware | Safety: Microwave & dishwasher safe | Finish: High-gloss food grade glaze',
    rating: 4.8,
    price: 480.00,
    quantity: 15, // In Stock (>= 5)
    featureImage: '/images/products/mug.svg'
  },
  {
    id: 'prod-007',
    name: 'Glowbot Art Toy Vinyl Figure',
    category: 'Collectibles',
    description: 'Limited-edition designer vinyl art figure featuring articulated arms, glow-in-the-dark chest meter, and signature cartoon aesthetic.',
    specifications: 'Height: 18cm (7 inches) | Material: Rotocast soft vinyl | Articulation: 4 points (head, arms, waist) | Packaging: Custom illustrated collector box',
    rating: 5.0,
    price: 3200.00,
    quantity: 4, // Low Stock (< 5)
    featureImage: '/images/products/glowbot.svg',
    badge: 'HOT DROP'
  },
  {
    id: 'prod-008',
    name: 'Metro Hopper Everyday Backpack',
    category: 'Fashion',
    description: 'Weatherproof urban commuter pack with dedicated 16-inch padded laptop sleeve, quick-access security pocket, and vibrant hot-pink colorway.',
    specifications: 'Volume: 22 Liters | Weight: 680g | Material: 600D recycled water-repellent Cordura | Compartments: 8 organized pockets + hidden passport slot',
    rating: 4.7,
    price: 2650.00,
    quantity: 7, // In Stock (>= 5)
    featureImage: '/images/products/backpack.svg'
  }
];
