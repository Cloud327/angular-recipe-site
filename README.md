# AngularRecipeSite

# Setting Up the Project on your computer
 - clone repo
 - run "npm install" in project directory to install all required packages
 - run "ng serve -o" to start development server and open it in browser, to run with https (for social login) run it with "--ssl true" 
 - Then you just need to install the backend https://github.com/oliolo/backend which has it's own installation.

## Getting Social Login to work

Run the frontend on https to work with facebook social login.
Go to https://developers.facebook.com/apps and create a new app. 
Select the app’s type as Business and leave everything as default. 
Go ahead and create the app. You will be redirected to the new app’s dashboard page. 
On the sidebar, you will get a link that says, “Add product”. Click it. Then find the “Facebook Login” and click on its Set Up button.
Next, choose WEB, and in the site, URL input box write ‘localhost:8000’. 
After this, click save and keep clicking on continue.
Look at the sidebar and click on Settings>Basic. 
There you will get App ID which you want to place on line 107 in the 'src\app\app.module.ts' file.








This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
