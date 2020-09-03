const inquirer = require('inquirer');
const fs = require ('fs');

const Manager = require('./lib/manager');
const Intern = require('./lib/intern');
const Engineer = require('./lib/engineer');

// Start employee ID at 1
var empId = 1;
// Empty employees array
var employees = [];
// Start Manager Office number at 1
var managerOffice = 1;

// Prompt to decide the role of the employee
function addEmployee() {
    inquirer    .prompt([
        {
            type: 'list',
            name: 'role',
            message: "What is your role within the company?",
            choices: ["Manager", "Engineer", "Intern", "Done adding employees"]
        }
    ]).then(function(response) {
        // Switch statement to decide which prompts to use based on role
        switch (response.role) {
            case "Manager":
                addManager();
                break;

            case "Engineer":
                addEngineer();
                break;

            case "Intern":
                addIntern();
                break;
            // When user is done adding employees, the HTML will be generated and eployee array logged
            case "Done adding employees":
                console.log(employees);
                generateHTML(employees);
                break;
        }
    })

    // Prompts for Manager criteria
    function addManager() {
        inquirer   
            .prompt([
                {
                    type: "input",
                    message: "What is your name?",
                    name: "managerName"
                },
                {
                    type: "input",
                    message: "What is your email?",
                    name: "managerEmail"
                },
                
            ]).then(function(response) {
                // console.log(response);
                var managerName = response.managerName;
                var managerEmail = response.managerEmail;

                var manager = new Manager(
                    managerName,
                    managerEmail,
                    empId,
                    managerOffice
                )

                employees.push(manager)
                // Increment employee ID
                empId++;
                // Increment Manager office number
                managerOffice++;
                console.log(manager);

                addEmployee();
                    
            })

    }

    // Prompts for Engineer criteria
    function addEngineer() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your name?",
                    name: "engineerName"
                },
                {
                    type: "input",
                    message: "What is your email addrress",
                    name: "engineerEmail"
                },
                {
                    type: "input",
                    message: "What is your GitHub username?",
                    name: "username"
                }
            ]).then(function(response) {
                // console.log(response);
                var engineerName = response.engineerName;
                var engineerEmail = response.engineerEmail;
                var username = response.username;

                var engineer = new Engineer(
                    engineerName,
                    engineerEmail,
                    empId,
                    username,                      
                )

                employees.push(engineer);

                empId ++;
                console.log(engineer);
                addEmployee();
            })
    }

    // Prompts for Intern criteria
    function addIntern() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your name?",
                    name: "internName"
                },
                {
                    type: "input",
                    message: "What is your email?",
                    name: "internEmail"
                },
                {
                    type: "input",
                    message: "What school do you attend?",
                    name: "internSchool"
                }
            ]).then(function(response) {
                var internName = response.internName;
                var internEmail = response.internEmail;
                var internSchool = response.internSchool;

                var intern = new Intern(
                    internName,
                    internEmail,
                    empId,
                    internSchool,
                )

                employees.push(intern);

                empId ++;
                console.log(intern);

                addEmployee();
            })
    }
}
// Calls the addEmployee() function to begin prompting
addEmployee();

// generates HTML for team summary
function generateHTML() {};
