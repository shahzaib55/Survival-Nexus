const Item = require("../models/itemModel");

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().select("name _id");
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
};
