const mongoose = require('mongoose');
const User = require('../models/user.model'); // Adjust the path based on your project structure

const seedDatabase = async () => {
  try {
    // Connect to your MongoDB
    await mongoose.connect(
      'mongodb+srv://bhupendrakushwah977:Kwe85Kj1J0od4i32@portfolio.u79k4.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Portfolio',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );    

    console.log('Connected to MongoDB');

    // Define seed data
    const seedData = [
      {
        name: "Bhupendra Kushwah",
        password: "$2a$12$FKeofwctaM5fgCT61mvMLuAJXl7WWWyTmujnyxmSRT2R6eJRnjeIi", // Pre-hashed password
        street: "Pinto Park",
        city: "Morar",
        state: "Madhya Pradesh",
        zip_code: "474006",
        contactEmail: "bhupendrakushwah977@gmail.com",
        experience: 1,
        projectsCount: 2,
        jobTitle: "Full stack Developer",
        jobBrief: `I design and develop services for customers specializing in creating stylish, modern websites, web services, and online stores. My passion is to design digital user experiences.
    
    I design and develop services for customers specializing in creating stylish, modern websites, web services.`,
        image: "https://res.cloudinary.com/dmj6kmhrd/image/upload/v1735472567/tjny2ufbs1evfzjgmrsx.jpg",
        resume: "https://res.cloudinary.com/dmj6kmhrd/image/upload/v1735472568/pfowxdwffyuctvukjv7f.pdf",
        isActive: true,
        socialLinks: {
          github: "https://chatgpt.com/c/6766f055-7e4c-8001-8b14-6c208216fa6e",
          linkedIn: "https://chatgpt.com/c/6766f055-7e4c-8001-8b14-6c208216fa6e",
          x: "https://chatgpt.com/c/6766f055-7e4c-8001-8b14-6c208216fa6e",
          instagram: "https://chatgpt.com/c/6766f055-7e4c-8001-8b14-6c208216fa6e",
        },
      },
    ];

    // Insert seed data into the database
    await User.insertMany(seedData);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
