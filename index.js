const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 9876;
const WINDOW_SIZE = 10;
let numberWindow = [];

async function fetchNumbersFromServer(numberType) {
  try {
    const response = await axios.get(`http://localhost:3001/numbers/${numberType}`, { timeout: 500 });
    return response.data.numbers || [];
  } catch (error) {
    console.error('Error fetching numbers:', error.message);
    return [];
  }
}

function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

app.get('/numbers/:numberid', async (req, res) => {
  const startTime = Date.now();
  const numberid = req.params.numberid;

  if (!['p', 'f', 'e', 'r'].includes(numberid)) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  const prevWindow = [...numberWindow];
  const numbers = await fetchNumbersFromServer(numberid);

  numbers.forEach(number => {
    if (!numberWindow.includes(number)) {
      if (numberWindow.length >= WINDOW_SIZE) {
        numberWindow.shift();
      }
      numberWindow.push(number);
    }
  });

  const average = calculateAverage(numberWindow);

  const response = {
    windowPrevState: prevWindow,
    windowCurrState: numberWindow,
    numbers: numbers,
    avg: average.toFixed(2)
  };

  const duration = Date.now() - startTime;
  if (duration > 500) {
    console.warn(`Response time exceeded 500ms: ${duration}ms`);
  }

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
