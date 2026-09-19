import dotenv from "dotenv"
dotenv.config({ path: new URL("../.env", import.meta.url) })
import Razorpay from "razorpay"


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay