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
    const { title, content, author, imageUrl } = req.body;

    // Check if the required fields are provided
    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Title, content, and author are required' });
    }

    let image = '';
    
    // If an image file is uploaded, use Cloudinary to get the URL
    if (req.file) {
      image = await uploadToCloudinary(req.file); // Upload file to Cloudinary
    } else if (imageUrl) {
      // If an image URL is provided in the body, use that URL
      image = imageUrl;
    }

    // Create a new blog entry
    const newBlog = new Blog({ title, content, author, imageUrl: image });
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
