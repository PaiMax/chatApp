const express=require('express');
 
const router=express.Router();

const groupController=require('../controllers/usergroup');
const Authorization=require('../middleware/auth');



router.get('/getdata',Authorization.authentication,groupController.getUserGroups);







module.exports=router;