const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

const products = [
  // VEGETABLES & FRUITS
  { name: "Fresh Tomatoes 500g", category: "Vegetables", price: 45, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400", stock: 100 },
  { name: "Bananas 1 dozen", category: "Fruits", price: 55, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400", stock: 100 },
  { name: "Red Apples 1kg", category: "Fruits", price: 120, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400", stock: 100 },
  
  // SPORTS
  { name: "Sports T-Shirt Men", category: "Sports", price: 499, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", stock: 50 },
  { name: "Running Shoes", category: "Sports", price: 1999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", stock: 30 },
  { name: "Gym Dumbbells 5kg", category: "Sports", price: 1299, image: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?w=400", stock: 20 },
  { name: "Yoga Mat", category: "Sports", price: 699, image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400", stock: 40 },
  { name: "Football", category: "Sports", price: 899, image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400", stock: 25 },
  
  // CLOTHING
  { name: "Men's Cotton Hoodie", category: "Clothing", price: 999, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", stock: 60 },
  { name: "Women's Summer Dress", category: "Clothing", price: 1299, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae442?w=400", stock: 40 },
  { name: "Denim Jeans", category: "Clothing", price: 1499, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400", stock: 50 },
  { name: "Kids T-Shirt Pack", category: "Clothing", price: 599, image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400", stock: 70 },

  // HOME & KITCHEN (nuvvu chupinchinavi)
  { name: "Kitchen Storage Jars Set", category: "Home", price: 450, image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400", stock: 100 },
  { name: "Reusable Water Bottle", category: "Home", price: 299, image: "https://images.unsplash.com/photo-1523369364227-249b4a2aedae?w=400", stock: 100 },
  { name: "Ceramic Coffee Mug", category: "Home", price: 199, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400", stock: 100 },

  // TOYS & KIDS
  { name: "Building Blocks Toy", category: "Toys", price: 699, image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400", stock: 50 },
  { name: "Soft Teddy Bear", category: "Toys", price: 499, image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400", stock: 40 },

  // ELECTRONICS
  { name: "Wireless Earbuds", category: "Electronics", price: 1299, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400", stock: 30 },
  { name: "Smart Mobile Phone", category: "Electronics", price: 14999, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400", stock: 15 },
  { name: "Smart Watch", category: "Electronics", price: 2499, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", stock: 25 },
  { name: "Bluetooth Speaker", category: "Electronics", price: 999, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e4?w=400", stock: 35 },

  // DAIRY & BAKERY
  { name: "Fresh Milk 1L", category: "Dairy", price: 58, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400", stock: 100 },
  { name: "Farm Eggs 12pcs", category: "Dairy", price: 90, image: "https://images.unsplash.com/photo-1485145780529-390cf7d60f26?w=400", stock: 100 },
  { name: "Brown Bread", category: "Bakery", price: 40, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400", stock: 100 },
  { name: "Chocolate Cookies", category: "Bakery", price: 120, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400", stock: 80 },
  { name: "Potatoes 1kg", category: "Vegetables", price: 32, image: "https://images.unsplash.com/photo-1518977676608-bd36c2ca4f0d?w=400", stock: 100 },
  { name: "Green Capsicum 500g", category: "Vegetables", price: 60, image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400", stock: 100 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✅ ${products.length} Products Seeded - Sports, Clothing, Electronics, Grocery All Restored!`);
    process.exit(0);
  } catch (e) { console.error(e); process.exit(1); }
}
seed();