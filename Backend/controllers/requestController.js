import Request from '../models/requestModal.js';  

// Create a new request
const createRequest = async (req, res) => {
  try {
    const { username, userEmail, userMessage } = req.body;

    // Validate input fields
    if (!username || !userEmail || !userMessage) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new Request document
    const newRequest = new Request({
      username,
      userEmail,
      userMessage,
      botResponse: 'I am here to help!',  // You can modify this logic
    });

    // Save the new request to the database
    await newRequest.save();

    return res.status(201).json({
      message: 'Request created successfully.',
      data: newRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error, please try again later.' });
  }
};

// Delete a request by ID
const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the request by ID and delete it
    const request = await Request.findByIdAndDelete(id);

    // Check if the request was found and deleted
    if (!request) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    return res.status(200).json({
      message: 'Request deleted successfully.',
      data: request,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error, please try again later.' });
  }
};

// Get all requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();

    if (requests.length === 0) {
      return res.status(404).json({ error: 'No requests found.' });
    }

    return res.status(200).json({
      message: 'Requests retrieved successfully.',
      data: requests,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error, please try again later.' });
  }
};

// Get a request by ID
const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    return res.status(200).json({
      message: 'Request retrieved successfully.',
      data: request,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error, please try again later.' });
  }
};

export { createRequest, deleteRequest, getAllRequests, getRequestById };
