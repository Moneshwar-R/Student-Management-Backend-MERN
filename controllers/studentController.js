const Student=require('../models/Student')
exports.createStudent=async(req,res)=>{
    try{
        const student=await Student.create(req.body)
        res.json(student) 
    }catch(err){
        res.status(400).json({error:err.message})
    }
}