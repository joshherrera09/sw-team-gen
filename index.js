const inquirer = require('inquirer');
const fs = require ('fs');

const Manager = require('./lib/manager');
const Intern = require('./lib/intern');
const Engineer = require('./lib/engineer');

var empId = 1;
var employees = [];
var managerOffice = 1;

function manQuestions() {
    inquirer
        .prompt([
            {
                type: 'input',
                massage: 'What is your name?',
                name: 'managerName'
            },
            {
                type: 'input',
                message: 'What is your email?',
                name: 'managerEmail'
            },
            {
                type: 'checkbox',
                message: 'Would you like to add a another manager?',
                choices: ['Yes', 'No'],
                name: 'addManager'
            }
        ]).then(function(response) {
            var managerName = response.managerName;
            var managerEmail = response.managerEmail;
            var manager = new Manager(
                managerName,
                empId,
                managerEmail,
                managerOffice
            );

            employees.push(manager);
            empId ++;
            managerOffice ++;

            if (response.addManager === 'Yes') {
                manQuestions();
            } else {
                empQuestions();
            }
        });
}

function empQuestions() {
    inquirer    
        .prompt([
            {
                type: "checkbox",
                message: 'What is employees role?',
                choices: ['Engineer', 'Intern'],
                name: 'empRole'
            },
            {
                type: 'input',
                message: 'What is employees name?',
                name: 'empName'
            },
            {
                type: 'input',
                message: 'What is employees email?',
                name: 'empEmail'
            },  
        ]).then(function(response) {
            var empRole = response.empRole;
            var empName = response.empName;
            var empEmail = response.empEmail;

            if (empRole === 'Engineer') {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'What is the employees GitHub username?',
                            name: 'userName'
                        },
                        {
                            type: 'checkbox',
                            message: 'Would you like to add another employee?',
                            choices: ['Yes', 'No'],
                            name: 'addEmp'
                        }
                    ]).then(function(response) {
                        var empUserName = response.userName;

                        var engineer = new Engineer(
                            empName,
                            empId,
                            empEmail,
                            empUserName
                        );

                        employees.push(engineer);
                        empId ++;

                        if (response.addEmp === 'Yes') {
                            empQuestions();
                        } else {
                            generateHTML();
                            return;
                        }
                    });
            } else {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'What school does your intern attend?',
                            name: 'school'
                        },
                        {
                            type: 'checkbox',
                            message: 'Would you like to add another employee?',
                            choices: ['Yes', 'No'],
                            name: 'addEmp'
                        }
                    ]).then(function() {
                        var school = response.school;

                        var intern = new Intern(
                            empName,
                            empId,
                            empEmail,
                            school
                        );

                        employees.push(intern);

                        empId ++;

                        if (response.addEmp === 'Yes') {
                            empQuestions();
                        } else {
                            generateHTML();
                            return;
                        }
                    });
            }
        });
    console.log(employees);
}

function generateHTML(){};
manQuestions();