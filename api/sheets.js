const { google } = require('googleapis');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Load credentials from environment variable
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    
    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1l884J1nrw4PHYyFN2TBK9HxUBMGaNZCnoaDpkrvZ_kI';
    const sheetName = 'MyRotines';

    // GET - Fetch tasks for a specific date
    if (req.method === 'GET') {
      const date = req.query.date || new Date().toISOString().split('T')[0];
      
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!A:D`,
      });

      const rows = response.data.values || [];
      
      // Skip header row and filter by date
      const tasks = [];
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row[0] === date) {
          tasks.push({
            row: i,
            date: row[0],
            time: row[1] || '',
            activity: row[2] || '',
            completed: row[3] === 'TRUE' || row[3] === true
          });
        }
      }

      return res.status(200).json({ 
        date, 
        tasks,
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length
      });
    }

    // POST - Update task completion status
    if (req.method === 'POST') {
      const { row, completed } = req.body;
      
      if (row === undefined || completed === undefined) {
        return res.status(400).json({ error: 'Missing row or completed parameter' });
      }

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!D${row + 1}`,
        valueInputOption: 'USER_ENTERED',
        resource: { 
          values: [[completed ? 'TRUE' : 'FALSE']] 
        }
      });

      return res.status(200).json({ 
        success: true,
        row,
        completed 
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
