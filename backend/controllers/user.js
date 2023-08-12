const user=require('../models/user');
const bcrypt=require('bcrypt');
const token=require('jsonwebtoken');
exports.addUser=async(req,res,next)=>{
    try{ 
        console.log("rreeeeeeeeeeeeeeeeeee=-"+req.body);
    
        
    
        const name=req.body.name;
        const email=req.body.email;
        const phone=req.body.phone;
        const password=req.body.password;
         

        bcrypt.hash(password,10,async(err,hash)=>{
            console.log(err);
           try{await  user.create({
            name:name,
            email:email,
            phoneNo:phone,
            password:hash
    
        })
        res.status(201).json({message:'Successfully created new user'});
    }
    catch(err){ console.log(res.status(404).send(err));}
        })
    
    
    
    
    
       
       
    
   

}
catch(err){console.log(err); res.status(404).json({message:"something went wrong"})};}