const nodeGeocoder = require("node-geocoder");

const options = {
	provider: process.env.PROVIDER,
	httpAdapter: process.env.ADAPTER,
	apiKey: process.env.GEO_API,
	formatter: null,
};

const geoCoder = nodeGeocoder(options);

module.exports = geoCoder;
