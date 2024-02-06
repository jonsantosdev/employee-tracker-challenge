const inquirer = require("inquirer");
// const connection = require("./db/connections");
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "yipes123",
    database: "tracker_db"
})

function start () {
inquirer
.prompt({
  name: 'action',
  type: 'list',
  message: 'What would you like to do?',
  choices: [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role',
    'Quit',
  ],
})
.then((answer) => {
  switch (answer.action) {
    case 'View all departments':
      viewAllDepartments();
      break;

    case 'View all roles':
      viewAllRoles();
      break;

    case 'View all employees':
      viewAllEmployees();
      break;

    case 'Add a department':
      addDepartment();
      break;

    case 'Add a role':
      addRole();
      break;

    case 'Add an employee':
      addEmployee();
      break;

    case 'Update an employee role':
      updateEmployeeRole();
      break;

    case 'Quit':
      connection.end();
      break;
  }
});  
}
// // Function to view all departments
function viewAllDepartments() {
      connection.query("SELECT * FROM department", (err, results) => {
        // console.log(results)
        console.table(results);
        start();
      })
}

// // Function to view all role
function viewAllRoles() {
  //ttitle, id, department name, salary
  connection.query("SELECT role.title, role.id, department.name, role.salary FROM role JOIN department ON role.department_id = department.id", (err, results) => {
    // console.log(results)
    console.table(results);
    start();
  })
}

// // Function to view all employees
function viewAllEmployees() {
  // employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to 

  // connection.query("SELECT * FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id JOIN employee AS manager ON employee.manager_id = manager.id", (err, results) => {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id JOIN employee AS manager ON employee.manager_id = manager.id", (err, results) => {
    // console.log(results)
    console.table(results);
    start();
  })
}

// Function to add a department
  function addDepartment() {
    inquirer
      .prompt({
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department:',
      })
      .then((answer) => {
        const query = 'INSERT INTO department SET ?';
        connection.query(query, { name: answer.name }, (err) => {
          if (err) throw err;
          console.log('Department added successfully!');
          // console.log(answer); 
          
        });
        start();
      });
  }
   
 // Function to add a role
 function addRole() {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the title of the role:',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary for the role:',
      },
      {
        name: 'department_id',
        type: 'input',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answer) => {
      console.log(answer);
      const query = 'INSERT INTO role SET ?';
      connection.query(
        query,
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        (err) => {
          if (err) throw err;
          console.log('Role added successfully!');
          start();
        }
      );
      
    });
}

  // Function to add an employee
  function addEmployee() {
    connection.query("SELECT role.title AS name, role.id AS value FROM role;", (err, roleChoices) => {

      inquirer
      .prompt([
        {
          name: 'first_name',
          type: 'input',
          message: 'Enter the first name of the employee:',
        },
        {
          name: 'last_name',
          type: 'input',
          message: 'Enter the last name of the employee:',
        },
        // {
        //   name: 'role_id',
        //   type: 'input',
        //   message: 'Enter the role id for the employee:',
        // },
        {
          name: 'role_id',
          type: 'list',
          message: 'Select the role title for the employee:',
          choices: roleChoices
        },
        {
          name: 'manager_id',
          type: 'input',
          message: 'Enter the manager ID for the employee:',
        },
      ])
      .then((answer) => {
        // console.log(answer);
        const query = 'INSERT INTO employee SET ?';
        connection.query(
          query,
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            // role_id: answer.role_id,
            role_id: answer.role_id,
            manager_id: answer.manager_id,
          },
          (err) => {
            if (err) throw err;
            console.log('Employee added successfully!');
            
          }       
        );
        start();
      });

    })
  }
  
   // Function to update an employee role
 function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: 'employee_id',
        type: 'input',
        message: 'Enter the ID of the employee to update:',
      },
      {
        name: 'new_role_id',
        type: 'input',
        message: 'Enter the new role ID for the employee:',
      },
    ])
    .then((answer) => {
      const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
      connection.query(query, [answer.new_role_id, answer.employee_id], (err) => {
        if (err) throw err;
        console.log('Employee role updated successfully!');
        start();
      });
      
    });
}

start();

 

  

  
 
  
 
  