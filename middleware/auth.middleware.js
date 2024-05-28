const User = require("../db/userModel");
module.exports.hasSessionRecord = async (request, response, next)=>{
    if(request.cookies.user_id) {
        const user = await User.findOne({_id: request.cookies.user_id})
        if(user){
            next(); 
        }
        else{
            console.log(request.cookies.user_id)
            // response.clearCookie('user_id');
            response.status(400).send('Người dùng chưa đăng nhập');
        }
    }
    else {
        response.status(400).send('Người dùng chưa đăng nhập');
    }
}