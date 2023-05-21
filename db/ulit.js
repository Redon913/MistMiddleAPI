class DBUtil{
    validateName(sproc_name) {
        const patt = /[.*+?^${}()<>;!@#%&?,|[\]\\]/g;
        const result = patt.test(sproc_name);
        return typeof (sproc_name) === "string" && !result
    }

    validateArg(arg) {
        if (Array.isArray(arg)) {
            let flag = true
            for (const x of arg) {
                const patt = /[.*+?^${}()<>;!@#%&?,|[\]\\]/g;
                if (x && Array.isArray(x)) {
                    return this.validate_arg(x)
                } else if (!x || patt.test(x)) {
                    flag = false
                    break
                }
            }
            return flag
        }
        else {
            return false
        }
    }

    formatArg(arg) {
        let result = ''
        arg.forEach((x) => {
            if (Array.isArray(x)) {
                let result2 = ''
                x.forEach((y) => {
                    result2 += y + ','
                })
                result += '\'' + result2.slice(0, -1) + '\,'
            } else {
                result += '\'' + x + '\','
            }
        })
        result = result.slice(0, -1)
        return result
    }
}

module.exports = new DBUtil