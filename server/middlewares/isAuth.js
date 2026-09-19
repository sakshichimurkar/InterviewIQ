
import jwt from "jsonwebtoken"

const isAuth = async (req, res , next) => {
try {

    let{token} = req.cookies
    if(!token){
        return res.status(400).json({message:"user does not have a token"})
    }
// now have to verify token jwt through
const verifyToken = jwt.verify(token, process.env.JWT_SECRET)//jwt secret through token will be verify and will get id

if(!verifyToken){
        return res.status(400).json({message:"user does not have a valid token"})

}
req.userId = verifyToken.userId

next()


}catch(error){

 return res.status(500).json({message:`isAuth error ${error} `})


}


}

export default isAuth;