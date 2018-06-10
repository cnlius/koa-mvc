/**
 * 测试封装的db
 */
const User = require('../models/User.js');

(async () => {
    let user = await User.create({
        name:'李二毛'
    });
    console.log(user);
})();