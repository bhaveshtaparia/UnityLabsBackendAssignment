const mongoose =require('mongoose')
const dbconnect=()=>{
        mongoose.connect(process.env.DBURI,{
            autoIndex: true
        }).then(
            console.log("connection created successfully")
            )
        .catch((err)=>{
            console.log("something went wrong ->",err.message)
        }   );
}

module.exports=dbconnect;