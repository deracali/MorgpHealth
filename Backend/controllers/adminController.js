import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import doctorModel from "../models/doctorsModel.js";
import cloudinary from 'cloudinary';
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// Access the 'vs' property if it exists on the cloudinary object

const { v2: cloudinaryV2 } = cloudinary; 

const addDoctor = async (req, res) => {
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
        age,
        gender,
        region,
        universityName,
        universityCountry,
        medicalCouncilName,
        medicalCouncilCountry,
        graduationYear,
        balance
      } = req.body;
  
      // Destructure files from req.files
      const { image, medicalLicense, diplomaCertificates, proofOfID } = req.files || {};
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Define a placeholder image URL
      const placeholderImageUrl = 'https://example.com/placeholder-image.jpg';
  
      // Upload images to Cloudinary and handle potential errors
      const uploadImage = async (file) => {
        if (!file) return null;
        const uploadResult = await cloudinaryV2.uploader.upload(file.path, { resource_type: 'image' });
        return uploadResult.secure_url;
      };
  
      // Upload files and store their URLs, if files exist
      const imageUrl = await uploadImage(image && image[0] ? image[0] : null) || placeholderImageUrl;
      const medicalLicenseUrl = await uploadImage(medicalLicense && medicalLicense[0] ? medicalLicense[0] : null);
      const diplomaCertificatesUrl = await uploadImage(diplomaCertificates && diplomaCertificates[0] ? diplomaCertificates[0] : null);
      const proofOfIDUrl = await uploadImage(proofOfID && proofOfID[0] ? proofOfID[0] : null);
  
      // Create doctor data object
      const doctorData = {
        name: name || null,
        email: email || null,
        password: hashedPassword,
        speciality: speciality || [],
        degree: degree || null,
        experience: experience || null,
        about: about || null,
        fees: fees || null,
        address: address || null,
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
  
      // Save new doctor to the database
      const newDoctor = new doctorModel(doctorData);
      await newDoctor.save();
  
      res.json({ success: true, message: 'Doctor Added Successfully' });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  };
  

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: 'Appointment Cancelled' });
    } catch (error) {
        console.log(error);
    }
};


const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        // Calculate total sales and prepare data for earnings chart
        const totalSales = appointments.reduce((acc, appointment) => {
            return acc + appointment.amount; // Sum up the total amount from all appointments
        }, 0);

        const totalEarningsData = appointments.map(appointment => {
            const netAmount = appointment.amount * 0.35; // 35% of the original amount
            return {
                timestamp: appointment.createdAt, // Assuming 'createdAt' is the timestamp field
                earnings: netAmount
            };
        });

        // Prepare total earnings and sales
        const totalEarnings = totalEarningsData.reduce((acc, item) => {
            return acc + item.earnings;
        }, 0);

        // Function to count gender and region distribution
        const countGenderAndRegion = (data) => {
            const genderRegionCount = {};

            data.forEach(item => {
                const gender = item.gender || 'other';
                const region = item.region || 'unknown'; // Assuming region field exists

                if (!genderRegionCount[gender]) {
                    genderRegionCount[gender] = {};
                }

                if (!genderRegionCount[gender][region]) {
                    genderRegionCount[gender][region] = 0;
                }

                genderRegionCount[gender][region]++;
            });

            return genderRegionCount;
        };

        // Get users' and doctors' gender and region distribution
        const usersGenderRegionCount = countGenderAndRegion(users);
        const doctorsGenderRegionCount = countGenderAndRegion(doctors);

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5),
            totalEarnings: totalEarnings.toFixed(2), // Earnings rounded to 2 decimal places
            totalSales: totalSales.toFixed(2), // Total sales rounded to 2 decimal places
            earningsChartData: totalEarningsData, // Add earnings data for the chart
            userCount: users.length, // Add the total user count
            doctorsGender: {
                male: await doctorModel.countDocuments({ gender: 'male' }),
                female: await doctorModel.countDocuments({ gender: 'female' }),
                other: await doctorModel.countDocuments({ gender: { $ne: 'male', $ne: 'female' } })
            },
            usersGender: {
                male: await userModel.countDocuments({ gender: 'male' }),
                female: await userModel.countDocuments({ gender: 'female' }),
                other: await userModel.countDocuments({ gender: { $ne: 'male', $ne: 'female' } })
            },
            usersGenderRegion: usersGenderRegionCount, // Add users' gender and region data
            doctorsGenderRegion: doctorsGenderRegionCount // Add doctors' gender and region data
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard };
