const express = require('express');
const app = express();
const PORT = 8000;

// Data dummy pemenang Nobel (contoh: nama dan negara)
const data = [
  { name: "Albert Einstein", country: "Germany" },
  { name: "Marie Curie", country: "Poland" },
  { name: "Mahatma Gandhi", country: "India" },
  { name: "Nelson Mandela", country: "South Africa" },
  { name: "Martin Luther King Jr.", country: "USA" },
  { name: "Malala Yousafzai", country: "Pakistan" }
];

// Route untuk http://localhost:8000 (tampilkan semua data)
app.get('/', (req, res) => {
  res.json(data);
});

// Route untuk http://localhost:8000/country (kelompokkan berdasarkan negara)
app.get('/country', (req, res) => {
  const groupedByCountry = data.reduce((acc, item) => {
    if (!acc[item.country]) {
      acc[item.country] = [];
    }
    acc[item.country].push(item);
    return acc;
  }, {});
  res.json(groupedByCountry);
});

// Route untuk http://localhost:8000/name (kelompokkan berdasarkan nama, diurutkan alfabetis)
app.get('/name', (req, res) => {
  const sortedByName = [...data].sort((a, b) => a.name.localeCompare(b.name));
  const groupedByName = sortedByName.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = [];
    }
    acc[item.name].push(item);
    return acc;
  }, {});
  res.json(groupedByName);
});

// Route untuk URL lainnya (Bad Request)
app.use((req, res) => {
  res.status(400).send("Bad Request");
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});