import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel.js";

const secret = 'test';

export const signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const oldUser = await UserModel.findOne({ username });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, secret, { expiresIn: "48h" });

        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const signup = async (req, res) => {
    const { name, username, password, avatar } = req.body;

    try {
        const oldUser = await UserModel.findOne({ username });

        if (oldUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModel.create({ username, password: hashedPassword, name, avatar });

        const token = jwt.sign({ username: result.username, id: result._id }, secret, { expiresIn: "48h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
};
