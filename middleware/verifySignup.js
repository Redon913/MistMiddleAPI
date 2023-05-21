
checkDuplicateUsername = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: 'Username already exists'
            })
            return
        }
        next()
    })
}

checkRolesExist = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Role does not exists: " + req.body.roles[i]
                })
                return
            }
        }
    }
    next()
};

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername,
    checkRolesExist: checkRolesExist
}

module.exports = verifySignUp