const express = require('express');
const bodyParser = require('body-parser');
const survivorRoutes = require('./routes/survivorRoutes');
const reportRoutes = require('./routes/reportRoutes');
const itemRoutes = require('./routes/itemRoutes');
const db = require('./config/db');
const cors = require('cors');
const Item = require('./models/itemModel');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/survivors', survivorRoutes);
app.use('/reports', reportRoutes);
app.use('/items', itemRoutes);



db.once('open', async () => {
  const items = await Item.find();
  if (items.length === 0) {
    const predefinedItems = [
      { name: 'Water', description: 'Clean drinking water' },
      { name: 'Food', description: 'Non-perishable food items' },
      { name: 'Medication', description: 'Basic medical supplies' },
      { name: 'C-Virus Vaccine', description: 'Vaccine against the Cogni-Virus' }
    ];
    await Item.insertMany(predefinedItems);
    console.log('Predefined items inserted');
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;