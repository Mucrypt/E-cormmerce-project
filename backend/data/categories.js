//backend/data/categories.js
const { v4: uuidv4 } = require('uuid') // Import uuid

const categories = [
  {
    name: 'Sports & Outdoors',
    description: 'Gear and equipment for sports and outdoor activities.',
    subcategories: [
      {
        id: uuidv4(),
        name: 'Camping',
        image: 'https://picsum.photos/id/241/800',
      
      },
      {
        id: uuidv4(),
        name: 'Cycling',
        image: 'https://picssum.photos/id/242/800',
      },
      {
        id: uuidv4(),
        name: 'Fitness',
        image: 'https://picsum.photos/id/243/800',
      },
    ],
    collections: [
      {
        _id: uuidv4(),
        name: 'Summer Collection',
        image: 'https://picsum.photos/id/250/800',
      },
      {
        _id: uuidv4(),
        name: 'Winter Collection',
        image: 'https://picsum.photos/id/251/800',
      },
      {
        _id: uuidv4(),
        name: 'Adventure Gear',
        image: 'https://picsum.photos/id/252/800',
      },
    ],
    image: 'https://picsum.photos/id/250/800',
    status: 'Active',
    productCount: 0,
    products: [],
  },
  {
    name: 'Beauty & Personal Care',
    description: 'Products for skincare, haircare, and personal grooming.',
    subcategories: [
      {
        id: uuidv4(),
        name: 'Skincare',
        image: 'https://picsum.photos/id/244/800',
      },
      {
        id: uuidv4(),
        name: 'Haircare',
        image: 'https://picsum.photos/id/245/800',
      },
      {
        id: uuidv4(),
        name: 'Makeup',
        image: 'https://picsum.photos/id/246/800',
      },
    ],
    collections: [
      {
        _id: uuidv4(),
        name: 'Self-Care Essentials',
        image: 'https://picsum.photos/id/253/800',
      },
      {
        _id: uuidv4(),
        name: 'Luxury Beauty',
        image: 'https://picsum.photos/id/254/800',
      },
      {
        _id: uuidv4(),
        name: 'Travel Kits',
        image: 'https://picsum.photos/id/255/800',
      },
    ],
    image: 'https://picsum.photos/id/251/800',
    status: 'Active',
    productCount: 0,
    products: [],
  },
  {
    name: 'Toys & Games',
    description: 'Fun and educational toys for kids of all ages.',
    subcategories: [
      {
        id: uuidv4(),
        name: 'Action Figures',
        image: 'https://picsum.photos/id/247/800',
      },
      {
        id: uuidv4(),
        name: 'Board Games',
        image: 'https://picsum.photos/id/248/800',
      },
      {
        id: uuidv4(),
        name: 'Puzzles',
        image: 'https://picsum.photos/id/249/800',
      },
      {
        id: uuidv4(),
        name: 'Outdoor Toys',
        image: 'https://picsum.photos/id/250/800',
      }
    ],
    collections: [
      {
        _id: uuidv4(),
        name: 'Kids Favorites',
        image: 'https://picsum.photos/id/256/800',
      },
      {
        _id: uuidv4(),
        name: 'Educational Toys',
        image: 'https://picsum.photos/id/257/800',
      },
      {
        _id: uuidv4(),
        name: 'Party Games',
        image: 'https://picsum.photos/id/258/800',
      },
    ],
    image: 'https://picsum.photos/id/252/800',
    status: 'Active',
    productCount: 0,
    products: [],
  },
  {
    name: 'Electronics',
    description: 'Explore the latest gadgets and electronics.',
    subcategories: [
      {
        id: uuidv4(),
        name: 'Smartphones',
        image: 'https://picsum.photos/id/251/800',
      },
      {
        id: uuidv4(),
        name: 'Laptops',
        image: 'https://picsum.photos/id/252/800',
      
      },

      {
        id: uuidv4(),
        name: 'Headphones',
        image: 'https://picsum.photos/id/253/800',
      
      },
      {
        id: uuidv4(),
        name: 'Smartwatches',
        image: 'https://picsum.photos/id/254/800',
      }
    ],
    collections: [
      {
        _id: uuidv4(),
        name: 'Tech Innovations',
        image: 'https://picsum.photos/id/259/800',
      },
      {
        _id: uuidv4(),
        name: 'Gaming Gear',
        image: 'https://picsum.photos/id/260/800',
      },
      {
        _id: uuidv4(),
        name: 'Smart Home',
        image: 'https://picsum.photos/id/261/800',
      },
    ],
    image: 'https://picsum.photos/id/237/800',
    status: 'Active',
    productCount: 0,
    products: [],
  },
  {
    name: 'Fashion',
    description: 'Trendy clothing and accessories for all.',
    subcategories: [
      {
        id: uuidv4(),
        name: 'Clothing',
        image: 'https://picsum.photos/id/262/800',
      },
      {
        id: uuidv4(),
        name: 'Shoes',
        image: 'https://picsum.photos/id/263/800',
      },
      {
        id: uuidv4(),
        name: 'Accessories',
        image: 'https://picsum.photos/id/264/800',
      },
      {
        id: uuidv4(),
        name: 'Bags',
        image: 'https://picsum.photos/id/265/800',
      }
    ],
    collections: [
      {
        _id: uuidv4(),
        name: 'Summer Fashion',
        image: 'https://picsum.photos/id/262/800',
      },
      {
        _id: uuidv4(),
        name: 'Winter Wardrobe',
        image: 'https://picsum.photos/id/263/800',
      },
      {
        _id: uuidv4(),
        name: 'Casual Styles',
        image: 'https://picsum.photos/id/264/800',
      },
    ],
    image: 'https://picsum.photos/id/238/800',
    status: 'Active',
    productCount: 0,
    products: [],
  },
  {
    name: 'Home & Kitchen',
    description: 'Everything you need for your home and kitchen.',
    subcategories: [
      {
        id: uuidv4(),
        name: 'Cookware',
        image: 'https://picsum.photos/id/265/800',
      },
      {
        id: uuidv4(),
        name: 'Home Decor',
        image: 'https://picsum.photos/id/266/800',
      },
      {
        id: uuidv4(),
        name: 'Storage',
        image: 'https://picsum.photos/id/267/800',
      },
      {
        id: uuidv4(),
        name: 'Cleaning Supplies',
        image: 'https://picsum.photos/id/268/800',
      }
    ],
    collections: [
      {
        _id: uuidv4(),
        name: 'Home Essentials',
        image: 'https://picsum.photos/id/265/800',
      },
      {
        _id: uuidv4(),
        name: 'Kitchen Must-Haves',
        image: 'https://picsum.photos/id/266/800',
      },
      {
        _id: uuidv4(),
        name: 'Cozy Living',
        image: 'https://picsum.photos/id/267/800',
      },
    ],
    image: 'https://picsum.photos/id/239/800',
    status: 'Active',
    productCount: 0,
    products: [],
  },
  {
    name: 'Books & Stationery',
    description: 'Books, notebooks, and stationery items.',
    subcategories: [
      {
        id: uuidv4(),
        name: 'Fiction',
        image: 'https://picsum.photos/id/268/800',
      },
      {
        id: uuidv4(),
        name: 'Non-Fiction',
        image: 'https://picsum.photos/id/269/800',
      },
      {
        id: uuidv4(),
        name: 'Stationery',
        image: 'https://picsum.photos/id/270/800',
      },
    ],
    collections: [
      {
        _id: uuidv4(),
        name: 'Bestsellers',
        image: 'https://picsum.photos/id/268/800',
      },
      {
        _id: uuidv4(),
        name: 'Academic Essentials',
        image: 'https://picsum.photos/id/269/800',
      },
      {
        _id: uuidv4(),
        name: 'Creative Writing',
        image: 'https://picsum.photos/id/270/800',
      },
    ],
    image: 'https://picsum.photos/id/240/800',
    status: 'Active',
    productCount: 0,
    products: [],
  },
  {
    name: 'Jewelry & Watches',
    description: 'Elegant jewelry and stylish watches.',
    subcategories: [
      {
        id: uuidv4(),
        name: 'Rings',
        image: 'https://picsum.photos/id/271/800',
      },
      {
        id: uuidv4(),
        name: 'Necklaces',
        image: 'https://picsum.photos/id/272/800',
      },
      {
        id: uuidv4(),
        name: 'Watches',
        image: 'https://picsum.photos/id/273/800',
      },
    ],
    collections: [
      {
        _id: uuidv4(),
        name: 'Luxury Collection',
        image: 'https://picsum.photos/id/271/800',
      },
      {
        _id: uuidv4(),
        name: 'Everyday Wear',
        image: 'https://picsum.photos/id/272/800',
      },
      {
        _id: uuidv4(),
        name: 'Gift Ideas',
        image: 'https://picsum.photos/id/273/800',
      },
    ],
    image: 'https://picsum.photos/id/241/800',
    status: 'Active',
    productCount: 0,
    products: [],
  },
  {
    name: 'Automotive',
    description: 'Car parts, tools, and accessories.',
    subcategories: [{
        id: uuidv4(),
        name: 'Car Care',
        image: 'https://picsum.photos/id/274/800',
    },
    {
        id: uuidv4(),
        name: 'Interior Accessories',
        image: 'https://picsum.photos/id/275/800',
    },
    {
        id: uuidv4(),
        name: 'Exterior Accessories',
        image: 'https://picsum.photos/id/276/800',
    },
    {
        id: uuidv4(),
        name: 'Performance Parts',
        image: 'https://picsum.photos/id/277/800',
    }
  ],
    collections: [
      {
        _id: uuidv4(),
        name: 'Car Care Essentials',
        image: 'https://picsum.photos/id/274/800',
      },
      {
        _id: uuidv4(),
        name: 'Upgrade Your Ride',
        image: 'https://picsum.photos/id/275/800',
      },
      {
        _id: uuidv4(),
        name: 'Travel Accessories',
        image: 'https://picsum.photos/id/276/800',
      },
    ],
    image: 'https://picsum.photos/id/242/800',
    status: 'Active',
    productCount: 0,
    products: [],
  },
  {
    name: "Men's Clothing",
    description: 'Clothing for men',
    subcategories: [
      {
        id: uuidv4(),
        name: 'Shirts',
        image: 'https://picsum.photos/id/277/800',

      },
      {
        id: uuidv4(),
        name: 'Trousers',
        image: 'https://picsum.photos/id/278/800',
      },
      {
        id: uuidv4(),
        name: 'Accessories',
        image: 'https://picsum.photos/id/279/800',
      },
    ],
    collections: [
      {
        _id: uuidv4(),
        name: 'Summer Collection',
        image: 'https://picsum.photos/id/277/800',
      },
      {
        _id: uuidv4(),
        name: 'Winter Collection',
        image: 'https://picsum.photos/id/278/800',
      },
    ],
    image: 'https://picsum.photos/id/250/800',
    status: 'Active',
    productCount: 0,
    products: [],
  },
  {
    name: "Women's Clothing",
    description: 'Clothing for women',
    subcategories: [
      {
        id: uuidv4(),
        name: 'Dresses',
        image: 'https://picsum.photos/id/279/800',
      
      },
      {
        id: uuidv4(),
        name: 'Tops',
        image: 'https://picssum.photos/id/280/800',
      },
      {
        id: uuidv4(),
        name: 'Bottoms',
        image: 'https://picsum.photos/id/281/800',
      },
      {
        id: uuidv4(),
        name: 'Accessories',
        image: 'https://picsum.photos/id/282/800',
      }

    ],
    collections: [
      {
        _id: uuidv4(),
        name: 'Summer Collection',
        image: 'https://picsum.photos/id/279/800',
      },
      {
        _id: uuidv4(),
        name: 'Winter Collection',
        image: 'https://picsum.photos/id/280/800',
      },
    ],
    image: 'https://picsum.photos/id/251/800',
    status: 'Active',
    productCount: 0,
    products: [],
  },
  // Add more categories here
]

module.exports = categories
