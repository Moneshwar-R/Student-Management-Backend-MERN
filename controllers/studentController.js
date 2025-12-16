const Student=require('../models/Student')

const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

exports.login=async(req,res)=>{
    const {rollno,password}=req.body
    const student=await Student.findOne({rollno})
    if(!student){
        return res.status(404).json({message:"Student not found"})
    }
    const isMatch=await bcrypt.compare(password,student.password)
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"})
    }
    const token=jwt.sign({rollno:student.rollno},process.env.JWT_SECRET)
    res.json({token})
}

exports.createStudent=async(req,res)=>{
    try{
        const totalCount=await Student.countDocuments()
        req.body['rollno']=totalCount+1
        const {rollno,name,email,password}=req.body
        const hashed=await bcrypt.hash(password,10)
        const student=new Student({rollno,name,email,password:hashed})
        await student.save()
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