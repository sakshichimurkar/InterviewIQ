import jwt from "jsonwebtoken"

const genToken = async (userId) => {// user id which get from db that we 
    //have to give to genToken. this token save in cookie
    // in this way we can find user

    try{
const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:"30d"})
    return token //if token not return it will not store
    } catch (error) {

        console.log(error)
    }
    
}

export default genToken;