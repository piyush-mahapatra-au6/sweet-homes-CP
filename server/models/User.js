const mongoose = require('mongoose')

const crypto = require('crypto')

//User Schema

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    avatar: {
		type: String,
	},
    hashed_password:{
        //Will save the hashed password
        type:String,
        required:true
    },
    salt:String,
    role:{
        type:String,
        default:"tenant"
        //we can extend it to take admin and service
    },
    resetPasswordLink:{
        data:String,
        default:''
    }
},{timestamps:true})

//Virtual Password
userSchema.virtual('password')
.set(function(password){
    //set password ,use normal fun due to this keyword
    this._password = password,//temp var
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

//Methods
userSchema.methods ={
    //generate Salt
    makeSalt:function(){
        return Math.round(new Date().valueOf() * Math.random()) + ''
    }
,
    //Encrypt Password:
    encryptPassword:function(password){
        if(!password) return ''
        try{
            return crypto.createHmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        }catch(err){
            return ''
        }
    },
    //Compare password between plain and get from user and hashed
    authenticate: function(plainPassword){
        return this.encryptPassword(plainPassword) === this.hashed_password
        //it returns true or false
    }
}

module.exports = mongoose.model('User',userSchema)