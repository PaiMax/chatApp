const userGroup=require('../models/userGroup');
const User=require('../models/user');
const Group=require('../models/group');




exports.getUserGroups=async (req,res,next)=>{
    try{
        const usergroups=await userGroup.findAll({where:{userId:req.user.id}});
        
        console.log(usergroups);
        res.send(usergroups);
        
    }
    catch(err){
        console.log(err);

    }










}