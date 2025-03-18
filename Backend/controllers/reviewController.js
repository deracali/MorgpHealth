import fs from 'fs';
import cloudinary from 'cloudinary'; 
import bcrypt from 'bcrypt';
import path from "path"
import ReviewdocModel from "../models/ReviewSchema.js";
import hospitalModel from "../models/hospitalsModel.js"

const { v2: cloudinaryV2 } = cloudinary; // Ensure you're using the correct v2 instance

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
      phone,
      pin,
      address,
      docaddress,
      age, // Users input Date of Birth here
      gender,
      region,
      services,
      universityName,
      universityCountry,
      medicalCouncilName,
      medicalCouncilCountry,
      graduationYear,
      balance,
      paymentMethods,
      hospitalId
    } = req.body;

    // 🔹 Manually filter files to ensure correct assignment
    const filteredFiles = {
      image: req.files?.find(file => file.fieldname === "image"),
      medicalLicense: req.files?.find(file => file.fieldname === "medicalLicense"),
      diplomaCertificates: req.files?.find(file => file.fieldname === "diplomaCertificates"),
      proofOfID: req.files?.find(file => file.fieldname === "proofOfID")
    };

    // Check if email already exists
    const existingDoctor = await ReviewdocModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Placeholder image URL
    const placeholderImageUrl = "https://example.com/placeholder-image.jpg";

    // 🔹 Function to Upload Files to Cloudinary
    const uploadToCloudinary = async (file) => {
      if (!file) return null; // If no file, return null

      try {
        if (file.path) {
          const absolutePath = path.resolve(file.path); // ✅ Ensure absolute path
          console.log("Uploading file to Cloudinary:", absolutePath);
          const uploadResult = await cloudinaryV2.uploader.upload(absolutePath, { resource_type: "image" });
          return uploadResult.secure_url;
        }

        if (typeof file === "string" && file.startsWith("http")) return file; // If already a URL

        if (typeof file === "string" && file.startsWith("data:image")) {
          const uploadResult = await cloudinaryV2.uploader.upload(file, { resource_type: "image" });
          return uploadResult.secure_url;
        }

        return null;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return null;
      }
    };

    // 🔹 Upload Images with Correct Paths
    const imageUrl = await uploadToCloudinary(filteredFiles.image) || placeholderImageUrl;
    const medicalLicenseUrl = await uploadToCloudinary(filteredFiles.medicalLicense);
    const diplomaCertificatesUrl = await uploadToCloudinary(filteredFiles.diplomaCertificates);
    const proofOfIDUrl = await uploadToCloudinary(filteredFiles.proofOfID);

    // 🔹 Parse Payment Methods
    let parsedPaymentMethods = [];
    if (paymentMethods) {
      try {
        parsedPaymentMethods = typeof paymentMethods === "string" ? JSON.parse(paymentMethods) : paymentMethods;
        if (!Array.isArray(parsedPaymentMethods)) throw new Error("Invalid paymentMethods format");
      } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid paymentMethods format" });
      }
    }

    // Convert user input (age) to a Date (date of birth)
    const dateOfBirth = age ? new Date(age) : null;

    // 🔹 Create Doctor Data Object
    const doctorData = {
      name: name || null,
      email: email || null,
      password: hashedPassword,
      speciality: speciality || null,
      degree: degree || null,
      experience: experience || null,
      about: about || null,
      fees: fees || null,
      pin: pin || null,
      phone: phone || null,
      address: address || null,
      docaddress: docaddress || null,
      age: dateOfBirth, // Storing Date of Birth
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
      balance: balance || 0,
      services: services || [],
      paymentMethods: parsedPaymentMethods,
      hospital: hospitalId
    };

    // 🔹 Save Doctor to Database
    const newDoctor = new ReviewdocModel(doctorData);
    await newDoctor.save();
    console.log("Saved Doctor:", newDoctor);
    console.log("Received Files:", req.files);
    console.log("Request Body:", req.body);
    console.log("Uploaded Image URLs:", { imageUrl, medicalLicenseUrl, diplomaCertificatesUrl, proofOfIDUrl });

    res.json({ success: true, message: "Doctor Added and Assigned to Hospital Successfully" });
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
  

  const updateCancelledStatus = async (req, res) => {
    try {
        const { id } = req.params; // Extract doctor ID from request parameters

        // Update the cancelled field to true
        const updatedDoctor = await ReviewdocModel.findByIdAndUpdate(
            id,
            { cancelled: true },
            { new: true } // Return the updated document
        );

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({
            message: 'Doctor cancellation status updated successfully',
            data: updatedDoctor
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while updating the cancellation status',
            error: error.message
        });
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

export { ReviewController,updateCancelledStatus, deleteReviewDoctor,getAllReviewDocs, getSingleReviewDoc };
