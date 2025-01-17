const Delivery = require("../models/DeliveryDetails");

exports.addDelivery = async (req, res) => {
    const { address, city, state, pincode, phoneNumber, isDefault } = req.body;
    const userId = req.user?.id;  // Ensure the user is authenticated

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "You must be logged in to add a delivery address.",
        });
    }

    if (!address || !city || !state || !pincode || !phoneNumber) {
        return res
        .status(400)
        .json({ success: false, message: "Please provide all required details." });
    }

    try {
        // If the user selects a default address, set the previous one as not default
        if (isDefault) {
            await Delivery.updateMany({ user: userId }, { isDefault: false });
        }

        const delivery = await Delivery.create({
            user: userId,
            address,
            city,
            state,
            pincode,
            phoneNumber,
            isDefault: isDefault || false,  // If isDefault is not provided, set it to false
        });

        res.status(201).json({ success: true, message: "Delivery address added.", delivery });
    } catch (error) {
        console.error("Error adding delivery address:", error);
        res.status(500).json({ success: false, message: "Could not add delivery address." });
    }
};

exports.getDeliveryAddress = async (req, res) => {
    const userId = req.user?.id;  // Ensure the user is authenticated

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "You must be logged in to view delivery addresses.",
        });
    }

    try {
        const deliveryAddresses = await Delivery.find({ user: userId });

        res.status(200).json({ success: true, deliveryAddresses });
    } catch (error) {
        console.error("Error fetching delivery addresses:", error);
        res.status(500).json({ success: false, message: "Could not fetch delivery addresses." });
    }
}
