import validator from "validator"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import doctorsModel from '../models/doctorsModel.js'
import doctorModel from "../models/doctorsModel.js";
import cloudinary from 'cloudinary';
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";


// Access the 'vs' property if it exists on the cloudinary object
const { vs } = cloudinary;


const addDoctor = async (req, res) => {
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
            !medicalLicenseFile || !diplomaCertificatesFile || !proofOfIDFile || !imageFile) {
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
        const newDoctor = new doctorsModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};







const loginAdmin = async (req,res) => {
    try{
        const {email,password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        } else{
            res.json({success:false,message:"Invalid credentials"})
        }
        
    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Api to get all doctors list for admin panel
const allDoctors = async (req,res) => {
    try{
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}



const appointmentsAdmin = async (req,res) => {
    try{
        const appointments = await appointmentModel.find({})
        res.json({success:true, appointments})
    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const appointmentCancel = async (req,res)=>{
    try{
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

      
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        const {docId,slotDate,slotTime} = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success:true,message:'Appointment Cancelled'})

    }catch(error){
        console.log(error)
    }
}



const adminDashboard = async (req,res) => {
    try{
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors : doctors.length,
            appointments:appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})
    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel, adminDashboard}