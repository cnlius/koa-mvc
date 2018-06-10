const model = require('./model');

let User = model.User;

(async () => {
    let user = await User.create({
        name:'李二毛'
    });
    console.log(user);
})();