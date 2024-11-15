import Blog from '../models/blogModel.js';
import { v2 as cloudinaryV2 } from 'cloudinary';

// Function to upload the image to Cloudinary
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinaryV2.uploader.upload(file.path, {
      resource_type: 'image', // Specify that the file is an image
    });
    return result.secure_url; // Return the Cloudinary URL
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
};

// Create Blog Controller
const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Check if the required fields are provided
    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Title, content, and author are required' });
    }

    // Upload image if provided
    let imageUrl = ''; // Default to empty string if no image is provided
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file);
    }

    // Create a new blog entry
    const newBlog = new Blog({ title, content, author, imageUrl });
    await newBlog.save();

    return res.status(201).json({ message: 'Blog created successfully', newBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    return res.status(500).json({ error: 'Failed to create blog' });
  }
};


// Get All Blogs Controller
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

// Delete Blog Controller
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return res.status(500).json({ error: 'Failed to delete blog' });
  }
};

// Export all controllers at once
export {
  createBlog,
  getBlogs,
  deleteBlog,
};
