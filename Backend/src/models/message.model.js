import mongoose from "mongoose"
 const messageschema = new mongoose.Schema({
     senderId: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "User",
         required: true,
     },
     reciverID: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "User",
         required: true,
     },
    
     text: {
         type: String,
        
     },
     imeges: {
         type: String,
     },
 },
     { timestamps: true }
 );
const User = mongoose.model("message", messageschema);
export default User;