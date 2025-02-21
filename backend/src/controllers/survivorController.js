const Survivor = require("../models/survivorModel");

exports.createSurvivor = async (req, res) => {
  try {
    const { name, age, gender, lastLocation, inventory, infected } = req.body;
    const survivor = new Survivor({
      name,
      age,
      gender,
      lastLocation: {
        latitude: lastLocation.latitude,
        longitude: lastLocation.longitude,
      },
      inventory: inventory.map((item) => ({
        item: item.item,
        quantity: item.quantity,
      })),
      infected,
    });
    await survivor.save();
    res.status(201).json(survivor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.listSurvivors = async (req, res) => {
  try {
    const survivors = await Survivor.find().populate("inventory.item");
    res.json(survivors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSurvivor = async (req, res) => {
  try {
    const survivor = await Survivor.findById(req.params.id).populate(
      "inventory.item"
    );
    if (!survivor)
      return res.status(404).json({ message: "Survivor not found" });
    res.json(survivor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.requestItems = async (req, res) => {
  const { fromSurvivorId, toSurvivorId, itemId } = req.body;

  try {
    const fromSurvivor = await Survivor.findById(fromSurvivorId);

    const toSurvivor = await Survivor.findById(toSurvivorId);
    console.log(toSurvivor);

    if (!fromSurvivor || !toSurvivor)
      return res.status(404).json({ message: "Survivor not found" });

    const fromInventoryItem = fromSurvivor.inventory.find(
      (i) => i.item.toString() === itemId
    );

    if (
      !fromInventoryItem ||
      typeof fromInventoryItem.quantity !== "number" ||
      isNaN(fromInventoryItem.quantity) ||
      fromInventoryItem.quantity < 1
    ) {
      return res.status(400).json({ message: "Item not available" });
    }

    fromInventoryItem.quantity -= 1;

    if (fromInventoryItem.quantity === 0) {
      fromSurvivor.inventory = fromSurvivor.inventory.filter(
        (i) => i.item.toString() !== itemId
      );
    }

    const toInventoryItem = toSurvivor.inventory.find(
      (i) => i.item.toString() === itemId
    );

    if (toInventoryItem) {
      if (
        typeof toInventoryItem.quantity !== "number" ||
        isNaN(toInventoryItem.quantity)
      ) {
        toInventoryItem.quantity = 1;
      } else {
        toInventoryItem.quantity += 1;
      }
    } else {
      toSurvivor.inventory.push({ item: itemId, quantity: 1 });
    }

    await fromSurvivor.save();
    await toSurvivor.save();

    res.json({ message: "Transfer successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
