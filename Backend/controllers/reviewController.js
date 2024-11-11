import fs from 'fs';
import cloudinary from 'cloudinary'; 
import bcrypt from 'bcrypt';
import ReviewdocModel from "../models/ReviewSchema.js";

const { v2: cloudinaryV2 } = cloudinary; // Ensure you're using the correct v2 instance


const uploadImage = async (file) => {
  if (!file) return null;

  // Check if the input is a URI from Expo Image Picker
  if (file.startsWith('file://')) {
    const filePath = file.replace('file://', ''); // Remove 'file://' prefix

    try {
      // Read the file as a buffer
      const fileBuffer = fs.readFileSync(filePath);

      // Upload the buffer to Cloudinary
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinaryV2.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return reject(error);
            }
            resolve(result.secure_url);
          }
        );
        uploadStream.end(fileBuffer);
      });
    } catch (err) {
      console.error('Error reading file:', err);
      return null;
    }
  }

  // Handle base64 string upload
  if (typeof file === 'string' && file.startsWith('data:image')) {
    const uploadResult = await cloudinaryV2.uploader.upload(file, { resource_type: 'image' });
    return uploadResult.secure_url;
  }

  // Handle URLs (e.g., Google Images or other URLs)
  if (typeof file === 'string' && file.startsWith('http')) {
    try {
      const response = await axios.get(file, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');

      return new Promise((resolve, reject) => {
        const uploadStream = cloudinaryV2.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return reject(error);
            }
            resolve(result.secure_url);
          }
        );
        uploadStream.end(buffer);
      });
    } catch (error) {
      console.error('Error downloading image:', error);
      return null;
    }
  }

  return null;
};

// Controller function
const ReviewController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      docaddress,
      age,
      gender,
      region,
      universityName,
      universityCountry,
      medicalCouncilName,
      medicalCouncilCountry,
      graduationYear,
      balance,
      image: imageFromBody,
      medicalLicense: medicalLicenseFromBody,
      diplomaCertificates: diplomaCertificatesFromBody,
      proofOfID: proofOfIDFromBody
    } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Destructure files from req.files (if they exist)
    const { image, medicalLicense, diplomaCertificates, proofOfID } = req.files || {};

    // Define a placeholder image URL
    const placeholderImageUrl = 'https://example.com/placeholder-image.jpg';

    // Upload files if they exist, otherwise use strings from req.body
    const imageUrl = await uploadImage(image ? image[0] : imageFromBody) || placeholderImageUrl;
    const medicalLicenseUrl = await uploadImage(medicalLicense ? medicalLicense[0] : medicalLicenseFromBody) || null;
    const diplomaCertificatesUrl = await uploadImage(diplomaCertificates ? diplomaCertificates[0] : diplomaCertificatesFromBody) || null;
    const proofOfIDUrl = await uploadImage(proofOfID ? proofOfID[0] : proofOfIDFromBody) || null;

    // Create doctor data object
    const doctorData = {
      name: name || null,
      email: email || null,
      password: hashedPassword,
      speciality: speciality || null,
      degree: degree || null,
      experience: experience || null,
      about: about || null,
      fees: fees || null,
      address: address || null,
      docaddress: docaddress || null,
      age: age || null,
      gender: gender || null,
      region: region || null,
      universityName: universityName || null,
      universityCountry: universityCountry || null,
      medicalCouncilName: medicalCouncilName || null,
      medicalCouncilCountry: medicalCouncilCountry || null,
      graduationYear: graduationYear || null,
      image: imageUrl,
      medicalLicense: medicalLicenseUrl,
      diplomaCertificates: diplomaCertificatesUrl,
      proofOfID: proofOfIDUrl,
      balance: balance || 0
    };

    // Save the new doctor to the database
    const newDoctor = new ReviewdocModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: 'Doctor added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



  


const getAllReviewDocs = async (req, res) => {
    try {
        const reviewDocs = await ReviewdocModel.find();
        res.json({ success: true, reviewDocs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const getSingleReviewDoc = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the review document by ID
      const reviewDoc = await ReviewdocModel.findById(id);
  
      // Check if the document was found
      if (!reviewDoc) {
        return res.status(404).json({ success: false, message: 'Doctor not found' });
      }
  
      res.json({ success: true, reviewDoc });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error fetching doctor', error: error.message });
    }
  };
  



const deleteReviewDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params; // Assuming doctorId is provided in the request URL

        // Find the doctor document by ID
        const doctor = await ReviewdocModel.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Delete images from Cloudinary if URLs exist
        const deleteImageFromCloudinary = async (url) => {
            if (!url) return;
            const publicId = url.split('/').pop().split('.')[0]; // Extract Cloudinary public ID from URL
            await cloudinaryV2.uploader.destroy(publicId, { resource_type: 'image' });
        };

        // Delete each uploaded image
        await deleteImageFromCloudinary(doctor.image);
        await deleteImageFromCloudinary(doctor.medicalLicense);
        await deleteImageFromCloudinary(doctor.diplomaCertificates);
        await deleteImageFromCloudinary(doctor.proofOfID);

        // Remove the doctor document from the database
        await ReviewdocModel.findByIdAndDelete(doctorId);

        res.json({ success: true, message: "Doctor deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { ReviewController, deleteReviewDoctor,getAllReviewDocs, getSingleReviewDoc };
