const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../helpers/geocoder");

const homeSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
			maxlength: [30, "Home Title Can not Exceed 30 characters"],
		},
		slug: String,
		description: {
			type: String,
			maxlength: [200, "Home Title Can not Exceed 200 characters"],
		},
		features: {
			type: String,
		},
		address: {
			type: String,
		},
		email:String,
		landlord:String,
		phone:Number,
		location: {
			type: {
				type: String,
				enum: ["Point"],
			},
			coordinates: {
				type: [Number],
				index: "2dsphere",
			},
			formattedAddress: String,
			city: String,
			state: String,
			zipcode: String,
			country: String,
		},
		imageUrl: {
			type: String,
		},
		price: {
			type: Number,
		},
		size: {
			type: Number,
		},
		capacity: {
			type: Number,
		},
		mess: { type: Boolean },
		wifi: {
			type: String,
			enum: ["yes", "no"],
			default: "yes",
		},
		isFeatured: {
			type: String,
			enum: ["yes", "no"],
			default: "yes",
		},
		status: {
			type: String,
			enum: ["open", "close"],
			default: "open",
		},
		negotiation: {
			type: String,
			enum: ["yes", "no"],
			default: "yes",
		},
		mess: {
			type: String,
			enum: ["yes", "no"],
			default: "no",
		},
		advance: {
			type: Number,
			default: 2000,
		},
		category: {
			type: String,
			enum: ["yes", "no"],
			default: "yes",
		},
		//Embedding is Feasible than Linking in this Case
		owner: {
			type: Object,
		},
		tenant: {
			type: Object,
			
		},
		isInterested: [String],
	},
	{ timestamps: true }
);

//creating a slug for the title,before Saving:
homeSchema.pre("save", function (next) {
	this.slug = slugify(this.title, { lower: true });
	next();
});

//Setting up the Location for Homes Address
homeSchema.pre("save", async function (next) {
	const loc = await geocoder.geocode(this.address);

	this.location = {
		type: "Point",
		coordinates: [loc[0].longitude, loc[0].latitude],
		formattedAddress: loc[0].formattedAddress,
		city: loc[0].city,
		state: loc[0].state,
		zipcode: loc[0].zipcode,
		country: loc[0].countryCode,
	};
});

module.exports = mongoose.model("Home", homeSchema);
