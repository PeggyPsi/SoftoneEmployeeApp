# 🧑‍💻🏢 Employee App - ENTERSOFT / SOFTONE

## About the App
This application is used for listing employees fetched by a dummy API. The app also provides a detail page for each employee. 

## Prerequisites
Before you begin, ensure you have the following installed:

- **Node.js** (>= 23) – [Download Node.js](https://nodejs.org/)
- **npm**

## Installation

Clone the repository and install dependencies.

```bash
git clone https://github.com/PeggyPsi/SoftoneEmployeeApp.git
cd SoftoneEmployeeApp
npm install
```

## Build and run

Use the following command to build and run the project

```bash
npm run dev
```

The application url to use is **http://localhost:3000/**

## Features

The application provides the following features:

### List of employees 
The employees data is fetched by a dummy API speciifically 'https://dummyjson.com/users'. Data is rendered using Material UI Table related components.

The user can filter the data based on various filters like firstName, lastName, email, department etc. Filtering is implemented on client-side due to the fact that the API does not provide an ideal endpoint for combining filters, substring matching etc. The user is also able to clear all selected filters at any point. 

The app also stores the selected filters in the browser's localStorage for the persistency of the user's preferences after a refresh or page navigation.

### Detail page of specific employee

The user can select any user from the list above and navigate to his/her detail page. The employee's data are fetched also through the API mentioned above. 

The detail page contains various information regarding the employee.

At any time the user can navigate back to the list of employees by clicking to the corresponing button.

### Dark / Light Theme

The application's theme is set up based on users system preference. Unfortunately no switch button has been implemented for the user to change the theme manually.