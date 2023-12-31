const express=require('express');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const app=express();
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
dotenv.config({path:'./config.env'});   
const dbconnect=require('./server.js');
dbconnect();
const user=require('./routers/userRouter.js');
const Seller=require('./routers/sellerRouter.js');
const Buyer=require('./routers/buyerRouter.js');
app.use(cors({
    credentials: true,
    origin:process.env.WEBLINK,
    methods:["GET","POST","DELETE","PUT"]
}));

app.get('/',(req,res)=>{
res.send("working..."); 
})
app.use('/api/auth',user);
app.use('/api/seller',Seller);
app.use('/api/buyer',Buyer);
app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`);
})