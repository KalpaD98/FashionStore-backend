/* This controllers are defined only for admin users */

const User=require('../models/user-model');

exports.getAllUsers=async(req,res,next)=>{
    try{
        const users=await User.find();

        if(!users){
            throw new Error('Users Not Found')
        }

        res.status(200).json({
            status:'succcess',
            results: users.length,
            data:{
                users: users
            }
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.getUser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        if(!user){
            throw new Error('No user found with that Id');
        }
        res.status(200).json({
            status: 'success',
            data: {
                user: user
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message : err.message
        })
    }
}

exports.deleteUser=async(req,res,next)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id);
        if(!user){
            throw new Error('No user found with that Id');
        }
        res.status(204).json({
            status: 'success',
            data:{
                user: null
            }
        });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.updateUser=async(req,res,next)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{
            runValidators: true
        });

        if(!user){
            throw new Error("No user found with that Id");
        }
        res.status(201).json({
            status: 'success',
            data: {
                user: user
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.createUser=async(req,res,next)=>{
    // try{
    //     const user=await User.create(req.body);
    //     res.status(201).json({
    //         status:'success',
    //         user:{
    //             user
    //         }
    //     })
    // }catch(err){
    //     res.status(400).json({
    //         status:'fail',
    //         message: err
    //     });
    // }
   res.status(500).json({
       status: 'fail',
       message: 'This route is not defined. Try sign in'
   });
}