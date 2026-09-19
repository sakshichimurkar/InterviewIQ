import User from "../models/user.model.js"
import genToken from "../config/token.js"

// from frontend we will bring data mail email anything

//frontend data 
//create user
//token
//cookie

export const googleAuth = async (req, res) => {
try{
    const {name, email} = req.body
    if (!name || !email) {
        return res.status(400).json({message: "Name and email are required"})
    }
//here we have to check user is in database or not
  let user = await User.findOne({email})   // database ke andar jo data jata hai wo generally module me save hota hai
if (!user){
user = await User.create({

    name ,
    email

})
}

//now token create annd save to the cookie

let token = await genToken(user._id) //if want to access anything from the db _id and name , with this token will create
res.cookie("token" , token, {

    httpOnly: true,
    secure: true ,
    sameSite:"none",
    maxAge:7 * 24 * 60 * 60 *1000//7 days me jitne bhi hrs honge wo add ho jayenge 24 se. and with 60 min and fro sec * 60 and 1000 ms


})

return res.status(200).json(user) // 200-300 then code successful and 400 then frontend error 500-600 then server error
} catch (error){
 return res.status(500).json({message:`Google auth error ${error} `})

}

}

export const logout = async (req, res) => {
    try{
await res.clearCookie("token")
return res.status(200).json({message:"Logout Successfully"})

    }catch(error){
         return res.status(500).json({message:`Logout error ${error} `})


        
    }
}

// if app not getting current user that means user not authenticate we will clear cookie here