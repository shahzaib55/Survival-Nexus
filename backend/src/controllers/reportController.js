const Survivor = require('../models/survivorModel');
const Item = require('../models/itemModel');

exports.getReports = async (req, res) => {
  try {
    const totalSurvivors = await Survivor.countDocuments();
    if (totalSurvivors === 0) {
      return res.json({
        infectedCount: 0,
        nonInfectedCount: 0,
        infectedPercentage: 0,
        nonInfectedPercentage: 0,
        averageResources: []
      });
    }
    const infectionStats = await Survivor.aggregate([
      { $group: { _id: "$infected", count: { $sum: 1 } } }
    ]);
    const infectedCount = infectionStats.find(stat => stat._id === true)?.count || 0;
    const nonInfectedCount = infectionStats.find(stat => stat._id === false)?.count || 0;
    const infectedPercentage = (infectedCount / totalSurvivors) * 100;
    const nonInfectedPercentage = (nonInfectedCount / totalSurvivors) * 100;
    const itemTotals = await Survivor.aggregate([
      { $unwind: "$inventory" },
      { $group: { _id: "$inventory.item", totalQuantity: { $sum: "$inventory.quantity" } } }
    ]);
    const items = await Item.find();
    const averageResources = items.map(item => {
      const total = itemTotals.find(t => t._id.equals(item._id))?.totalQuantity || 0;
      const average = total / totalSurvivors;
      return { item, average };
    });
    res.json({
      infectedCount,          
      nonInfectedCount,       
      infectedPercentage,
      nonInfectedPercentage,
      averageResources
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};