exports.authorizeRole=(...types)=>{
    return  (req,res,next)=>{
    if(!types.includes(req.user.type)){
        res.status(404).json({
            message:req.user.type+" is not allowed to perform this operation",
            success:false
        })
        return;
    }
    next();
    }
    }