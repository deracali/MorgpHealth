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
            price2
        } = req.body;

        if (!name || !spouseName || !motherName || !fatherName || !childName || !age || !spouseAge || !motherAge || !fatherAge || !childAge || !country || !location) {
            return res.json({ success: false, message: "Missing Details" });
        }

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
            price2
        };

        const newInsurance = new insuranceModel(insuranceData);
        await newInsurance.save();

        res.json({ success: true, message: "Insurance Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

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

        // Use $set to only update the fields that are passed in req.body
        const updatedInsurance = await insuranceModel.findByIdAndUpdate(
            insuranceId,
            { $set: updateFields },
            { new: true } // Return the updated document
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
