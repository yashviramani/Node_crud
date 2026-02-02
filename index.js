const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const User = require('./models/userSchema');
const Post = require('./models/postSchema');

mongoose.connect('mongodb://localhost:27017/exam')
.then(()=>{
    console.log("Connected to Databasee");
})
.catch((err)=>{
    console.log(err);
})

///////////////////////////////User APIs////////////////////////////////////
//Create
app.post('/createuser', async(req,res)=>{
    try{
        const data = await User.create(req.body);
        res.status(201).json(data);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
})

//Read all Users
app.get('/getallusers', async (req, res) =>{
    try{
        const data = await User.find();
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json(err);
    }
})

//Update by ID
app.put('/updateuser/:id',async(req,res)=>{
    try{
        const data = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json(err);
    }
})

//Delete by ID
app.delete('/deleteuser/:id',async(req,res)=>{
    try{
        const data = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json(err);
    }
})

///////////////////////////////Post APIs///////////////////////////////////

//create post
app.post('/createpost', async(req,res)=>{
    try{
        const data = await Post.create(req.body);
        res.status(201).json(data);
    }
    catch(err){
        res.status(400).json(err.message);
    }
})

//get all posts
app.get('/getallposts', async(req,res)=>{
    try{
        const data = await Post.find();
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json(err);
    }
})

//update post by id
app.put('/updatepost/:id',async (req,res)=>{
    try{
        const data = await Post.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json(err);
    }
})

//delete post by id
app.delete('/deletepost/:id', async(req,res)=>{
    try{
        const data = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json(err);
    }
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})