const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:[3,"Name should containe atleast 3 char"],
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"password lenght should be 8"]

    },
    type:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
   
})
userSchema.post('save', function(error, doc, next) {
  
    if (error.name === 'MongoServerError' && error.code === 11000) {
        // Duplicate email error
        next(new Error('userName already exists'));
    }
    else if(error.name==='ValidationError'){
    next(new Error(error.message));
    } 
    else {
      next(error);
    }
  });

userSchema.pre('save',async function(next){
    try{
    if(!this.isModified('password')){
        return next();
    }
    const hash=await bcrypt.hash(this.password,10);
    this.password=hash;
    next();

    }catch(error){
        next(error)
    }
  })
module.exports=new mongoose.model('user',userSchema);