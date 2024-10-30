import insuranceModel from "../models/InsuranceModel.js";

// Add Insurance
const addInsurance = async (req, res) => {
    try {
        const {
            name,
            userId,
            spouseName,
            motherName,
            fatherName,
            childName,
            age,
            spouseAge,
            motherAge,
            fatherAge,
            childAge,
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
        } = req.body;

        const insuranceData = {
            name,
            userId,
            spouseName,
            motherName,
            fatherName,
            childName,
            age,
            spouseAge,
            motherAge,
            fatherAge,
            childAge,
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
        };

        const newInsurance = new insuranceModel(insuranceData);
        await newInsurance.save();

        res.json({ success: true, message: "Insurance Added" });
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
        const insuranceData = await insuranceModel.findOne({ userId });

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
