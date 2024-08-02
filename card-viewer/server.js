// server.js
require('dotenv').config({ path: 'secret.env' });
const express = require('express');
const { google } = require('googleapis');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/cards/:setName', async (req, res) => {
    const setName = req.params.setName;
    const range = `${setName}!A:E`; // Range including icon (A), count (B), title (C), body (D), and footer (E)
    const apiKey = process.env.GOOGLE_API_KEY;
    const spreadsheetId = process.env.SPREADSHEET_ID;

    try {
        const sheets = google.sheets({ version: 'v4', auth: apiKey });
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: range,
        });

        const result = response.data;
        const cards = [];

        // Parse card data from the rows
        for (let i = 2; i < result.values.length; i++) {
            const row = result.values[i];
            const icon = row[0] || 'Unknown';
            const count = parseInt(row[1], 10) || 1;
            const title = row[2] || 'Untitled';
            const body = row[3] || '';
            const footer = row[4] || '';

            // Add multiple cards based on the count
            for (let j = 0; j < count; j++) {
                cards.push({
                    type: icon, // Icon type from column A
                    title: title, // Title from column C
                    body: body, // Body from column D
                    footer: footer, // Footer from column E
                });
            }
        }

        res.json(cards);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
