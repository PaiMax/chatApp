const express =require('express');
const bodyParser=require('body-parser');
const sequelize =require('./util/database');
const user=require('./models/user');
const message=require('./models/message');
const app=express();
const userRoutes=require('./routes/user');
const cors=require('cors');

app.use(cors({origin:"*"}));
console.log('hello');
app.use(bodyParser.json({extended:false}));




app.use('/user',userRoutes);
user.hasMany(message,{constraints:true,onDelete:'CASCADE'});
message.belongsTo(user);




sequelize
.sync()
.then(result=>{console.log(result); app.listen(2000);})
.catch(err=> console.log(err));
