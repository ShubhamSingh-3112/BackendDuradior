const User = require('../collections/usercollection.js');
const bcrypt = require('bcrypt');
const login = async (req, res) => {
    try
    {
        const { phNum, Password } = req.body

        const user = await User.findOne({ PhoneNum: phNum })
        //if user not present in databse already ask to register
        if (!user)
        {
            return res.status(404).json("User not found. Please register first.");
        }

        const isMatch = await bcrypt.compare(Password, user.Password);//encrypt the password and matching it to check 

        if (!isMatch)
        {
            return res.status(401).json("Invalid credentials. Please try again.");
        }//wrong password

        return res.status(200).json({
            Name: user.Name,
            PhoneNum: user.PhoneNum
        });//correct password
    } 
    catch (err) 
    {
        console.error("Login error:", err);
        return res.status(500).json("Login failed. Internal server error.");
    }
};

module.exports = login;
