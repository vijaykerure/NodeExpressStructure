'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    deleted: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,        
        index: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: String
    
}, { timestamps: true });

// Create unique combination key
//userSchema.index({"phone": 1, "role": 1}, { "unique": true });

// Hook calls before save into collection
userSchema.pre('save', async function(next){
    try {
        let salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});
// Verify password hash
userSchema.methods.verifyPassword = async function(newPassword) {
    try {
        let result = await bcrypt.compare(newPassword, this.password);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const User = mongoose.model('user', userSchema);

module.exports = User;