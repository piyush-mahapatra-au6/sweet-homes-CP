const Razorpay = require("razorpay");
const shortid = require("shortid");
const Home = require("../models/Home");
const razorpay = new Razorpay({
  key_id:process.env.KEY_ID, //"rzp_test_DFHUjrJBHtFGru",
  key_secret: process.env.KEY_SECRET//"a3S1kT38i5RO5ivFhn2vPpl8",
});

exports.razorpay = async (req, res) => {
  const { home_id, name, email, price, status } = req.body;

  // search for home
  //Add billing info into tenetpage
  // change status to closed

  const payment_capture = 1;
  const amount = price;
  const currency = "INR";
  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    res.json({
        id: response.id,
        currency: response.currency,
        amount: amount.toString(),
      })
    const obj = { name, email, ...response };
    Home.findOneAndUpdate({ "_id":home_id  }, { "$set": { "tenant": obj, "status": 'close'}}).exec(function(err, book){
        if(err) {
        console.log(err);
        } else {
        console.log(book)
        console.log("env",process.env.KEY_SECRET)
        }
        }); 
    ;

    console.log(res, "after updating");
  } catch (error) {
    console.log(error);
  }
};
exports.check = (req, res) => {
  res.json("hello there from razorpay");
};
