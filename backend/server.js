require("dotenv").config()
const express = require("express")
const mongoose  = require("mongoose")
const workoutsRoutes = require("./routes/workouts")
 
const app = express()
app.use(express.json())
// app.use((req,res,next)=>{ 
//     console.log(req.path)
//     next()
// })
app.use("/api/workouts",workoutsRoutes)
mongoose.connect(process.env.MONG_URI)
.then(()=>{
    const port = process.env.PORT
    app.listen(port,()=>console.log(` connected to db and server running at ${port}`))
})
.catch((error)=>console.log(error))
