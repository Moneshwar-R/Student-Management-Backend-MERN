const Student=require('../models/Student')
exports.createStudent=async(req,res)=>{
    try{
        const totalCount=await Student.countDocuments()
        req.body['rollno']=totalCount+1
        const student=await Student.create(req.body)
        res.json(student) 
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.getAllStudents=async(req,res)=>{
    try{
        const students=await Student.find()
        res.json(students) 
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.getStudent=async(req,res)=>{
    try{
        const student=await Student.findOne({rollno:req.params.id})
        res.json(student) 
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.deleteStudent=async(req,res)=>{
    try{
        const student=await Student.findOneAndDelete({rollno:req.params.id})
        if(!student){
            return res.status(404).json({message:"Student not found"})
        }
        res.json({message:"Student deleted successfully"})
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.updateStudent=async(req,res)=>{
    try{
        const student=await Student.findOneAndUpdate({rollno:req.params.id},req.body,{new:true})
        if(!student){
            return res.status(404).json({message:"Student not found"})
        }
        res.json(student)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}