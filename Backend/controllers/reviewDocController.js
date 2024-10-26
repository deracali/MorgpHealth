import cloudinary from 'cloudinary';
import bcrypt from 'bcrypt'; // Ensure bcrypt is imported for password hashing
import ReviewdoctorModel from "../models/ReviewDocModel.js"; // Adjust the import according to your structure

// Access the 'vs' property if it exists on the cloudinary object
const { vs } = cloudinary;

const ReviewDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            speciality, // This will be an array of strings
            degree,
            experience,
            about,
            fees,
            address,
            dateOfBirth,
            gender, // Added gender
            region,  // Added region
            universityName,
            universityCountry,
            medicalCouncilName,
            medicalCouncilCountry,
            graduationYear
        } = req.body;

        const imageFile = req.files['image'] ? req.files['image'][0] : null; // Doctor's profile image
        const medicalLicenseFile = req.files['medicalLicense'] ? req.files['medicalLicense'][0] : null; // Medical license image
        const diplomaCertificatesFile = req.files['diplomaCertificates'] ? req.files['diplomaCertificates'][0] : null; // Diploma certificates image
        const proofOfIDFile = req.files['proofOfID'] ? req.files['proofOfID'][0] : null; // Proof of ID image

        // Validate required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address ||
            !medicalLicenseFile || !diplomaCertificatesFile || !proofOfIDFile || !imageFile || !gender || !region) { // Added gender and region to validation
            return res.json({ success: false, message: "Missing Details" });
        }

        // Additional validations
        if (!Array.isArray(speciality)) {
            return res.json({ success: false, message: "Speciality must be an array" });
        }

        // Validate email format, password strength, etc. (you can add your own logic here)

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload images to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const medicalLicenseUpload = await cloudinary.uploader.upload(medicalLicenseFile.path, { resource_type: "image" });
        const medicalLicenseUrl = medicalLicenseUpload.secure_url;

        const diplomaCertificatesUpload = await cloudinary.uploader.upload(diplomaCertificatesFile.path, { resource_type: "image" });
        const diplomaCertificatesUrl = diplomaCertificatesUpload.secure_url;

        const proofOfIDUpload = await cloudinary.uploader.upload(proofOfIDFile.path, { resource_type: "image" });
        const proofOfIDUrl = proofOfIDUpload.secure_url;

        // Create doctor data object
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword, // Now the hashed password is included
            speciality, // This is an array
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
            dateOfBirth,
            gender, // Added gender to the doctor data
            region,  // Added region to the doctor data
            universityName,
            universityCountry,
            medicalCouncilName,
            medicalCouncilCountry,
            graduationYear,
            medicalLicense: medicalLicenseUrl,
            diplomaCertificates: diplomaCertificatesUrl,
            proofOfID: proofOfIDUrl
        };

        // Save new doctor to the database
        const newDoctor = new ReviewdoctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { ReviewDoctor };
