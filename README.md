# Journal Frontend

<img width="800" height="585" alt="example" src="https://github.com/user-attachments/assets/32af719d-ee78-4c3d-a9aa-0a76617a5e7a" />

## What is it?
This is the frontend of a project where you can log your mood over time, and get statistics based on them. See also the more technical README of the project on [the backend](https://github.com/williameliasson/journal-backend). This README focuses more on the features rather than the technical aspects of the project.

## How to run
1. Make sure you have [Node](https://nodejs.org/en/download) and [Angular CLI](https://angular.dev/installation) installed.
2. Run `npm install` to install dependencies.
3. Run `ng serve --configuration development` to start the app in dev mode.
4. The app should now be available on http://localhost:4200

## Features
* Register / login users.
* Validation on register and login form fields.
* Create Journal Entry by entering a title and choosing a mood from the predefined Moods.
* View your own Journal Entries as timeline.
* View statistics based on a start and end date.


## Tech used
* Angular
* ChartJS + ng2-charts
