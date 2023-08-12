const user=require('../models/user');
const bcrypt=require('bcrypt');
const token=require('jsonwebtoken');
const Message=require('../models/message');

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





function generateAccessToken(id){
    console.log('token check---------------------'+process.env.TOKEN_COMPARE)
    return token.sign({userId:id},process.env.TOKEN_COMPARE);
}



exports.checkUser=(req,res,next)=>{
    console.log(req.body.email);
    user.findOne({where:{email:req.body.email}  })
    .then((user)=>{ 
        if(user){

            bcrypt.compare(req.body.password,user.password,(err,re)=>{
                console.log(err);
                if(!err){
                    if(re){
                        res.json({message:"User login Successful",token:generateAccessToken(user.id),name:user.name});
                    }
                    else{
                        res.json({message:"Password does'nt match"});
    
                    }
                    
                }
                

            })
            

            
        }
        else{
            res.json({message:"User does'nt exist"});
        }
       
     })
    .catch((err)=>{console.log(err)});
    

}

exports.messageStore= async (req,res,next)=>{
    try{
        await Message.create({
            message:req.body.message,
            userId:req.user.id
        })
        res.json({message:'sucesss'});
    

    }
    catch(err){
        console.log(err);
        res.json({message:'failure'});
    }
    
    
    
    
}