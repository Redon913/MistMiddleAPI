const db = require("../db");

exports.getAllProducts = (req, res, next) => {
    let productId = req.params.productId;
    db.getDataFromProc('getAllProducts', [productId])
        .then((result, fields) => {
            res.status(200).json(result[0]);
            next();
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        })
}

exports.getProductCategory = (req, res, next) => {
    db.getDataFromProc('getProductCategory', [])
        .then((result, fields) => {
            res.status(200).json(result[0]);
            next();
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        })
}

exports.getBlogs = (req, res, next) => {
    let isHotBlogs = req.params.isHotBlogs;
    db.getDataFromProc('getBlogs', [isHotBlogs])
        .then((result, fields) => {
            res.status(200).json(result[0]);
            next();
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        })
}
