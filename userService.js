const mongoose = require("mongoose");
const User = require("./user.js")

// const ObjectId = mongoose.Types.ObjectId;

class UserService{
    async create(ful){
        const user = await User.create(ful);
        return user
    }
    async getAll(){
        const user = await User.find()
        return user
    }
    async getOne(id){
        if (!id) {
            res.status(300).json({ message: "is not id" });
          }
        const user = await User.findById(id);
        return user
    }
    async update(user){
        if (!user._id) {
          res.status(400).json({ message: "senc ban chka" });
        }
        const updateUser = await User.findByIdAndUpdate(user._id,user, {
          new: true,
        });
        return updateUser
    }
    async delete(id){
        if (!id) {
            res.status(600).json({ message: "senc id chka" });
          }
          const user = await User.findByIdAndDelete(new ObjectId(id));
    }

}


module.exports = new UserService();