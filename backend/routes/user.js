const express=require('express');
 
const router=express.Router();

const userController=require('../controllers/user');
const Authorization=require('../middleware/auth');
require('dotenv').config({path:"C:\\Users\\nishw\\OneDrive\\Desktop\\chat .env\\.env"});


router.post('/login',userController.checkUser)



router.post('/signup',userController.addUser);
router.post('/message',Authorization.authentication,userController.messageStore);




module.exports=router;