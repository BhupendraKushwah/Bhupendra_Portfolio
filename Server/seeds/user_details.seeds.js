const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
require('../configs/database.config')

const superadminSeed = async () => {
  try {
    let password = await bcrypt.hash('#Bhupendra2003',12);
    const existingAdmin = await User.findOne({password});
    if (existingAdmin) {
      console.log('Superadmin already exists');
      process.exit();
      return;
    }

    const superadminData = {
      password: '#Bhupendra2003',
      lastLogin: new Date(),
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(superadminData.password, 12);
    superadminData.password = hashedPassword;

    // Create a new superadmin user
    const superadmin = new User(superadminData);
    await superadmin.save();

    console.log('Superadmin added successfully!');
    process.exit();
  } catch (err) {
    console.error('Error adding superadmin:', err);
    process.exit(1);
  }
};

// Run the seed function
superadminSeed();
