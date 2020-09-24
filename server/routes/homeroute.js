const express = require("express");
const router = express.Router();
const Home = require("../models/Home");
const {
	getHomes,
	newHome,
	// getHomesInRadius,
	updateHome,
	deleteHome,

	
	getHome,
	getHomesbyOwner,
	getFeaturedRooms,
	getStatistics,
	getRoomDetails,
	getHomesByChart,
	
getTenantRooms,
removeTenantRooms,
getTenantBookedRooms,

	roomsByPrice,
	roomsByCity,
	roomsByCapacity,
	roomsByNeed,
	roomsByFuzzy,

	roomInterested
} = require("../controllers/home.controller.js");

//middleware
const auth = require("../middlewares/auth");

//HOMES AREA
router.route("/Homes").get(getHomes);
router.route("/Home/new").post(newHome);
// router.route("/Homes/:zipcode/:distance").get(getHomesInRadius);
router.route("/Home/:id").put(updateHome);
router.route("/Home/:id").delete(deleteHome);
router.route("/Home/:id/:slug").get(getHome);


//IS INTERESTED
router.route('/roomInterested').post(roomInterested)

//OWNER AREA
router.route("/ownerhomes/:id").get(getHomesbyOwner);
router.route("/ownerhomes/:id").delete(deleteHome);
router.route("/getHomesByChart/:id").get(getHomesByChart);

//TENANTS AREA
router.route("/featuredRooms").get(getFeaturedRooms);
router.route("/statistics").get(getStatistics);
router.route("/getRooms").get(getHomes);
router.route("/getRoomDetails/:id").get(getRoomDetails);
router.route("/getTenantRooms").post(getTenantRooms);
router.route("/getTenantBookedRooms").get(getTenantBookedRooms);
router.route("/removeTenantRooms").post(removeTenantRooms);



//FILTERING DATA
router.route("/roomsByCity").get(roomsByCity);
router.route("/roomsByPrice").get(roomsByPrice);
router.route("/roomsByCapacity").get(roomsByCapacity);
router.route("/roomsByNeed").get(roomsByNeed);
router.route("/fuzzy").get(roomsByFuzzy);




//CAPACTY
//FUZZY SEARCH ON TITLE
// function escapeRegex(text) {
// 	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
// }

// router.get("/fuzzy", function (req, res) {
// 	if (req.query.search) {
// 		const regex = new RegExp(escapeRegex(req.query.search), "gi");
// 		Home.find({ title: regex }, function (err, foundHome) {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				res.json({ data: foundHome });
// 			}
// 		});
// 	}
// });





//USE IT LATER TO IMPLEMENT SORTING 
router.get('/desc',(req,res)=>{
	Home.find({}).sort({date: 'desc'}).exec(function(err, docs) { res.json({data:docs})});
})
module.exports = router;

