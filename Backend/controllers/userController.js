import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import cloudinary from 'cloudinary';
import doctorModel from "../models/doctorsModel.js";
import appointmentModel from "../models/appointmentModel.js";

// Access the 'vs' property if it exists on the cloudinary object
const { vs } = cloudinary;


const registerUser = async (req,res) => {
    try{
        const {name, email, password} = req.body

        if(!name || !password || !email){
            return res.json({success:false,message:"Missing Details"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"enter a vaild email"})
        }
        
        if(password.lenght < 0){
            return res.json({success:false,message:"enter a strong email"})
        }


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
    
        const userData = {
            name,
            email,
            password: hashedPassword
        }
    
        const newUser = new userModel(userData)
        const user = await newUser.save()
    
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
    
        res.json({success:true,token})
    

    } catch (error){

}

}


const loginUser = async (req,res) => {
    try{
        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
          return res.json({success:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true,token})
        } else{
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}



const getProfile = async (req,res) => {
    try{
        const {userId} = req.body
        const userData = await userModel.findById(userId).select('-password')
        
        res.json({success:true,userData})
    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}



const updateProfile = async (req,res) => {
    try{
        const {userId,name,phone,address,dob,gender} = req.body
        const imageFile = req.file

        if(!name || !phone || !dob || !gender){
            return res.json({success:false,message:"Data Missing"})
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
        
        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageUrl})

        }

        res.json({success:true,message:"Profile Updated"})


    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        // Fetch doctor data, excluding password field
        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" });
        }

        // Ensure `slots_booked` exists in doctor data
        let slots_booked = docData.slots_booked || {};

        // Check if the specific date is already booked
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime); // Add slot to the existing array
            }
        } else {
            slots_booked[slotDate] = [slotTime]; // Initialize the array with the new slot
        }

        // Fetch user data, excluding password field
        const userData = await userModel.findById(userId).select('-password');
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Remove `slots_booked` from docData as it's not needed in the appointment
        delete docData.slots_booked;

        // Prepare appointment data
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            data: Date.now() // Use `Date.now()` for timestamp
        };

        // Create a new appointment
        const newAppointment = new appointmentModel(appointmentData);

        // Save new appointment to the database
        await newAppointment.save();

        // Update the doctor's available slots in the database
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        // Respond with success
        res.json({ success: true, message: "Appointment Booked", appointment: appointmentData });

    } catch (error) {
        console.error("Error occurred while booking appointment:", error);
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
    }
};

const listAppointment = async (req, res) => {
    try {
      const { userId } = req.params; // Accessing `userId` from the query string
  
      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }
  
      // Find appointments for the user
      const appointments = await appointmentModel.find({ userId });
  
      if (appointments.length === 0) {
        return res.json({ success: false, message: "No appointments found" });
      }
  
      res.json({ success: true, appointments });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ success: false, message: "An error occurred while fetching appointments" });
    }
  };
  

const cancelAppointment = async (req,res)=>{
    try{
        const {userId,appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData.userId !== userId){
            return res.json({success:false,message:'Unauthorized action'})
        }

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

export {registerUser,loginUser,getProfile,updateProfile, bookAppointment, listAppointment, cancelAppointment}