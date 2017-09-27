# Internations Project - Martin Ombura Jr.

##Prerequisites
1. Install/Download [NodeJs](https://nodejs.org/en/download/)
2. Go into your commandline terminal and Install the Angular-Cli by entering
 `npm install -g angular-cli`

## 1st Step - Clone the Repo
In your command line/ terminal clone the github link provided.
Ensure you type in `git clone "repository link here"` no quote marks

## 2nd Step - Install Modules
Upon cloning the repository. Use your command line/terminal to cd/move into the repository and run `npm install` to install all the required modules thanks to Node Package Manager (NPM).

## 3rd Step - Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


##App-Availability
Incase of any issues, please email me. The website is partially deployed thanks to firebase. Check this link https://internations-project.firebaseapp.com. The first few loads of the app will be a bit slow cause of CDN, etc. Also in order to view the backend, please email me so I can add you as an Admin.

###Little Known Bugs/Unknown features. 
1. In order for creates and deletes to propagate, I have deliberately included functionality to refresh the page upon create. (Annoying? I know. But with more, time I would streamline it). To disable this look for the code `window.location.reload()` and comment it out!
2. When updating a user/group, when it comes to selecting either a user(s) for a group or vice versa, ensure you select all the ones you want including the ones that are already part of the entity. 
3. Not a bug but an annoying feature I added - A user can only be created if there is a group and vice versa. 
4. Based on the business rules I assumed a *user cannot exist without a group and a group without a user*. As expected. If you come to a point where the last user is linked to a group. Deleting either one will delete everything. Trying to create a user without there being a group or trying to create a group without there being a user will lead to the server-side logic automatically deleting the creation as it breaks the rules. To overcome this, ensure the application is not running i.e the browser with tab `http://localhost:4200` is not open. Then manually create the entries in the database. It's a bit of a harsh strategy but I seen an opportunity for Admin rules to override this, so that users do not create empty groups etc.

To remove the server-side logic, the files user.component.ts and group.component.ts have the following comments `//ServerSide LOGIC - I WOULDNOT INCLUDE IN A REGULAR APP. CHECKS FOR DB-INCONSISTENCIES AND EITHER AMENDS OR DELETES` delete the code immediately beneath it. The app should keep running.