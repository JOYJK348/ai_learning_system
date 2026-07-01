const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../../../backend/data/learning_portal.db');
const db = new sqlite3.Database(dbPath);

db.all(`
  SELECT l.id, l.title, c.name as chapter_name, s.name as subject_name 
  FROM lessons l
  JOIN chapters c ON l.chapter_id = c.id
  JOIN subjects s ON c.subject_id = s.id
  WHERE s.name LIKE '%Tamil%' OR s.name LIKE '%தமிழ்%'
  ORDER BY c.sort_order, l.sort_order
`, (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.log(JSON.stringify(rows, null, 2));
  }
  db.close();
});
