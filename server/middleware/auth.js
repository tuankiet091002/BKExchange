import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js"

const secret = 'test';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token, 'test');

        req.user = await UserModel.findById(decodedData.id).select('name avatar');
        
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthenticated. Please login or verify the access token"})
        console.log(error);
    }
};