const Home = require("../models/Home");
const geoCoder = require("../helpers/geocoder");
const nodemailer = require("../helpers/sendEmail");
const sendEmail = require("../helpers/sendEmail");
exports.getHomes = (req, res) => {
	Home.find()
		.then((allHomes) =>
			res
				.status(200)
				.json({ count: allHomes.length, success: true, data: allHomes })
		)
		.catch((err) => console.log(err.message));
};

//Create a new Home = api/Home/new

exports.newHome = (req, res) => {
	// req.body.owner = req.user.id
	Home.create(req.body)
		.then((newHome) =>
			res.status(200).json({
				success: true,
				message: "Home created",
				data: newHome,
			})
		)
		.catch((err) => console.log(err.message));
};

exports.updateHome = (req, res) => {
	const id = req.params.id;
	console.log(id);
	const filter = { _id: id };
	const update = { ...req.body };

	Home.findOneAndUpdate(filter, update, {
		new: true,
	})
		.then((result) => {
			return res.status(200).json({ message: result });
		})
		.catch((err) => res.status(200).json({ message: err }));
};

//Get a single Home with id and Slug ==> api/Home/:id/:slug
exports.getHome = async (req, res, next) => {
	try {
		let Home = await Home.find({
			$and: [{ _id: req.params.id }, { slug: req.params.slug }],
		});
		if (!Home || Home.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Home Not Found",
			});
		}

		res.status(200).json({
			success: true,
			data: Home,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.deleteHome = (req, res) => {
	Home.findById(req.params.id).then((ghar) => {
		if (!ghar) {
			return res.status(404).json({
				success: false,
				message: "Home Not Found",
			});
		}

		Home.findByIdAndDelete(req.params.id).then(() => {
			res.status(200).json({
				success: true,
				message: "Home is Deleted!",
			});
		});
	});
};

exports.getHomesbyOwner = (req, res) => {
	//first you need something associating the current user
	const ownerId = req.params.id;
	console.log(ownerId);
	// console.log(typeof ownerId);

	Home.find()
		.then((allHomes) => {
			const ownerHomes = allHomes.filter((home) => home.owner._id === ownerId);
			res.status(200).json({
				count: ownerHomes.length,
				data: ownerHomes,
				message: "These are Owner Homes",
			});
		})
		.catch((err) => console.log(err.message));
};

exports.getFeaturedRooms = (req, res) => {
	Home.find()
		.then((allHomes) => {
			//Filtering Featured rooms
			let isFeaturedRooms = allHomes.filter(
				(room) => room.isFeatured === "yes"
			);
			// Shuffle The Featured Rooms array
			const shuffledRooms = isFeaturedRooms.sort(() => 0.5 - Math.random());

			// Get sub-array of first 3 elements after shuffledRooms and send it to client
			let selectedRooms = shuffledRooms.slice(0, 3);
			return res.status(200).json({
				count: selectedRooms.length,
				success: true,
				data: selectedRooms,
			});
		})
		.catch((err) => console.log(err.message));
};

exports.getStatistics = (req, res) => {
	Home.find()
		.then((allHomes) => {
			//change this to BOOLEAN LATER
			let wifiHomes = allHomes.filter((home) => home.wifi === "no");
			let messHomes = allHomes.filter((home) => home.mess === "no");

			//AVERAGE PRICE OF ALL HOMES
			let avgPrice =
				allHomes.reduce(function (sum, home) {
					return sum + parseFloat(home.price);
				}, 0) / allHomes.length;

			return res.status(200).json({
				data: [
					{ icon: `FaHeart()`, title: "No of Homes", info: allHomes.length },
					{
						title: "Wifi Powered Homes",
						info: wifiHomes.length,
					},
					{
						title: "Average Price of Homes",
						info: avgPrice,
					},
					{
						title: "Mess Arranged Homes",
						info: messHomes.length,
					},
				],
			});
		})
		.catch((err) => console.log(err.message));
};

//TO GET ROOM DETAILS
exports.getRoomDetails = (req, res) => {
	//the Id is room is received from Client
	const roomId = req.params.id;
	console.log(roomId);
	// console.log(typeof ownerId);

	Home.findById({ _id: roomId })
		.then((room) => {
			console.log(room);
			res.status(200).json({
				data: room,
				message: "This is the Required Home of the Owner/Room for the Tenant",
			});
		})
		.catch((err) => console.log(err.message));
};

//TO MAKE SEPARATE ENDPOINTS FOR EACH FILTER/SEARCH RESULTS
exports.roomsByCity = (req, res) => {
	console.log(req.query.city);
	Home.find()
		.then((allHomes) => {
			if (req.query.city === "All") {
				return res
					.status(200)
					.json({ count: allHomes.length, success: true, data: allHomes });
			}
			const cityHomes = allHomes.filter(
				(home) => home.location.city === req.query.city
			);
			console.log(cityHomes);
			return res
				.status(200)
				.json({ count: cityHomes.length, success: true, data: cityHomes });
		})
		.catch((err) => console.log(err.message));
};

exports.roomsByPrice = (req, res) => {
	console.log(req.query.price);
	Home.find()
		.then((allHomes) => {
			if (req.query.price === "All") {
				return res
					.status(200)
					.json({ count: allHomes.length, success: true, data: allHomes });
			}
			//check for low
			if (req.query.price === "low") {
				const lowRooms = allHomes.filter((home) => home.price < 4000);
				console.log(lowRooms);
				return res
					.status(200)
					.json({ count: lowRooms.length, success: true, data: lowRooms });
			}
			//check for Mid
			if (req.query.price === "medium") {
				const mediumRooms = allHomes.filter(
					(home) => home.price > 4000 && home.price < 6000
				);
				console.log(mediumRooms);

				return res.status(200).json({
					count: mediumRooms.length,
					success: true,
					data: mediumRooms,
				});
			}
			//check for high
			if (req.query.price === "high") {
				const highRooms = allHomes.filter((home) => home.price > 6000);
				console.log(highRooms);

				return res
					.status(200)
					.json({ count: highRooms.length, success: true, data: highRooms });
			}
			console.log(priceHomes);
			return res
				.status(200)
				.json({ count: cityHomes.length, success: true, data: cityHomes });
		})
		.catch((err) => console.log(err.message));
};

exports.roomsByCapacity = (req, res) => {
	console.log(req.query.capacity);
	Home.find()
		.then((allHomes) => {
			const capacityHomes = allHomes.filter(
				(home) => home.capacity == req.query.capacity
			);
			console.log(capacityHomes);
			return res.status(200).json({
				count: capacityHomes.length,
				success: true,
				data: capacityHomes,
			});
		})
		.catch((err) => console.log(err.message));
};

exports.roomsByNeed = (req, res) => {
	console.log(req.query.wifi);
	console.log(req.query.mess);

	Home.find()
		.then((allHomes) => {
			//Filter all the Homes
			const wifiRooms = allHomes.filter((room) => room.wifi === "yes");
			const messRooms = allHomes.filter((room) => room.mess === "yes");
			const wifiAndMessRooms = allHomes.filter(
				(room) => room.wifi === "yes" && room.mess === "no"
			);

			//check for Query
			if (req.query.wifi === "yes" && req.query.mess === "yes") {
				return res.status(200).json({
					count: wifiAndMessRooms.length,
					success: true,
					data: wifiAndMessRooms,
				});
			}

			if (req.query.wifi === "yes" && req.query.mess === "no") {
				return res
					.status(200)
					.json({ count: wifiRooms.length, success: true, data: wifiRooms });
			}

			if (req.query.wifi === "no" && req.query.mess === "yes") {
				return res
					.status(200)
					.json({ count: messRooms.length, success: true, data: messRooms });
			}

			if (req.query.wifi === "no" && req.query.mess === "no") {
				return res
					.status(200)
					.json({ count: allHomes.length, success: true, data: allHomes });
			}

			return res
				.status(200)
				.json({ count: wifiHomes.length, success: true, data: wifiHomes });
		})
		.catch((err) => console.log(err.message));
};



exports.roomsByFuzzy= (req,res)=>{
	function escapeRegex(text) {
		return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}
	

		if (req.query.search) {
			const regex = new RegExp(escapeRegex(req.query.search), "gi");
			Home.find({ title: regex }, function (err, foundHome) {
				if (err) {
					console.log(err);
				} else {
					return res.json({ data: foundHome });
				}
			});
		}
	
}





//CHARTJS DATA PLOTTING WITH OWNER DETAILS--------------------------------------------------

exports.getHomesByChart = (req, res) => {
	//first you need something associating the current user
	const ownerId = req.params.id;
	console.log(ownerId);
	// console.log(typeof ownerId);

	Home.find()
		.then((allHomes) => {
			//NO OF HOMES
			const ownerHomes = allHomes.filter((home) => home.owner._id === ownerId);
			console.log(ownerHomes);
			//AVERAGE PRICE OF ALL HOMES
			const avgPrice =
				allHomes.reduce(function (sum, home) {
					return sum + parseFloat(home.price);
				}, 0) / allHomes.length;

			//OWNER HOMES PRICE  //SEPARATE BASED ON CAPACITY OF HOMES //BASED ON NEEDS (WIFI/MESS)
			//BASED ON STATUS   //WIFIMESSHOMES
			const lowHomes = ownerHomes.filter((home) => home.price < 4000);
			const mediumHomes = ownerHomes.filter(
				(home) => home.price > 4000 && home.price < 6000
			);
			const highHomes = ownerHomes.filter((home) => home.price > 6000);
			const capacityHomes = ownerHomes.filter(
				(home) => home.capacity > 2 && home.capacity < 6
			);
			const wifiMessHomes = ownerHomes.filter(
				(home) => home.wifi === "yes" && home.mess === "yes"
			);
			const occupiedHomes = ownerHomes.filter(
				(home) => home.status === "close"
			);

			//SENDING ALL DATASETS TO CLIENT

			res.status(200).json({
				count: ownerHomes.length,
				data: {
					allHomes: allHomes.length,
					allHomesAverage: avgPrice,
					ownerHomes: ownerHomes.length,
					lowHomes: lowHomes.length,
					mediumHomes: mediumHomes.length,
					highHomes: highHomes.length,
					occupiedHomes: occupiedHomes.length,
					wifiMessHomes: wifiMessHomes.length,
					capacityHomes: capacityHomes.length,
				},
				message: "These are Owner Home Data for analysis",
			});
		})
		.catch((err) => console.log(err.message));
};

//--------------------------TENANT INTERESTED IN A ROOM-------------------------//

exports.roomInterested = (req, res) => {
	//the Id of room and email of Interested User is received from Client
	console.log(req.body);
	const user = req.body.user;
	const { homeId } = req.body;

	if (user === null) {
		return res.json({
			message: "Hello Stranger! Login/Register ,if you are Interested! (0_0)",
		});
	}

	Home.findOneAndUpdate(
		{ _id: homeId },
		{ $push: { isInterested: user.email } },
		function (error, data) {
			if (error) {
				console.log(error);
				return res.status(400).json({ message: error });
			} else {
				const message = `Hello ${data.owner.name} :) 
				Wohooooo!
			${req.body.user.name} has Shown Interest in your ${data.title} Home ,Please reach out to him/her at this Email Address
			${req.body.user.email} 
			The Price of ytour home is ${data.price},by the way (^_^) 
			`;
				sendEmail({
					email: data.owner.email,
					subject: `Congrats! Mr${req.body.user.name} is interested in your Home.Reach out @ ${req.body.user.email} `,
					message,
				})
					.then((user) => {
						return res.status(200).json({
							message: `Your email has been shared with this Home's Owner,When he reachs out ,ask for some discount, (*_*)wink wink`,
						});
					})
					.catch((err) => {
						return res.status(400).json({ err });
					});
			}
		}
	);
};

//------------------------------------TENANT ROUTEs------------------------------------------------//

exports.getTenantRooms = (req, res) => {
	console.log(req.body.email);
	Home.find({ isInterested: req.body.email })
	.then((data) =>
		res.json({ data })
	).catch(err => res.json({message:"Can't get tenant Rooms ,Server error"}));
};



exports.getTenantBookedRooms = (req, res) => {
	console.log(req.query.email);


	if(!req.query.email){
		return res.json({message: "Plese provide the  Email"})
	}
	Home.find({ "tenant.email": req.query.email })
	.then((data) =>
		res.json({ data })
	).catch(err => res.json({message:"Can't get tenant Rooms ,Server error",error:err.message}));
};



exports.removeTenantRooms = (req, res) => {
	console.log(req.body);
	Home.updateOne( {_id: req.body.id}, { $pullAll: {isInterested: [req.body.email] } } ).then(data=>{
		res.json({data:data})
	})
};

//5f4229338aba0836129d0a49
//piyushmahapatra99@gmail.com
