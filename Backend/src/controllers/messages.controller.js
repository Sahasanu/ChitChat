import User from "../models/user.model";
import Message from "../models/message.model";
import cloudinary from "../lib/cloudinary";


export const getUserforsidebar = async (req, res) => {
    try {
        const loggedInuser = req.user_id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInuser } }).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Error in getUserforsidebar", error.message);
        res.status(500).json({ error: "internal server error" })
    }
}
export const getMessages = async (req, res) => {
    try {
        const { id: userTochatID } = req.params
        const myID = req.user._id;
        const messages = await Message.find(
            {
                $or: [
                    { from: myID, to: userTochatID },
                    { from: userTochatID, to: myID }
                ]
            }
        )
        res.status(200).json(messages)
    }
    catch (error) {
        console.error("Error in getMessages", error.message);
        res.status(500).json({ error: "internal server error" })

    }
}
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: reciverID } = req.params
        const senderId = req.user_id
 let imageurl;
 if(image){
    // upload base64 image to coludinary
    const uploadResponse= await cloudinary.uploader.upload(image)
    imageurl=uploadResponse.secure_url
 }
 const newmessage = new Message({
    senderId,
    reciverID,
    text,
    image:imageurl
 })
 await newmessage.save()

    } catch (error) {
        console.error("Error in sendMessage ", error.message);
        res.status(500).json({ error: "internal server error" })
    }



}
