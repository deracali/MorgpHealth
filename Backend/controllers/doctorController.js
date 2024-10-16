import appointmentModel from '../models/appointmentModel.js'
import doctorModel from '../models/doctorsModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cloudinary from 'cloudinary';

// Access the 'vs' property if it exists on the cloudinary object
const { vs } = cloudinary;


const changeAvailablity = async (req,res) => {
    try{
        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({success:true,message:"Availability Changed"})
    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const doctorList = async (req,res) =>{
    try{
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
            res.json({ success: true, email, id: doctor._id, token }); // Include the doctor ID in the response
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



const appointmentsDoctor = async (req,res) =>{
    try{
        const { docId } = req.params;
        const appointments = await appointmentModel.find({docId})

        res.json({success:true,appointments})
    } catch(error){
        res.json({success:false,message:error.message})
    }
}


const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        // Find the appointment by ID
        const appointmentData = await appointmentModel.findById(appointmentId);

        // Check if the appointment exists and if it belongs to the doctor
        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }


        // Update the appointment status to completed
        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });

        return res.json({ success: true, message: 'Appointment completed' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.json({ success: false, message: error.message });
    }
};

const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        // Find the appointment by ID
        const appointmentData = await appointmentModel.findById(appointmentId);

        // Check if the appointment exists
        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        
        // Update the appointment status to cancelled
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        return res.json({ success: true, message: 'Appointment cancelled' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.json({ success: false, message: error.message });
    }
};



const doctorDashboard = async (req,res) => {
    try{
        const {docId} = req.params
        
        const appointments = await appointmentModel.find({docId})

        let earnings = 0;

        appointments.forEach((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount;
            }
        });
        

    let patients = []

    appointments.map((item)=>{
        if(!patients.includes(item.userId)){
            patients.push(item.userId)
        }
    })

    const dashData = {
        earnings,
        appointments:appointments.length,
        patients:patients.length,
        latestAppointments:appointments.reverse().slice(0,5)
    }

    res.json({success:true,dashData})

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}



const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.params;
        const profileData = await doctorModel.findById(docId).select('-password');

        if (!profileData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        res.json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const updateDoctorProfile = async (req, res) => {
    try {
        const { fees, address, available, balance } = req.body;
        const { docId } = req.params;

        // Create an update object that only includes the fields to be updated
        const updateFields = {};
        if (fees !== undefined) updateFields.fees = fees;
        if (address !== undefined) updateFields.address = address;
        if (available !== undefined) updateFields.available = available;

        // Increment the balance if it's provided
        if (balance !== undefined) {
            updateFields.$inc = { balance: balance }; // Increment balance
        }

        const updatedDoctor = await doctorModel.findByIdAndUpdate(
            docId, 
            updateFields, 
            { new: true } // Return the updated document
        );

        if (!updatedDoctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        res.json({ success: true, message: 'Profile updated', profileData: updatedDoctor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};




const updateAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params; // Assuming appointmentId is passed in the URL params
        const {
            userId,
            docId,
            slotDate,
            slotTime,
            amount,
            cancelled,
            payment,
            testResult,
            hospitalName,
            age,
            sex,
            drugName1,
            dosage1,
            frequency1,
            period1,
            drugName2,
            dosage2,
            frequency2,
            period2,
            drugName3,
            dosage3,
            frequency3,
            period3,
            drugName4,
            dosage4,
            frequency4,
            period4,
        } = req.body;
        const imageFile = req.file

        // Prepare the update object
        const updateData = {
            userId,
            docId,
            slotDate,
            slotTime,
            amount,
            cancelled,
            payment,
            testResult,
            hospitalName,
            age,
            sex,
            drugName1,
            dosage1,
            frequency1,
            period1,
            drugName2,
            dosage2,
            frequency2,
            period2,
            drugName3,
            dosage3,
            frequency3,
            period3,
            drugName4,
            dosage4,
            frequency4,
            period4,
        };

        // Update the appointment in the database
        const updatedAppointment = await appointmentModel.findByIdAndUpdate(appointmentId, updateData, { new: true });

        if (!updatedAppointment) {
            return res.json({ success: false, message: "Appointment not found" });
        }
        
        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl = imageUpload.secure_url

            await appointmentModel.findByIdAndUpdate(appointmentId,{ imgSignature:imageUrl})
        }

        res.json({ success: true, message: "Appointment Updated", data: updatedAppointment });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



export {changeAvailablity,doctorList,updateAppointment, loginDoctor,appointmentsDoctor,appointmentCancel,appointmentComplete,doctorDashboard, doctorProfile, updateDoctorProfile}