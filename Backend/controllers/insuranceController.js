import insuranceModel from "../models/InsuranceModel.js";
import nodemailer from 'nodemailer';



// Add Insurance
// Configure Titan Mail SMTP Transport with the email and password directly
const transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 587,  // Use 465 for SSL if needed
    secure: false, // Set to `true` if using port 465
    auth: {
        user: 'support@morgphealth.com',  // Your Titan Mail email
        pass: '@Charyn0771941' // Your Titan Mail password
    }
});

// Function to send an email (reused for appointment and insurance emails)
const sendAppointmentEmail = async (to, subject, text) => {
    const mailOptions = {
        from: 'support@morgphealth.com',  // Directly use the email
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Email error:', error);
    }
};

// Function to add insurance and send a confirmation email
const addInsurance = async (req, res) => {
    try {
        const {
            name,
            email,
            userId,
            spouseName,
            motherName,
            fatherName,
            childName,
            age, // Should be DOB
            spouseAge, // Should be DOB
            motherAge, // Should be DOB
            fatherAge, // Should be DOB
            childAge, // Should be DOB
            location,
            country,
            title,
            price,
            value,
            price2,
            insured,
            plan,
            planType,
            planPrice,
            addOns,
            totalPrice,
            type,
            cover,
            policyTerm,
            self,
            spouse,
            child,
            mother,
            father,
            title1,
            frequency1,
            title2,
            frequency2,
            title3,
            frequency3,
            title4,
            frequency4,
            title5,
            frequency5
        } = req.body;

        // Convert age-related fields (DOB) to Date format
        const parseDate = (dob) => (dob ? new Date(dob) : null);

        const insuranceData = {
            name,
            email,
            userId,
            spouseName,
            motherName,
            fatherName,
            childName,
            age: parseDate(age),
            spouseAge: parseDate(spouseAge),
            motherAge: parseDate(motherAge),
            fatherAge: parseDate(fatherAge),
            childAge: parseDate(childAge),
            location,
            country,
            title,
            price,
            value,
            price2,
            insured: insured || false,
            plan,
            planType,
            planPrice,
            addOns: addOns || [],
            totalPrice,
            type,
            cover,
            policyTerm,
            self,
            spouse,
            child,
            mother,
            father,
            title1,
            frequency1,
            title2,
            frequency2,
            title3,
            frequency3,
            title4,
            frequency4,
            title5,
            frequency5
        };

        const newInsurance = new insuranceModel(insuranceData);
        await newInsurance.save();

        // Send insurance confirmation email
        await sendAppointmentEmail(
            email,
            'Insurance Plan Confirmation',
            `Dear ${name},\n\nYour insurance plan has been successfully added.\n\nDetails:\nPlan: ${plan}\nPrice: ${price}\nTotal Price: ${totalPrice}\n\nThank you for choosing us.`
        );

        res.json({ success: true, message: "Insurance Added and Email Sent" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



const getAllInsurance = async (req, res) => {
    try {
        // Fetch all insurance records
        const insuranceData = await insuranceModel.find();

        if (!insuranceData || insuranceData.length === 0) {
            return res.json({ success: false, message: "No insurance records found" });
        }

        res.json({ success: true, insuranceData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { getAllInsurance };


// Get Insurance by userId
const getInsurance = async (req, res) => {
    try {
        const { userId } = req.params;
        const insuranceData = await insuranceModel.find({ userId });

        if (!insuranceData) {
            return res.json({ success: false, message: "Insurance not found" });
        }

        res.json({ success: true, insuranceData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update Insurance
const updateInsurance = async (req, res) => {
    try {
        const { insuranceId } = req.params;
        const updateFields = req.body;

        const updatedInsurance = await insuranceModel.findByIdAndUpdate(
            insuranceId,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedInsurance) {
            return res.json({ success: false, message: "Insurance not found" });
        }

        res.json({ success: true, message: "Insurance Updated", updatedInsurance });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Delete Insurance
const deleteInsurance = async (req, res) => {
    try {
        const { insuranceId } = req.params;

        const deletedInsurance = await insuranceModel.findByIdAndDelete(insuranceId);

        if (!deletedInsurance) {
            return res.json({ success: false, message: "Insurance not found" });
        }

        res.json({ success: true, message: "Insurance Deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { getInsurance, addInsurance, updateInsurance, deleteInsurance };
