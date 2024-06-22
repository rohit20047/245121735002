const express = require('express');
const app = express();

app.get('/numbers/:type', (req, res) => {
  const { type } = req.params;
  const mockResponses = {
    e: { numbers: [2, 4, 6, 8] },
    p: { numbers: [3, 5, 7, 11] },
    f: { numbers: [1, 1, 2, 3] },
    r: { numbers: [9, 15, 22, 28] },
    // Add more mock responses as needed
  };

  if (mockResponses[type]) {
    return res.json(mockResponses[type]);
  }
  res.status(404).json({ error: 'Invalid number type' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Mock server is running on port ${PORT}`);
});
