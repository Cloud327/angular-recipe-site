# Project requirements

**To get a grade 3, the following should be done**

### Front end
- At least 5 pages that are "responsive in design"
  - Must contain at least 1 image across all pages
  - Must contain at least 1 video across all pages
  - Must contain at least 1 table across all pages
  - Must contain at least 1 collapsable "div" element
  - Must contain at least 1 drop-down list
  - At least 1 page that shows the use of authenticationLinks to an external site.
  - At least 2 pages that show the use of authorizationLinks to an external site.
  - Must show CRUD Links to an external site.operations
    - At least one form submission that shows the authorization
- Must have at least 1 navigation menu
  - It must have at least 1 sub-menu inside one of the main navigation menu
- Client-side rendering
- Must have at least 5 calls to the back end that are done asynchronouslyLinks to an external site.
- Out of these 5, at least 2 calls are "protected" (authentication and/or authorization required)
### Back end
- Database
  - Must use a database with at least 5 tables
  - Must have the following relations
    - one to one
    - one to many
    - many to many
  - (if using a relational database) Must be a 3NF compliantLinks to an external site.
- Authentication
  - Support the creation of users, using email and password
  - Ability to log in, log out, and reset passwords
- Authorization
  - Use Access control with at least three different roles
      - Ex: Regular User, Admin, Super User
- Deployment
    - Deploy to a web server
- Use Git
    - Must use Git, and must show gradual progress
- Performance evaluation
    - Must do at least two performance evaluations
      - Ex 1: show page load loads across two different implementations, explain why 1 is better than the other
      - Ex 2: show database query results or query forming that shows which is better, and explain why so
      
**Additional work to get grade 4**

- Integrate at least three third-party packages that add services
  - Emailing
  - Storage to S3 for user file uploads
  - Adding social login
- Admin pages (do not use built-it admin pages)
    - At least 5 admin pages, that are used for managing data from the database
    - At least 1 page that supports searching, at least two search fields
    - At least 2 asynchronous calls (check for both authentication and authorization)
      - Ex: Populate table from a search query
- Advanced performance reporting
  - Ex PHP vs Python
  - Ex 1 framework vs another framework 
- Use web sockets for real-time data updates

**Additional work to get grade 5**

- Completely SOA based designed
  - use of API's based design 
  - The database runs on 1 server
  - front-end on 2nd server
  - back-end on 3rd server
- 2FA Links to an external site.Authentication (your own) implementation




# AngularRecipeSite

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
