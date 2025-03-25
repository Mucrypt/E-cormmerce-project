//backend/data/products.js
const { v4: uuidv4 } = require('uuid') // Import uuid
const products = [
  // Sports & Outdoors
  {
    name: 'Mountain Bike',
    description: 'Durable mountain bike for all terrains.',
    price: 599.99,
    discountPrice: 549.99,
    brand: 'TrailMaster',
    stock: 50,
    category: 'Sports & Outdoors',
    images: [
      {
        url: 'https://picsum.photos/id/260/800',
        altText: 'Mountain Bike',
      },
      {
        url: 'https://picsum.photos/id/261/800',
        altText: 'Mountain Bike on a trail',
      },
    ],
    status: 'Active',
    sku: 'MB1001',
    sizes: [],
    colors: ['Red', 'Black'],
    collectionId: 'collectionId1', // Reference to the collection ID
    material: 'Aluminum Frame',
    careInstructions: 'Wipe clean with a damp cloth.',
    gender: 'Unisex',
    attributes: {
      Gear: ['21-speed'],
      Weight: ['15 kg'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 120,
    tags: ['bike', 'cycling', 'outdoors'],
    user: 'ObjectId_of_User',
    metaTitle: 'Mountain Bike - TrailMaster',
    metaDescription: 'A rugged mountain bike built for adventure.',
    metaKeywords: 'bike, mountain, cycling',
    dimensions: {
      length: '68 inches',
      width: '24 inches',
    },
    weight: 15000,
    reviews: [
      {
        name: 'John Doe',
        rating: 5,
        comment: 'Amazing bike! Smooth ride on trails.',
      },
    ],
  },
  {
    name: 'Camping Tent',
    description: 'Spacious 4-person tent for outdoor camping.',
    price: 199.99,
    discountPrice: 179.99,
    brand: 'OutdoorPro',
    stock: 80,
    category: 'Sports & Outdoors',
    images: [
      {
        url: 'https://picsum.photos/id/262/800',
        altText: 'Camping Tent',
      },
      {
        url: 'https://picsum.photos/id/263/800',
        altText: 'Tent set up in the wild',
      },
    ],
    status: 'Active',
    sku: 'CT2001',
    sizes: [],
    colors: ['Green', 'Blue'],
    collectionId: 'collectionId2', // Reference to the collection ID
    material: 'Waterproof Polyester',
    careInstructions: 'Air dry after use.',
    gender: 'Unisex',
    attributes: {
      Capacity: ['4 People'],
      Waterproof: ['Yes'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.6,
    numReviews: 85,
    tags: ['camping', 'tent', 'outdoor'],
    user: 'ObjectId_of_User',
    metaTitle: 'Camping Tent - OutdoorPro',
    metaDescription: 'A high-quality, waterproof camping tent.',
    metaKeywords: 'camping, tent, outdoor',
    dimensions: {
      length: '10 ft',
      width: '8 ft',
    },
    weight: 5000,
    reviews: [
      {
        name: 'Alice Smith',
        rating: 5,
        comment: 'Spacious and easy to set up!',
      },
    ],
  },
  {
    name: 'Dumbbell Set',
    description: 'Adjustable dumbbell set for home workouts.',
    price: 89.99,
    discountPrice: 79.99,
    brand: 'FitGear',
    stock: 150,
    category: 'Sports & Outdoors',
    images: [
      {
        url: 'https://picsum.photos/id/264/800',
        altText: 'Dumbbell Set',
      },
      {
        url: 'https://picsum.photos/id/265/800',
        altText: 'Dumbbells in use',
      },
    ],
    status: 'Active',
    sku: 'DS3001',
    sizes: [],
    colors: ['Black'],
    collectionId: 'collectionId3', // Reference to the collection ID
    material: 'Cast Iron',
    careInstructions: 'Wipe with a dry cloth after use.',
    gender: 'Unisex',
    attributes: {
      Weight: ['5-50 lbs adjustable'],
      Coating: ['Rubberized grip'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 95,
    tags: ['fitness', 'dumbbells', 'workout'],
    user: 'ObjectId_of_User',
    metaTitle: 'Dumbbell Set - FitGear',
    metaDescription: 'An adjustable dumbbell set for full-body workouts.',
    metaKeywords: 'dumbbells, workout, fitness',
    dimensions: {
      length: '12 inches',
      width: '4 inches',
    },
    weight: 12000,
    reviews: [
      {
        name: 'Bob Martin',
        rating: 5,
        comment: 'Great quality and easy to adjust.',
      },
    ],
  },
  // Beauty & Personal Care
  {
    name: 'Hydrating Face Cream',
    description:
      'A lightweight face cream that deeply hydrates and nourishes the skin.',
    price: 24.99,
    discountPrice: 19.99,
    brand: 'GlowSkin',
    stock: 200,
    category: 'Beauty & Personal Care',
    images: [
      {
        url: 'https://picsum.photos/id/270/800',
        altText: 'Hydrating Face Cream bottle',
      },
      {
        url: 'https://picsum.photos/id/271/800',
        altText: 'Face cream applied on hand',
      },
    ],
    status: 'Active',
    sku: 'HFC1001',
    sizes: ['50ml', '100ml'],
    colors: [],
    collectionId: 'collectionId4', // Reference to the collection ID
    material: 'Organic ingredients',
    careInstructions: 'Store in a cool, dry place.',
    gender: 'Unisex',
    attributes: {
      SkinType: ['All Skin Types'],
      Ingredients: ['Aloe Vera', 'Vitamin E'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 80,
    tags: ['skincare', 'moisturizer', 'face cream'],
    user: 'ObjectId_of_User',
    metaTitle: 'Hydrating Face Cream - GlowSkin',
    metaDescription:
      'A lightweight and nourishing face cream for healthy skin.',
    metaKeywords: 'skincare, face cream, moisturizer',
    dimensions: {
      length: '4 inches',
      width: '2 inches',
    },
    weight: 200,
    reviews: [
      {
        name: 'Emma Johnson',
        rating: 5,
        comment: 'My skin feels so soft and hydrated!',
      },
    ],
  },
  {
    name: 'Argan Oil Shampoo',
    description:
      'A nourishing shampoo infused with argan oil for healthy, shiny hair.',
    price: 14.99,
    discountPrice: 12.99,
    brand: 'NatureLocks',
    stock: 300,
    category: 'Beauty & Personal Care',
    images: [
      {
        url: 'https://picsum.photos/id/272/800',
        altText: 'Argan Oil Shampoo bottle',
      },
      {
        url: 'https://picsum.photos/id/273/800',
        altText: 'Shampoo lathered in hair',
      },
    ],
    status: 'Active',
    sku: 'AOS2001',
    sizes: ['250ml', '500ml'],
    colors: [],
    collectionId: 'collectionId5', // Reference to the collection ID
    material: 'Argan Oil, Aloe Extract',
    careInstructions: 'Keep away from direct sunlight.',
    gender: 'Unisex',
    attributes: {
      HairType: ['Dry', 'Damaged'],
      Ingredients: ['Argan Oil', 'Keratin'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.6,
    numReviews: 75,
    tags: ['haircare', 'shampoo', 'argan oil'],
    user: 'ObjectId_of_User',
    metaTitle: 'Argan Oil Shampoo - NatureLocks',
    metaDescription: 'A rich shampoo with argan oil for soft and healthy hair.',
    metaKeywords: 'shampoo, argan oil, haircare',
    dimensions: {
      length: '7 inches',
      width: '2 inches',
    },
    weight: 500,
    reviews: [
      {
        name: 'Sophia Brown',
        rating: 5,
        comment: 'My hair has never felt this smooth before!',
      },
    ],
  },
  {
    name: 'Matte Lipstick Set',
    description: 'A set of long-lasting matte lipsticks in vibrant shades.',
    price: 29.99,
    discountPrice: 24.99,
    brand: 'VelvetBeauty',
    stock: 150,
    category: 'Beauty & Personal Care',
    images: [
      {
        url: 'https://picsum.photos/id/274/800',
        altText: 'Matte Lipstick Set',
      },
      {
        url: 'https://picsum.photos/id/275/800',
        altText: 'Lipstick applied on lips',
      },
    ],
    status: 'Active',
    sku: 'MLS3001',
    sizes: [],
    colors: ['Red', 'Pink', 'Nude', 'Berry'],
    collectionId: 'collectionId6', // Reference to the collection ID
    material: 'Paraben-free, Vegan',
    careInstructions: 'Keep in a cool, dry place.',
    gender: 'Female',
    attributes: {
      Finish: ['Matte'],
      Ingredients: ['Shea Butter', 'Vitamin E'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 90,
    tags: ['lipstick', 'makeup', 'beauty'],
    user: 'ObjectId_of_User',
    metaTitle: 'Matte Lipstick Set - VelvetBeauty',
    metaDescription: 'A premium matte lipstick set with vibrant colors.',
    metaKeywords: 'lipstick, matte, makeup',
    dimensions: {
      length: '5 inches',
      width: '1 inch',
    },
    weight: 100,
    reviews: [
      {
        name: 'Olivia Martin',
        rating: 5,
        comment: 'Amazing colors, stays on all day!',
      },
    ],
  },

  // Toys & Games
  {
    name: 'Classic Chess Set',
    description:
      'A wooden chess set with beautifully carved pieces for all ages.',
    price: 39.99,
    discountPrice: 34.99,
    brand: 'GameMasters',
    stock: 100,
    category: 'Toys & Games',
    images: [
      {
        url: 'https://picsum.photos/id/280/800',
        altText: 'Classic Chess Set on a table',
      },
      {
        url: 'https://picsum.photos/id/281/800',
        altText: 'Chess pieces in close-up',
      },
    ],
    status: 'Active',
    sku: 'CHS1001',
    sizes: [],
    colors: ['Brown', 'Beige'],
    collectionId: 'collectionId7', // Reference to the collection ID
    material: 'Solid Wood',
    careInstructions: 'Wipe with a dry cloth after use.',
    gender: 'Unisex',
    attributes: {
      BoardSize: ['15x15 inches'],
      PieceMaterial: ['Wood'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.9,
    numReviews: 120,
    tags: ['chess', 'board game', 'strategy'],
    user: 'ObjectId_of_User',
    metaTitle: 'Classic Chess Set - GameMasters',
    metaDescription: 'A premium wooden chess set for strategic gameplay.',
    metaKeywords: 'chess, board game, strategy',
    dimensions: {
      length: '15 inches',
      width: '15 inches',
    },
    weight: 1200,
    reviews: [
      {
        name: 'Michael Adams',
        rating: 5,
        comment: 'Great quality and perfect for family game nights!',
      },
    ],
  },
  {
    name: 'Superhero Action Figure Set',
    description: 'A set of 6 highly detailed superhero action figures.',
    price: 49.99,
    discountPrice: 44.99,
    brand: 'HeroWorld',
    stock: 200,
    category: 'Toys & Games',
    images: [
      {
        url: 'https://picsum.photos/id/282/800',
        altText: 'Superhero Action Figure Set in packaging',
      },
      {
        url: 'https://picsum.photos/id/283/800',
        altText: 'Action figures displayed on a shelf',
      },
    ],
    status: 'Active',
    sku: 'SAF2001',
    sizes: [],
    colors: ['Multicolor'],
    collectionId: 'collectionId8', // Reference to the collection ID
    material: 'ABS Plastic',
    careInstructions: 'Clean with a damp cloth.',
    gender: 'Unisex',
    attributes: {
      FigureHeight: ['6 inches'],
      MovableJoints: ['Yes'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 95,
    tags: ['action figures', 'toys', 'superheroes'],
    user: 'ObjectId_of_User',
    metaTitle: 'Superhero Action Figure Set - HeroWorld',
    metaDescription: 'A set of 6 collectible superhero action figures.',
    metaKeywords: 'action figures, superheroes, toys',
    dimensions: {
      length: '12 inches',
      width: '8 inches',
    },
    weight: 800,
    reviews: [
      {
        name: 'Daniel Carter',
        rating: 5,
        comment: 'My kids absolutely love these!',
      },
    ],
  },
  {
    name: '3D Puzzle Set - Famous Landmarks',
    description: 'A 3D puzzle set featuring famous world landmarks.',
    price: 29.99,
    discountPrice: 24.99,
    brand: 'PuzzleWorld',
    stock: 150,
    category: 'Toys & Games',
    images: [
      {
        url: 'https://picsum.photos/id/284/800',
        altText: '3D Puzzle Set box',
      },
      {
        url: 'https://picsum.photos/id/285/800',
        altText: 'Completed 3D puzzle of the Eiffel Tower',
      },
    ],
    status: 'Active',
    sku: '3DP3001',
    sizes: [],
    colors: ['Multicolor'],
    collectionId: 'collectionId9', // Reference to the collection ID
    material: 'Foam Board',
    careInstructions: 'Keep away from water.',
    gender: 'Unisex',
    attributes: {
      Pieces: ['1000+'],
      DifficultyLevel: ['Intermediate'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 110,
    tags: ['puzzle', '3D', 'landmarks'],
    user: 'ObjectId_of_User',
    metaTitle: '3D Puzzle Set - Famous Landmarks',
    metaDescription:
      'A fun and challenging 3D puzzle set featuring famous landmarks.',
    metaKeywords: 'puzzle, 3D puzzle, landmarks',
    dimensions: {
      length: '10 inches',
      width: '8 inches',
    },
    weight: 600,
    reviews: [
      {
        name: 'Jessica Lee',
        rating: 5,
        comment: 'So much fun to build! Great family activity.',
      },
    ],
  },

  // Electronics
  // Add products for the Electronics category

  {
    name: 'Smartphone X Pro',
    description:
      'A powerful smartphone with a stunning display and advanced camera system.',
    price: 999.99,
    discountPrice: 899.99,
    brand: 'TechNova',
    stock: 150,
    category: 'Electronics',
    images: [
      {
        url: 'https://picsum.photos/id/290/800',
        altText: 'Smartphone X Pro front and back',
      },
      {
        url: 'https://picsum.photos/id/291/800',
        altText: 'Smartphone X Pro in hand',
      },
    ],
    status: 'Active',
    sku: 'SMPX1001',
    sizes: [],
    colors: ['Black', 'Silver', 'Blue'],
    collectionId: 'collectionId10', // Reference to the collection ID
    material: 'Aluminum and Glass',
    careInstructions:
      'Use a screen protector and clean with a microfiber cloth.',
    gender: 'Unisex',
    attributes: {
      Display: ['6.7-inch OLED'],
      Camera: ['108MP Triple Camera'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.9,
    numReviews: 180,
    tags: ['smartphone', 'mobile', 'electronics'],
    user: 'ObjectId_of_User',
    metaTitle: 'Smartphone X Pro - TechNova',
    metaDescription: 'A high-performance smartphone with a sleek design.',
    metaKeywords: 'smartphone, mobile, tech',
    dimensions: {
      length: '6.7 inches',
      width: '3 inches',
    },
    weight: 200,
    reviews: [
      {
        name: 'Jake Wilson',
        rating: 5,
        comment: 'Fantastic phone! Super fast and amazing camera.',
      },
    ],
  },
  {
    name: 'Gaming Laptop Ultra',
    description:
      'A high-end gaming laptop with powerful graphics and fast performance.',
    price: 1499.99,
    discountPrice: 1399.99,
    brand: 'GamerZone',
    stock: 100,
    category: 'Electronics',
    images: [
      {
        url: 'https://picsum.photos/id/292/800',
        altText: 'Gaming Laptop Ultra with RGB keyboard',
      },
      {
        url: 'https://picsum.photos/id/293/800',
        altText: 'Gaming Laptop Ultra running a game',
      },
    ],
    status: 'Active',
    sku: 'GLU2001',
    sizes: [],
    colors: ['Black', 'Red'],
    collectionId: 'collectionId11', // Reference to the collection ID
    material: 'Aluminum Body',
    careInstructions:
      'Keep vents clear and clean the screen with a soft cloth.',
    gender: 'Unisex',
    attributes: {
      Processor: ['Intel Core i9'],
      RAM: ['32GB'],
      Graphics: ['NVIDIA RTX 3080'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 95,
    tags: ['laptop', 'gaming', 'electronics'],
    user: 'ObjectId_of_User',
    metaTitle: 'Gaming Laptop Ultra - GamerZone',
    metaDescription: 'A powerful gaming laptop for high-performance gaming.',
    metaKeywords: 'gaming laptop, PC, gaming',
    dimensions: {
      length: '15.6 inches',
      width: '10 inches',
    },
    weight: 2500,
    reviews: [
      {
        name: 'Tom Richards',
        rating: 5,
        comment: 'Best gaming laptop I have ever owned!',
      },
    ],
  },
  {
    name: 'Wireless Noise-Canceling Headphones',
    description:
      'Premium wireless headphones with noise cancellation and deep bass.',
    price: 299.99,
    discountPrice: 259.99,
    brand: 'SoundMax',
    stock: 200,
    category: 'Electronics',
    images: [
      {
        url: 'https://picsum.photos/id/294/800',
        altText: 'Wireless Noise-Canceling Headphones in black',
      },
      {
        url: 'https://picsum.photos/id/295/800',
        altText: 'Headphones worn by a user',
      },
    ],
    status: 'Active',
    sku: 'WHN3001',
    sizes: [],
    colors: ['Black', 'White', 'Silver'],
    collectionId: 'collectionId12', // Reference to the collection ID
    material: 'Plastic and Memory Foam',
    careInstructions: 'Store in a case when not in use.',
    gender: 'Unisex',
    attributes: {
      BatteryLife: ['30 hours'],
      Connectivity: ['Bluetooth 5.0'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 120,
    tags: ['headphones', 'audio', 'electronics'],
    user: 'ObjectId_of_User',
    metaTitle: 'Wireless Noise-Canceling Headphones - SoundMax',
    metaDescription:
      'Premium noise-canceling headphones with superior sound quality.',
    metaKeywords: 'headphones, noise-canceling, audio',
    dimensions: {
      length: '7 inches',
      width: '6 inches',
    },
    weight: 500,
    reviews: [
      {
        name: 'Sarah Lopez',
        rating: 5,
        comment: 'Amazing sound quality and super comfortable!',
      },
    ],
  },

  //Fashion
  // Add products for the Fashion category
  {
    name: 'Men’s Leather Jacket',
    description: 'A stylish and durable leather jacket for men.',
    price: 149.99,
    discountPrice: 129.99,
    brand: 'UrbanStyle',
    stock: 100,
    category: 'Fashion',
    images: [
      {
        url: 'https://picsum.photos/id/300/800',
        altText: 'Men’s Leather Jacket in brown',
      },
      {
        url: 'https://picsum.photos/id/301/800',
        altText: 'Leather Jacket worn by a model',
      },
    ],
    status: 'Active',
    sku: 'MLJ1001',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
    collectionId: 'collectionId13', // Reference to the collection ID
    material: 'Genuine Leather',
    careInstructions: 'Dry clean only.',
    gender: 'Male',
    attributes: {
      Fit: ['Slim Fit'],
      Closure: ['Zipper'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 90,
    tags: ['jacket', 'fashion', 'men'],
    user: 'ObjectId_of_User',
    metaTitle: 'Men’s Leather Jacket - UrbanStyle',
    metaDescription: 'A premium quality leather jacket for men.',
    metaKeywords: 'jacket, leather, fashion',
    dimensions: {
      length: '28 inches',
      width: '20 inches',
    },
    weight: 1500,
    reviews: [
      {
        name: 'Ryan Adams',
        rating: 5,
        comment: 'Great fit and excellent quality!',
      },
    ],
  },

  {
    name: 'Stainless Steel Cookware Set',
    description:
      'A premium 10-piece stainless steel cookware set for all cooking needs.',
    price: 199.99,
    discountPrice: 179.99,
    brand: 'KitchenPro',
    stock: 120,
    category: 'Home & Kitchen',
    images: [
      {
        url: 'https://picsum.photos/id/310/800',
        altText: 'Stainless Steel Cookware Set on a kitchen counter',
      },
      {
        url: 'https://picsum.photos/id/311/800',
        altText: 'Cookware Set displayed with food',
      },
    ],
    status: 'Active',
    sku: 'SSC1001',
    sizes: [],
    colors: ['Silver'],
    collectionId: 'collectionId14', // Reference to the collection ID
    material: 'Stainless Steel',
    careInstructions: 'Dishwasher safe, hand wash recommended.',
    gender: 'Unisex',
    attributes: {
      Pieces: ['10'],
      OvenSafe: ['Yes, up to 500°F'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.9,
    numReviews: 130,
    tags: ['cookware', 'kitchen', 'home'],
    user: 'ObjectId_of_User',
    metaTitle: 'Stainless Steel Cookware Set - KitchenPro',
    metaDescription:
      'A premium quality stainless steel cookware set for chefs.',
    metaKeywords: 'cookware, kitchen, pots and pans',
    dimensions: {
      length: '15 inches',
      width: '12 inches',
    },
    weight: 7000,
    reviews: [
      {
        name: 'Jessica Allen',
        rating: 5,
        comment: 'Amazing quality! Cooks evenly and easy to clean.',
      },
    ],
  },
  {
    name: 'Modern Sofa Set',
    description:
      'A stylish and comfortable three-seater sofa for modern homes.',
    price: 699.99,
    discountPrice: 649.99,
    brand: 'ComfortLiving',
    stock: 50,
    category: 'Home & Kitchen',
    images: [
      {
        url: 'https://picsum.photos/id/312/800',
        altText: 'Modern Sofa Set in a living room',
      },
      {
        url: 'https://picsum.photos/id/313/800',
        altText: 'Sofa Set with throw pillows',
      },
    ],
    status: 'Active',
    sku: 'MSS2001',
    sizes: [],
    colors: ['Grey', 'Beige'],
    collectionId: 'collectionId15', // Reference to the collection ID
    material: 'High-density foam and fabric',
    careInstructions: 'Vacuum regularly and spot clean with mild detergent.',
    gender: 'Unisex',
    attributes: {
      SeatingCapacity: ['3 People'],
      CushionMaterial: ['Memory Foam'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 90,
    tags: ['sofa', 'furniture', 'home'],
    user: 'ObjectId_of_User',
    metaTitle: 'Modern Sofa Set - ComfortLiving',
    metaDescription: 'A luxurious and modern sofa set for any living space.',
    metaKeywords: 'sofa, home decor, furniture',
    dimensions: {
      length: '84 inches',
      width: '35 inches',
    },
    weight: 25000,
    reviews: [
      {
        name: 'David Parker',
        rating: 5,
        comment: 'Super comfortable and looks amazing in my living room!',
      },
    ],
  },
  {
    name: 'Decorative Wall Clock',
    description: 'A stylish and minimalistic wall clock with silent movement.',
    price: 49.99,
    discountPrice: 39.99,
    brand: 'TimelessDecor',
    stock: 200,
    category: 'Home & Kitchen',
    images: [
      {
        url: 'https://picsum.photos/id/314/800',
        altText: 'Decorative Wall Clock on a living room wall',
      },
      {
        url: 'https://picsum.photos/id/315/800',
        altText: 'Close-up of the Wall Clock',
      },
    ],
    status: 'Active',
    sku: 'DWC3001',
    sizes: [],
    colors: ['Black', 'White', 'Gold'],
    collectionId: 'collectionId16', // Reference to the collection ID
    material: 'Wood and Metal',
    careInstructions: 'Dust with a soft cloth.',
    gender: 'Unisex',
    attributes: {
      Size: ['12-inch diameter'],
      Battery: ['1 AA battery'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 85,
    tags: ['clock', 'home decor', 'minimalist'],
    user: 'ObjectId_of_User',
    metaTitle: 'Decorative Wall Clock - TimelessDecor',
    metaDescription: 'A stylish and modern wall clock for any home.',
    metaKeywords: 'wall clock, decor, home accessories',
    dimensions: {
      length: '12 inches',
      width: '12 inches',
    },
    weight: 1000,
    reviews: [
      {
        name: 'Sarah White',
        rating: 5,
        comment: 'Beautiful design and completely silent!',
      },
    ],
  },
  {
    name: 'Car Vacuum Cleaner',
    description: 'A powerful and compact vacuum cleaner for easy car cleaning.',
    price: 59.99,
    discountPrice: 49.99,
    brand: 'AutoClean',
    stock: 300,
    category: 'Automotive',
    images: [
      {
        url: 'https://picsum.photos/id/320/800',
        altText: 'Car Vacuum Cleaner in use',
      },
      {
        url: 'https://picsum.photos/id/321/800',
        altText: 'Car Vacuum Cleaner with accessories',
      },
    ],
    status: 'Active',
    sku: 'CVC1001',
    sizes: [],
    colors: ['Black', 'Red'],
    collectionId: 'collectionId17', // Reference to the collection ID
    material: 'Plastic and Metal',
    careInstructions: 'Empty the dustbin after each use.',
    gender: 'Unisex',
    attributes: {
      SuctionPower: ['5000Pa'],
      Cordless: ['Yes'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 110,
    tags: ['car', 'vacuum', 'cleaning'],
    user: 'ObjectId_of_User',
    metaTitle: 'Car Vacuum Cleaner - AutoClean',
    metaDescription: 'A compact and powerful vacuum cleaner for car interiors.',
    metaKeywords: 'car vacuum, cleaning, automotive',
    dimensions: {
      length: '10 inches',
      width: '5 inches',
    },
    weight: 1500,
    reviews: [
      {
        name: 'James Carter',
        rating: 5,
        comment: 'Works great and keeps my car spotless!',
      },
    ],
  },
  {
    name: 'Leather Car Seat Covers',
    description:
      'Premium leather car seat covers for a luxurious feel and protection.',
    price: 199.99,
    discountPrice: 179.99,
    brand: 'AutoComfort',
    stock: 80,
    category: 'Automotive',
    images: [
      {
        url: 'https://picsum.photos/id/322/800',
        altText: 'Leather Car Seat Covers installed in a car',
      },
      {
        url: 'https://picsum.photos/id/323/800',
        altText: 'Close-up of Leather Car Seat Covers',
      },
    ],
    status: 'Active',
    sku: 'LCS2001',
    sizes: [],
    colors: ['Black', 'Tan', 'Gray'],
    collections: ['Interior Accessories'],
    material: 'Genuine Leather',
    careInstructions: 'Wipe with a damp cloth, use leather conditioner.',
    gender: 'Unisex',
    attributes: {
      Fit: ['Universal'],
      WaterResistant: ['Yes'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 85,
    tags: ['car seat covers', 'leather', 'automotive'],
    user: 'ObjectId_of_User',
    metaTitle: 'Leather Car Seat Covers - AutoComfort',
    metaDescription:
      'Luxurious leather car seat covers for a comfortable ride.',
    metaKeywords: 'car seat covers, leather, automotive',
    dimensions: {
      length: '50 inches',
      width: '22 inches',
    },
    weight: 3000,
    reviews: [
      {
        name: 'Mark Evans',
        rating: 5,
        comment: 'High-quality leather and easy to install!',
      },
    ],
  },

  // Books & Stationery
  {
    name: 'The Art of Productivity',
    description: 'A best-selling book on time management and achieving goals.',
    price: 19.99,
    discountPrice: 15.99,
    brand: 'Penguin Books',
    stock: 300,
    category: 'Books & Stationery',
    images: [
      {
        url: 'https://picsum.photos/id/330/800',
        altText: 'The Art of Productivity book cover',
      },
      {
        url: 'https://picsum.photos/id/331/800',
        altText: 'Inside pages of The Art of Productivity',
      },
    ],
    status: 'Active',
    sku: 'BKP1001',
    sizes: [],
    colors: [],
    collectionId: 'collectionId18', // Reference to the collection ID
    material: 'Paperback',
    careInstructions: 'Keep in a dry place and avoid direct sunlight.',
    gender: 'Unisex',
    attributes: {
      Pages: ['320'],
      Language: ['English'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 120,
    tags: ['books', 'productivity', 'self-help'],
    user: 'ObjectId_of_User',
    metaTitle: 'The Art of Productivity - Penguin Books',
    metaDescription:
      'A guide to increasing productivity and managing time effectively.',
    metaKeywords: 'books, productivity, time management',
    dimensions: {
      length: '8 inches',
      width: '5 inches',
    },
    weight: 500,
    reviews: [
      {
        name: 'Alice Green',
        rating: 5,
        comment: 'A life-changing book with practical tips!',
      },
    ],
  },
  {
    name: 'Classic Leather Notebook',
    description: 'A premium leather notebook for journaling and note-taking.',
    price: 29.99,
    discountPrice: 24.99,
    brand: 'Moleskine',
    stock: 200,
    category: 'Books & Stationery',
    images: [
      {
        url: 'https://picsum.photos/id/332/800',
        altText: 'Classic Leather Notebook cover',
      },
      {
        url: 'https://picsum.photos/id/333/800',
        altText: 'Notebook pages with handwritten notes',
      },
    ],
    status: 'Active',
    sku: 'CLN2001',
    sizes: [],
    colors: ['Black', 'Brown'],
    collectionId: 'collectionId19', // Reference to the collection ID
    material: 'Leather Cover, Acid-Free Paper',
    careInstructions: 'Store in a dry place.',
    gender: 'Unisex',
    attributes: {
      PaperQuality: ['100 GSM'],
      Binding: ['Hardcover'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.9,
    numReviews: 90,
    tags: ['notebook', 'journal', 'stationery'],
    user: 'ObjectId_of_User',
    metaTitle: 'Classic Leather Notebook - Moleskine',
    metaDescription:
      'A high-quality leather notebook for writing and journaling.',
    metaKeywords: 'notebook, leather, stationery',
    dimensions: {
      length: '8.5 inches',
      width: '5.5 inches',
    },
    weight: 400,
    reviews: [
      {
        name: 'John Carter',
        rating: 5,
        comment: 'Perfect for journaling. The paper quality is amazing!',
      },
    ],
  },
  {
    name: 'Deluxe Stationery Set',
    description:
      'A complete set of premium pens, pencils, and writing accessories.',
    price: 49.99,
    discountPrice: 39.99,
    brand: 'StationeryPro',
    stock: 150,
    category: 'Books & Stationery',
    images: [
      {
        url: 'https://picsum.photos/id/334/800',
        altText: 'Deluxe Stationery Set with pens and pencils',
      },
      {
        url: 'https://picsum.photos/id/335/800',
        altText: 'Stationery set arranged on a desk',
      },
    ],
    status: 'Active',
    sku: 'DSS3001',
    sizes: [],
    colors: ['Multicolor'],
    collectionId: 'collectionId20', // Reference to the collection ID
    material: 'Plastic, Metal, Paper',
    careInstructions: 'Keep away from water.',
    gender: 'Unisex',
    attributes: {
      IncludedItems: ['Pens, Pencils, Markers, Erasers'],
      Packaging: ['Gift Box'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 85,
    tags: ['stationery', 'school', 'office'],
    user: 'ObjectId_of_User',
    metaTitle: 'Deluxe Stationery Set - StationeryPro',
    metaDescription:
      'A complete set of writing essentials for school and office.',
    metaKeywords: 'stationery, pens, writing set',
    dimensions: {
      length: '10 inches',
      width: '6 inches',
    },
    weight: 800,
    reviews: [
      {
        name: 'Emma Smith',
        rating: 5,
        comment: 'Great set with high-quality pens and pencils!',
      },
    ],
  },

  // Jewelry & Watches
  {
    name: 'Gold-Plated Necklace',
    description: 'A beautiful gold-plated necklace with a minimalist design.',
    price: 89.99,
    discountPrice: 74.99,
    brand: 'LuxuryJewels',
    stock: 100,
    category: 'Jewelry & Watches',
    images: [
      {
        url: 'https://picsum.photos/id/340/800',
        altText: 'Gold-Plated Necklace displayed on a jewelry stand',
      },
      {
        url: 'https://picsum.photos/id/341/800',
        altText: 'Gold-Plated Necklace worn by a model',
      },
    ],
    status: 'Active',
    sku: 'GPN1001',
    sizes: [],
    colors: ['Gold'],
    collectionId: 'collectionId21', // Reference to the collection ID
    material: 'Gold-Plated Stainless Steel',
    careInstructions: 'Keep away from moisture and store in a jewelry box.',
    gender: 'Female',
    attributes: {
      Length: ['18 inches'],
      Clasp: ['Lobster Claw'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 75,
    tags: ['necklace', 'jewelry', 'gold'],
    user: 'ObjectId_of_User',
    metaTitle: 'Gold-Plated Necklace - LuxuryJewels',
    metaDescription:
      'A delicate and stylish gold-plated necklace for special occasions.',
    metaKeywords: 'necklace, jewelry, gold-plated',
    dimensions: {
      length: '18 inches',
      width: '0.5 inches',
    },
    weight: 100,
    reviews: [
      {
        name: 'Sophia Lee',
        rating: 5,
        comment: 'Absolutely love this necklace! Looks stunning.',
      },
    ],
  },
  {
    name: 'Luxury Chronograph Watch',
    description: 'A high-end chronograph watch with a stainless steel band.',
    price: 299.99,
    discountPrice: 259.99,
    brand: 'TimeMaster',
    stock: 80,
    category: 'Jewelry & Watches',
    images: [
      {
        url: 'https://picsum.photos/id/342/800',
        altText: 'Luxury Chronograph Watch in silver',
      },
      {
        url: 'https://picsum.photos/id/343/800',
        altText: 'Close-up of the watch face',
      },
    ],
    status: 'Active',
    sku: 'LCW2001',
    sizes: [],
    colors: ['Silver', 'Black'],
    collectionId: 'collectionId22', // Reference to the collection ID
    material: 'Stainless Steel',
    careInstructions: 'Avoid water and clean with a soft cloth.',
    gender: 'Male',
    attributes: {
      WaterResistance: ['100 meters'],
      Movement: ['Quartz'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.9,
    numReviews: 90,
    tags: ['watch', 'chronograph', 'luxury'],
    user: 'ObjectId_of_User',
    metaTitle: 'Luxury Chronograph Watch - TimeMaster',
    metaDescription: 'A premium stainless steel chronograph watch.',
    metaKeywords: 'watch, luxury, chronograph',
    dimensions: {
      length: '1.75 inches',
      width: '1.75 inches',
    },
    weight: 250,
    reviews: [
      {
        name: 'Michael Davis',
        rating: 5,
        comment: 'Looks and feels amazing on the wrist!',
      },
    ],
  },

  {
    name: 'Luxury Car Air Freshener',
    description: 'Long-lasting luxury car air freshener with a premium scent.',
    price: 9.99,
    discountPrice: 7.99,
    brand: 'FreshRide',
    stock: 500,
    category: 'Automotive',
    images: [
      {
        url: 'https://picsum.photos/id/332/800',
        altText: 'Luxury Car Air Freshener',
      },
      {
        url: 'https://picsum.photos/id/333/800',
        altText: 'Car Air Freshener in use',
      },
    ],
    status: 'Active',
    sku: 'CAF1001',
    sizes: [],
    colors: ['Black', 'White'],
    collectionId: 'collectionId23', // Reference to the collection ID
    material: 'Scented Gel',
    careInstructions: 'Replace every 30 days for best results.',
    gender: 'Unisex',
    attributes: {
      Scent: ['Vanilla', 'Lavender', 'Ocean Breeze'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.4,
    numReviews: 58,
    tags: ['car air freshener', 'scent', 'automotive'],
    user: 'ObjectId_of_User',
    metaTitle: 'Luxury Car Air Freshener - FreshRide',
    metaDescription:
      'Long-lasting luxury car air freshener with a premium scent.',
    metaKeywords: 'car air freshener, scent, automotive',
    dimensions: {
      length: '2 inches',
      width: '2 inches',
    },
    weight: 100,
    reviews: [
      {
        name: 'Laura Smith',
        rating: 5,
        comment: 'Smells amazing and lasts a long time!',
      },
    ],
  },
  {
    name: 'Universal Car Phone Mount',
    description:
      'Sturdy and adjustable car phone mount for hands-free navigation.',
    price: 19.99,
    discountPrice: 15.99,
    brand: 'DriveSafe',
    stock: 300,
    category: 'Automotive',
    images: [
      {
        url: 'https://picsum.photos/id/330/800',
        altText: 'Universal Car Phone Mount',
      },
      {
        url: 'https://picsum.photos/id/331/800',
        altText: 'Car Phone Mount in use',
      },
    ],
    status: 'Active',
    sku: 'CPM1001',
    sizes: [],
    colors: ['Black', 'Silver'],
    collectionId: 'collectionId24', // Reference to the collection ID
    material: 'Plastic and Metal',
    careInstructions: 'Wipe with a damp cloth.',
    gender: 'Unisex',
    attributes: {
      Fit: ['Universal'],
      Adjustable: ['Yes'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.5,
    numReviews: 64,
    tags: ['car phone mount', 'hands-free', 'automotive'],
    user: 'ObjectId_of_User',
    metaTitle: 'Universal Car Phone Mount - DriveSafe',
    metaDescription:
      'Sturdy and adjustable car phone mount for hands-free navigation.',
    metaKeywords: 'car phone mount, hands-free, automotive',
    dimensions: {
      length: '6 inches',
      width: '3 inches',
    },
    weight: 300,
    reviews: [
      {
        name: 'Mike Thompson',
        rating: 4,
        comment: 'Holds my phone securely, great value for money.',
      },
    ],
  },
  {
    name: 'Premium Car Wax and Polish Kit',
    description: 'Complete car wax and polish kit for a showroom shine.',
    price: 39.99,
    discountPrice: 34.99,
    brand: 'ShinePro',
    stock: 200,
    category: 'Automotive',
    images: [
      {
        url: 'https://picsum.photos/id/328/800',
        altText: 'Premium Car Wax and Polish Kit',
      },
      {
        url: 'https://picsum.photos/id/329/800',
        altText: 'Car Wax and Polish Kit in use',
      },
    ],
    status: 'Active',
    sku: 'CWPK1001',
    sizes: [],
    colors: [],
    collectionId: 'collectionId25', // Reference to the collection ID
    material: 'Synthetic Wax',
    careInstructions: 'Apply with a microfiber cloth, buff to a shine.',
    gender: 'Unisex',
    attributes: {
      WaterResistant: ['Yes'],
      UVProtection: ['Yes'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.9,
    numReviews: 105,
    tags: ['car wax', 'polish kit', 'car care'],
    user: 'ObjectId_of_User',
    metaTitle: 'Premium Car Wax and Polish Kit - ShinePro',
    metaDescription: 'Complete car wax and polish kit for a showroom shine.',
    metaKeywords: 'car wax, polish kit, car care',
    dimensions: {
      length: '10 inches',
      width: '6 inches',
    },
    weight: 1500,
    reviews: [
      {
        name: 'Emily Carter',
        rating: 5,
        comment: 'My car has never looked better!',
      },
    ],
  },
  {
    name: 'Ultra-Bright LED Headlight Bulbs',
    description:
      'High-performance LED headlight bulbs for improved visibility and style.',
    price: 59.99,
    discountPrice: 49.99,
    brand: 'LuxBeam',
    stock: 150,
    category: 'Automotive',
    images: [
      {
        url: 'https://picsum.photos/id/326/800',
        altText: 'Ultra-Bright LED Headlight Bulbs',
      },
      {
        url: 'https://picsum.photos/id/327/800',
        altText: 'LED Headlight Bulbs installed in a car',
      },
    ],
    status: 'Active',
    sku: 'LED2001',
    sizes: [],
    colors: ['White', 'Blue'],
    collectionId: 'collectionId26', // Reference to the collection ID
    material: 'Aluminum',
    careInstructions: 'Handle with care, avoid touching the bulb surface.',
    gender: 'Unisex',
    attributes: {
      Fit: ['Universal'],
      Brightness: ['6000K'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.6,
    numReviews: 78,
    tags: ['LED headlights', 'car bulbs', 'automotive'],
    user: 'ObjectId_of_User',
    metaTitle: 'Ultra-Bright LED Headlight Bulbs - LuxBeam',
    metaDescription:
      'High-performance LED headlight bulbs for improved visibility and style.',
    metaKeywords: 'LED headlights, car bulbs, automotive',
    dimensions: {
      length: '4 inches',
      width: '2 inches',
    },
    weight: 500,
    reviews: [
      {
        name: 'John Doe',
        rating: 4,
        comment: 'Great brightness, easy to install.',
      },
    ],
  },
  {
    name: 'All-Weather Car Floor Mats',
    description:
      'Durable and easy-to-clean all-weather car floor mats for maximum protection.',
    price: 89.99,
    discountPrice: 79.99,
    brand: 'AutoShield',
    stock: 120,
    category: 'Automotive',
    images: [
      {
        url: 'https://picsum.photos/id/324/800',
        altText: 'All-Weather Car Floor Mats in a car',
      },
      {
        url: 'https://picsum.photos/id/325/800',
        altText: 'Close-up of All-Weather Car Floor Mats',
      },
    ],
    status: 'Active',
    sku: 'AWM1001',
    sizes: [],
    colors: ['Black', 'Gray'],
    collectionId: 'collectionId27', // Reference to the collection ID
    material: 'Rubber',
    careInstructions: 'Rinse with water and mild soap.',
    gender: 'Unisex',
    attributes: {
      Fit: ['Universal'],
      WaterResistant: ['Yes'],
    },
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 92,
    tags: ['car floor mats', 'all-weather', 'automotive'],
    user: 'ObjectId_of_User',
    metaTitle: 'All-Weather Car Floor Mats - AutoShield',
    metaDescription:
      'Durable and easy-to-clean all-weather car floor mats for maximum protection.',
    metaKeywords: 'car floor mats, all-weather, automotive',
    dimensions: {
      length: '36 inches',
      width: '18 inches',
    },
    weight: 2500,
    reviews: [
      {
        name: 'Sarah Johnson',
        rating: 5,
        comment: 'Perfect fit and great quality!',
      },
    ],
  },

  // Add more products for the remaining categories
]

module.exports = products
