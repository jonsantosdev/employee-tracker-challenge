const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '123',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);

// Read all Departments
app.get('/api/department', (req, res) => {
  // const sql = `SELECT * FROM department`;
  const sql = `SELECT id, name as department FROM department`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Read all Roles
app.get('/api/role', (req, res) => {
  const sql = `SELECT * FROM role`;
  // const sql = `SELECT id, name as department FROM role`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Read all Employees
app.get('/api/employee', (req, res) => {
  const sql = `SELECT * FROM employee`;
  // const sql = `SELECT id, name as department FROM role`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Add a department
app.post('/api/new-department', ({ body }, res) => {
  const sql = `INSERT INTO department (name)
    VALUES (?)`;
  const params = [body.name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Success. New role added',
      data: body
    });
  });
});

// Add a role
app.post('/api/new-role', ({ body }, res) => {
  const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?, ?, ?)`;
  const params = [body.title, body.salary, body.department_id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Success. New role added',
      data: body
    });
  });
});

// Add an employee
app.post('/api/new-employee', ({ body }, res) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Success. New employee added',
      data: body
    });
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
