import express from 'express';
import { TrafficLightsData } from './src/TrafficLightsData.js';  

const app = express();
app.use(express.json());


let trafficLights = TrafficLightsData;

app.get('/traffic-lights', (req, res) => {
  res.json(trafficLights);
});

app.get('/traffic-lights/:id', (req, res) => {
  const light = trafficLights.find(tl => tl.id === parseInt(req.params.id));
  if (light) {
    res.json(light);
  } else {
    res.status(404).send('Traffic light not found');
  }
});

app.get('/traffic-lights/:id/state', (req, res) => {
  const { id } = req.params;
  console.log("Request ID:", id);

  const light = trafficLights.find(tl => tl.id === parseInt(id));
  if (light) {
    res.json(light);  
  } else {
    res.status(404).send('Traffic light not found');
  }
});

app.post('/traffic-lights/:id/state', (req, res) => {
  const { id } = req.params;
  const { color, power } = req.body;
  console.log("Request ID:", id);
  console.log("Request Body:", req.body);

  const light = trafficLights.find(tl => tl.id === parseInt(id));
  if (light) {
    if (color) light.color = color;
    if (typeof power === 'boolean') light.power = power;
    console.log("Updated Light:", light);
    res.json(light);
  } else {
    res.status(404).send('Traffic light not found');
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
