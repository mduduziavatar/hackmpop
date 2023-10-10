const User = require('../models/User'); 
const bcrypt = require('bcrypt');


// Register a new user
const registerUser = async (req, res) => {
  try {
    // Parse and validate user registration data from the request
    const { username, email, password } = req.body;

    // Check if the provided username and email are unique
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash the user's password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database with the hashed password
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Return a success message or user object with a token for authentication
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Log in a user
const loginUser = async (req, res) => {
  try {
    // Parse and validate user login credentials from the request
    const { usernameOrEmail, password } = req.body;

    // Check if a user with the provided username or email exists in the database
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the hashed password in the database with the provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate an authentication token (you can use JWT or another method)
    const token = generateAuthToken(user);

    // Return the token and user information for future requests
    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    // Authenticate the user by verifying the provided token (you can use middleware for this)
    const user = req.user;

    // Parse and validate user profile update data from the request
    const { newUsername, newEmail } = req.body;

    // Update the user's profile information in the database
    user.username = newUsername;
    user.email = newEmail;
    await user.save();

    // Return a success message or the updated user profile
    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// You can add more functions for additional user operations as needed

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
};
