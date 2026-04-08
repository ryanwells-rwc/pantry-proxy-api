const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const PANTRY_ID = process.env.PANTRY_ID;

const PANTRY_API_BASE_URL = `https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket`;
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'favicon.ico'));
});

// generic handler for GET requests to fetch data from specific basket
app.get('/:basketName', async (req, res) => {
  const { basketName } = req.params;
  try {
    const response = await axios.get(`${PANTRY_API_BASE_URL}/${basketName}`);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching ${basketName} data:`, error);
    res.status(500).json({ error: `Failed to fetch ${basketName} data` });
  }
});

// generic handler for POST requests to add new data to specific basket
app.post('/:basketName', async (req, res) => {
  const { basketName } = req.params;
  const newData = req.body;
  try {
    const response = await axios.post(`${PANTRY_API_BASE_URL}/${basketName}`, newData);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching ${basketName} data:`, error);
    res.status(500).json({ error: `Failed to fetch ${basketName} data` });
  }
});

// generic handler for PUT requests to update data in a specific basket
app.put('/:basketName', async (req, res) => {
  const { basketName } = req.params;
  const newData = req.body;
  try {
    const response = await axios.put(`${PANTRY_API_BASE_URL}/${basketName}`, newData);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching ${basketName} data:`, error);
    res.status(500).json({ error: `Failed to fetch ${basketName} data` });
  }
});

// delete
app.delete('/:basketName', async (req, res) => {
  const { basketName } = req.params;
  try {
    const response = await axios.delete(`${PANTRY_API_BASE_URL}/${basketName}`);
    res.json({ message: `${basketName} deleted successfully`});
  } catch (error) {
    console.error(`Error fetching ${basketName} data:`, error);
    res.status(500).json({ error: `Failed to fetch ${basketName} data` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});