const crypto = require('crypto');
const orderdb = require('../collections/orderCollection');
const itemdb = require('../collections/itemsCollection'); // points to 'Item' model

const validation = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      const updateord = await orderdb.findOneAndUpdate(
        { razorpayorderID: razorpay_order_id },
        {
          razorpaypaymentID: razorpay_payment_id,
          status: "successful"
        },
        { new: true }
      );

      if (!updateord) {
        console.log("order_id seems invalid and not found in database");
        return res.status(404).json("Order not found");
      }

      // ⬇ Reduce quantity for each product in the order
      for (const item of updateord.items) {
        const updatedItem = await itemdb.findOneAndUpdate(
          { itemId: item.productID },
          { $inc: { quantity: -item.quantity } },
          { new: true }
        );

        if (!updatedItem) {
          console.warn(`Item with ID ${item.productID} not found`);
          // optionally: rollback quantities if needed or notify admin
        }
      }

      return res.status(200).json("Order placed successfully and stock updated.");
    } else {
      return res.status(400).json("Payment failed");
    }
  } catch (err) {
    console.error("Error Occurred: ", err);
    res.status(500).json({ error: "Error occurred during payment validation" });
  }
};

module.exports = validation;