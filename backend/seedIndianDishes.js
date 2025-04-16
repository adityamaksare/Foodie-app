import mongoose from 'mongoose';
import 'dotenv/config';
import foodModel from './models/foodModel.js';

const indianDishes = [
    // Salad
    {
        name: "Greek Salad",
        description: "Fresh salad with feta cheese and olives",
        price: 199,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
        category: "Salad"
    },
    {
        name: "Caesar Salad",
        description: "Classic salad with romaine lettuce and croutons",
        price: 179,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
        category: "Salad"
    },

    // Rolls
    {
        name: "Chicken Roll",
        description: "Spicy chicken wrapped in flatbread",
        price: 149,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
        category: "Rolls"
    },
    {
        name: "Veg Roll",
        description: "Vegetable filling wrapped in flatbread",
        price: 129,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
        category: "Rolls"
    },

    // Deserts
    {
        name: "Gulab Jamun",
        description: "Sweet milk dumplings in sugar syrup",
        price: 79,
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814",
        category: "Deserts"
    },
    {
        name: "Rasmalai",
        description: "Soft cottage cheese patties in sweet milk sauce",
        price: 89,
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814",
        category: "Deserts"
    },

    // Sandwich
    {
        name: "Club Sandwich",
        description: "Triple-decker sandwich with chicken and vegetables",
        price: 199,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
        category: "Sandwich"
    },
    {
        name: "Veg Sandwich",
        description: "Fresh vegetables between toasted bread",
        price: 149,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
        category: "Sandwich"
    },

    // Cake
    {
        name: "Chocolate Cake",
        description: "Rich chocolate cake with ganache",
        price: 299,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
        category: "Cake"
    },
    {
        name: "Vanilla Cake",
        description: "Classic vanilla cake with buttercream",
        price: 249,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
        category: "Cake"
    },

    // Pure Veg
    {
        name: "Paneer Butter Masala",
        description: "Cottage cheese in rich tomato gravy",
        price: 249,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        category: "Pure Veg"
    },
    {
        name: "Dal Makhani",
        description: "Creamy black lentils with butter",
        price: 199,
        image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6",
        category: "Pure Veg"
    },

    // Pasta
    {
        name: "Alfredo Pasta",
        description: "Creamy pasta with parmesan cheese",
        price: 249,
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
        category: "Pasta"
    },
    {
        name: "Arrabbiata Pasta",
        description: "Spicy tomato pasta",
        price: 229,
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
        category: "Pasta"
    },

    // Noodles
    {
        name: "Hakka Noodles",
        description: "Stir-fried noodles with vegetables",
        price: 199,
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
        category: "Noodles"
    },
    {
        name: "Schezwan Noodles",
        description: "Spicy Chinese-style noodles",
        price: 219,
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
        category: "Noodles"
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing food items
        await foodModel.deleteMany({});
        console.log('Cleared existing food items');

        // Insert new Indian dishes
        await foodModel.insertMany(indianDishes);
        console.log('Successfully seeded Indian dishes');

        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase(); 