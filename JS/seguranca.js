export default function verificacaoAdmin(req,res,next){
    if(req.session.verificado){
        next();
    }else{
        res.redirect("/");
    }
};