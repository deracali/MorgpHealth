import WithdrawalModel from '../models/WithdrawalModel.js';

// Controller to add a new withdrawal
 const addWithdrawal = async (req, res) => {
  try {
    const {
      fullName,
      email,
      address,
      city,
      state,
      zipCode,
      amount,
      bankName,
      accountNumber,
      expMonth,
      expYear,
      cvv,
    } = req.body;

    // Check for missing fields
    if (
      !fullName ||
      !email ||
      !address ||
      !city ||
      !state ||
      !zipCode ||
      !bankName ||
      !amount ||
      !accountNumber ||
      !expMonth ||
      !expYear ||
      !cvv
    ) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Create a new withdrawal record
    const newWithdrawal = new WithdrawalModel({
      fullName,
      email,
      address,
      city,
      state,
      zipCode,
      bankName,
      amount,
      accountNumber,
      expMonth,
      expYear,
      cvv,
    });

    // Save the withdrawal record to the database
    await newWithdrawal.save();

    return res.status(201).json({ success: true, message: 'Withdrawal added successfully', data: newWithdrawal });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Controller to get a withdrawal by ID
 const getWithdrawal = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the withdrawal by its ID
    const withdrawal = await WithdrawalModel.findById(id);

    if (!withdrawal) {
      return res.status(404).json({ success: false, message: 'Withdrawal not found' });
    }

    return res.status(200).json({ success: true, data: withdrawal });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};




// Controller to get a withdrawal by ID
const getWithdrawalById = async (req, res) => {
    try {
      const { id } = req.params; // Extract the ID from the request parameters
  
      // Find the withdrawal by its ID
      const withdrawal = await WithdrawalModel.findById(id);
  
      // If no withdrawal is found, return a 404 response
      if (!withdrawal) {
        return res.status(404).json({ success: false, message: 'Withdrawal not found' });
      }
  
      // Return the found withdrawal
      return res.status(200).json({ success: true, data: withdrawal });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  

// Controller to delete a withdrawal by ID
 const deleteWithdrawal = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the withdrawal by its ID and remove it
    const withdrawal = await WithdrawalModel.findByIdAndDelete(id);

    if (!withdrawal) {
      return res.status(404).json({ success: false, message: 'Withdrawal not found' });
    }

    return res.status(200).json({ success: true, message: 'Withdrawal deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


export {getWithdrawal, addWithdrawal,getWithdrawalById, deleteWithdrawal}