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







const decrementDoctorBalance = async (req, res) => {
    try {
        const { amount } = req.body; // Amount to decrement
        const { docId } = req.params;

        // Ensure the amount is a positive value
        if (amount === undefined || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }

        // Decrement the balance field by the provided amount
        const updatedDoctor = await doctorModel.findByIdAndUpdate(
            docId,
            { $inc: { balance: -amount } }, // Decrement the balance by the amount
            { new: true } // Return the updated document
        );

        // If doctor is not found, return an error response
        if (!updatedDoctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        // Return success response with updated profile data
        res.json({ success: true, message: 'Balance updated', profileData: updatedDoctor });
    } catch (error) {
        console.error(error);
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

        // Find the current appointment data
        const currentAppointment = await appointmentModel.findById(appointmentId);
        if (!currentAppointment) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        // Prepare the update object, only updating fields that are present in the request body
        const updateData = {};
        
        if (userId !== undefined) updateData.userId = userId;
        if (docId !== undefined) updateData.docId = docId;
        if (slotDate !== undefined) updateData.slotDate = slotDate;
        if (slotTime !== undefined) updateData.slotTime = slotTime;
        if (amount !== undefined) updateData.amount = amount;
        if (cancelled !== undefined) updateData.cancelled = cancelled;
        if (payment !== undefined) updateData.payment = payment;
        if (testResult !== undefined) updateData.testResult = testResult;
        if (hospitalName !== undefined) updateData.hospitalName = hospitalName;
        if (age !== undefined) updateData.age = age;
        if (sex !== undefined) updateData.sex = sex;
        if (drugName1 !== undefined) updateData.drugName1 = drugName1;
        if (dosage1 !== undefined) updateData.dosage1 = dosage1;
        if (frequency1 !== undefined) updateData.frequency1 = frequency1;
        if (period1 !== undefined) updateData.period1 = period1;
        if (drugName2 !== undefined) updateData.drugName2 = drugName2;
        if (dosage2 !== undefined) updateData.dosage2 = dosage2;
        if (frequency2 !== undefined) updateData.frequency2 = frequency2;
        if (period2 !== undefined) updateData.period2 = period2;
        if (drugName3 !== undefined) updateData.drugName3 = drugName3;
        if (dosage3 !== undefined) updateData.dosage3 = dosage3;
        if (frequency3 !== undefined) updateData.frequency3 = frequency3;
        if (period3 !== undefined) updateData.period3 = period3;
        if (drugName4 !== undefined) updateData.drugName4 = drugName4;
        if (dosage4 !== undefined) updateData.dosage4 = dosage4;
        if (frequency4 !== undefined) updateData.frequency4 = frequency4;
        if (period4 !== undefined) updateData.period4 = period4;

        // Update the appointment in the database
        const updatedAppointment = await appointmentModel.findByIdAndUpdate(appointmentId, updateData, { new: true });

        res.json({ success: true, message: "Appointment Updated", data: updatedAppointment });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



export {changeAvailablity,decrementDoctorBalance,doctorList,updateAppointment, loginDoctor,appointmentsDoctor,appointmentCancel,appointmentComplete,doctorDashboard, doctorProfile, updateDoctorProfile}