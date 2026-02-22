export const isPartner = (req,res,next) => {
    
    if(req.user && req.user.role === 'PatnerPro'){
        next();
    }else{
        res.status(403).json({message:'Accesso negato, solo gli PatnerPro possono accedere a questa risorsa'});
    }

}
