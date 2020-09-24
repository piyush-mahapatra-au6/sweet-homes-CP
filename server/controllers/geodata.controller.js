//Search Homes with Radius ===> /api/:zipcode/:distance
const Home = require('../models/Home')
const geoCoder = require('../helpers/geocoder')

exports.getHomesWithinRadius = async (req,res)=>{
	const {zipcode,distance} = req.params
console.log(zipcode,distance)
	//we need to gen lat and long with the help of geocoder with zipcode
	const loc = await geoCoder.geocode(zipcode)
	const latitude = loc[0].latitude
	const longitude = loc[0].longitude

//calculate the radius here (distance divide by radius of earth)
const radius = distance /3963


	//Find home that mtch with the radius with geoowithin opearator
	const home = await Home.find({
		location:{$geoWithin:{$centerSphere:[[longitude,latitude],radius]}}
	})
res.status(200).json({
	success:true,results:home.length,data:home
})

}

























// const User = require("../models/User");

// exports.read = (req, res) => {
// 	const userId = req.params.id;
// 	User.findOne(userId).exec((err, user) => {
// 		if (err || !user) {
// 			return res.status(400).json({
// 				error: "User Not Found",
// 			});
// 		}
// 		res.json(user);
// 	});
// };

