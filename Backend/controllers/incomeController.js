import Income from "../models/IncomeModel.js"; // Import the model, not the schema

const addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        // Validation
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number' });
        }

        // Create a new income document
        const income = new Income({
            title,
            amount,
            category,
            description,
            date
        });

        await income.save(); // Save the income to the database
        res.status(200).json({ message: "Income Added" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const getIncomes = async (req,res) => {
    try{
        const incomes = await Income.find().sort({createAt: -1})
        res.status(200).json(incomes)
    } catch(error){
        res.status(500).json({message:'Server Error'})
    }
}


const deleteIncome = async (req,res) => {
    const {id} = req.params

    Income.findByIdAndDelete(id)
    .then((income)=>{
        res.status(200).json({message:"Income Deleted"})
    })
    .catch((err)=>{
        res.status(500).json({message:"Server Error"})
    })
}


export { addIncome, getIncomes, deleteIncome };
