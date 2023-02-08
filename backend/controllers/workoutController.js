const Workout = require("../models/workoutModel")
const mongoose = require('mongoose')
//get 
const getWorkouts = async (req,res)=>{
    const workouts = await Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
} 
//get single 
const getWorkoutOne = async (req,res)=>{
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such workout"})
    }
    const workoutOne = await Workout.findById(id)
    // if(!workoutOne){
    //     return res.status(404).json({error:"no such workout"})
    // }
    res.status(200).json(workoutOne)
}

//creat new workout
const createWorkout = async (req,res)=>{
    const {title,load,reps} =req.body
    
    let emptyFields =[]
    if(!title){
         emptyFields.push("title")
    }
    if(!load){
        emptyFields.push("load")
   }
   if(!reps){
    emptyFields.push("reps")
   }
   if(emptyFields.length>0){
    return res.status(400).json({error:'please fill in all the Fields',emptyFields})
   }
    
    try{
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

//update workout
const updateWorkout = async(req,res)=>{
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such workout"})
    }
    const updateworkout = await Workout.findByIdAndUpdate({_id:id},{...req.body})
    if(!updateworkout){
        return res.status(404).json({error:"no such workout"})
    }
    res.status(200).json(updateworkout)
}
//delete workout
const deleteWorkout = async(req,res)=>{
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such workout"})
    }
    const deleteworkout = await Workout.findByIdAndDelete({_id:id})
    if(!deleteworkout){
        return res.status(404).json({error:"no such workout"})
    }
    res.status(200).json(deleteworkout)
}


module.exports = {createWorkout,getWorkouts,getWorkoutOne,updateWorkout,deleteWorkout}
