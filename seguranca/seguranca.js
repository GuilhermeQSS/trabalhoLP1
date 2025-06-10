export function verificacaoAdmin(req, res, next) {
    if (req.session.admin) {
        next();
    } else {
        res.redirect("/");
    }
}

export function verificacaoUsuario(req, res, next) {
    if (req.session.usuario || req.session.admin) {
        next();
    } else {
        res.redirect("/");
    }
}
