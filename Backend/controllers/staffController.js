import Staff from '../models/staffModel.js';

const createStaff = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if staff already exists
      let staff = await Staff.findOne({ email });
  
      if (staff) {
        return res.status(400).json({ message: 'Staff with this email already exists' });
      }
  
      // Create new staff with hashed password
      staff = new Staff({
        name,
        email,
        password, // password will be hashed before saving due to the pre-save hook
      });
  
      await staff.save();
      res.status(201).json({ message: 'Staff created successfully', staff });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  
  

// Log staff login
const staffLogin = async (req, res) => {
  try {
    const { email } = req.body;

    // Find staff by email
    let staff = await Staff.findOne({ email });

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    // Update the last login time
    staff.lastLogin = new Date();
    await staff.save();

    res.status(200).json({ message: 'Staff logged in successfully', staff });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update online duration (should be called periodically to track time)
const updateOnlineDuration = async (req, res) => {
  try {
    const { email, duration } = req.body; // Duration in seconds (sent from the client side)

    // Find staff by email
    let staff = await Staff.findOne({ email });

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    // Update the online duration
    staff.onlineDuration += duration; // Add the new duration
    await staff.save();

    res.status(200).json({ message: 'Staff online duration updated', staff });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get staff information
const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


export {getStaff,staffLogin,updateOnlineDuration,createStaff}