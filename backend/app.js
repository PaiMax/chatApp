const express =require('express');
const bodyParser=require('body-parser');
const sequelize =require('./util/database');
const app=express();
const userRoutes=require('./routes/user');
const cors=require('cors');
app.use(cors({origin:"*"}));
console.log('hello');
app.use(bodyParser.json({extended:false}));




app.use('/user',userRoutes);
sequelize
.sync()
.then(result=>{console.log(result); app.listen(2000);})
.catch(err=> console.log(err));
