import User from "../model/user.model.js";

// Create new user submission
export const createUser = async (req, res) => {
  try {
    const { name, socialMediaHandle } = req.body;
    const images = req.files.map((file) => file.path); // Store file paths

    const user = new User({
      name,
      socialMediaHandle,
      images,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Fetch all user submissions
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
