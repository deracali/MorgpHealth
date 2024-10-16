import insuranceModel from "../models/InsuranceModel.js"



const addInsurance = async (req,res)=>{
    try{
        const {name,
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
            premiumCover,
            goldCover,} = req.body
        
        if(!name || !spouseName || !motherName || !fatherName || !childName || !age || !spouseAge || !motherAge || !fatherAge || !childAge || !country || !location || !premiumCover || !goldCover || !platinumCover){
            return res.json({success:false,message:"Missing Details"})
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
            premiumCover,
            goldCover,
            platinumCover
        }

        const newInsurance = new insuranceModel(insuranceData)
        await newInsurance.save()

        res.json({success:true,message:"Insurance Added"})
    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}



const getInsurance = async (req,res) => {
    try{
        const {userId} = req.params
        const insuranceData = await insuranceModel.findById(userId)
        
        res.json({success:true, insuranceData})
    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}



export {getInsurance, addInsurance}