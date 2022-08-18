const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const signup = async (req, res, next) => {
    const { name, email, password, phone, profession, address } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
    }
    if (existingUser) {
        return res.status(400).json({ message: "User account is already there, please login!" });
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        profession,
        address
    });
    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }
    return res.status(201).json({ message: "User account created sucessfully!" });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User account not found!" });
    }
    let isCorrectPassword = bcrypt.compareSync(password, existingUser.password);
    if (!isCorrectPassword) {
        return res.status(401).json({ message: "Incorrect password!" });
    }
    return res.status(200).json({ message: "Login sucessful!", user: existingUser });
};

const getuser = async (req, res, next) => {
    const id = req.params.id;
    let existingUser;
    try {
        existingUser = await User.findById(id, "-password");
    } catch (error) {
        console.log(error);
    }
    if (!existingUser) {
        res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user: existingUser });
};

const edituser = async (req, res, next) => {
    const id = req.params.id;
    let { name, email, phone, profession, address } = req.body;
    let existingUser;
    try {
        existingUser = await User.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            profession,
            address
        });
    } catch (error) {
        console.log(error);
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User not found!" });
    }
    return res.status(200).json({ message: "User data edited sucessfully!" });
};

const sendmessage = async (req, res, next) => {
    let { message } = req.body;
    console.log(message);
    const id = req.params.id;
    let existingUser;
    try {
        existingUser = await User.findByIdAndUpdate(id, {
            message
        });
    } catch (error) {
        console.log(error);
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User not found!" });
    }
    return res.status(200).json({ message: "Message submitted sucessfully!" });
};

exports.signup = signup;
exports.login = login;
exports.getuser = getuser;
exports.edituser = edituser;
exports.sendmessage = sendmessage;