const DBUtil = require('./ulit');


class DBInit {
    #connection;

    constructor() {
        let mysql = require('mysql2');
        let dbConfig = require('../config/db.config');
        this.#connection = mysql.createConnection(dbConfig);
    }

    getDataFromProc(sprocName, args) {
        return new Promise((Resolve, Reject) => {
            const formatedArgs = DBUtil.formatArg(args);
            this.#connection.execute(`call ${sprocName}(${formatedArgs})`, [], (err, results, fields) => {
                if (err) {
                    Reject(err);
                }
                Resolve(results, fields);
            });
        })
    }

}


module.exports = new DBInit()