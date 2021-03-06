# One Good Knight
**One Good Knight** is a text-based, mobile-responsive choose your own adventure game. Utilizing a MySQL databse, users can sign up for the site, then create one or more knight characters to play through the game with. By selecting from one or more choices provided on each story page, users will find their way to one of five endings, with varying degrees of success or failure in achieving their objective along the way.

This is all part of This Is SPR-ta's Project Two for UCLA's Fullstack Web Development Coding Bootcamp (September 2019 to March 2020). 

**For Guest Account access, please use the following login:** email: guest@guest.com, password: 1234QWER

## How It Works
**One Good Knight** requires a login to play, thus when the site is visited, only the index page is rendered and presented until a user signs up for an account. Presently, the user's account stores their username, password, email address, and any associated game information tied to their account.

After login, a user is shown their profile page and presented with two options: "Continue Game", and "Start New Game". Selecting "Start New Game" takes users to a new page with a form. This can also be accessed from the dropdown menu in desktop view, or the menu icon and side navigation slide-out in mobile view.

![Mobile navigation demo.](mobileNav.gif?raw=true "Mobile Navigation demo.")

### Start New Game

On the "Start New Game" page, users are prompted to input a name for their knight, and then select one of three radio buttons for their knight's clan. These radio buttons have associated images for each, and display vertically.

After inputing a name and selecting a clan, a user submits the form, and is taken to the beginning of the text adventure story.

### Continue Game

If a user selects "Continue Game" on the profile page, which can also be accessed from the dropdown menu at the top of the page on desktop view, or the menu icon and side nav slide-out on mobile view, they're brought to a page listing all currently stored characters and games tied to that user's account. If there is no game information located in the database, the user will be shown a message:

``You have yet to start any games, or have deleted any you had saved. Why not start a game now?``

Then presented with a "Start New Game" button, leading to the same form as discussed above.

If a user has one or more games in progress or completed, those games will be displayed in order from newest to oldest. The clan image for each game's knight will be displayed behind and offset from that knight's game information. The game information included is the knight's name, the name of their clan, a link to continue their game, and a floating circular icon with an x through it to delete that game's information. Deletion is permanent at this point in time.

![Mobile delete game info demo.](deleteDemo.gif?raw=true "Mobile delete game info demo.")

Selecting the "Continue Game" link brings the user to that knight's current place in the story, from the last time they were playing that knight.

### Game Play

The text adventure game is played by selecting an option the user's knight takes to move the story forward. Each story page provides one or more options for a user to decide between, which then advances the story along the path the user decides. Each time a option forward is selected, that user's game information is updated to note the newest story page for their character.

As the user continues through the story, they'll eventually reach an end. There are five different endings made possible, with various narrative consequences or rewards for each. Upon reaching a story end, the user is invited to "Return To Profile" or "Start New Game." 

![Mobile functionality demo.](functionDemo.gif?raw=true "Mobile functionality demo.")

## Langauges Used
* CSS3
* HTML5
* JavaScript

## Libraries Used
* Materialize

## Dependencies
* bcryptjs
* express
* express-handlebars
* express-session
* mysql2
* passport
* passport-local
* sequelize

## Other Technologies Used
* Heroku
* Jaws_DB

## Other Resources
* Favicon.io (https://favicon.io/) for favicon generation.
* Subtle Patterns (https://www.toptal.com/designers/subtlepatterns/) for the background image tile.
* Unsplash (https://unsplash.com/) for the image used as a general icon for the website.

## Stretch Goals
* Password recovery.
* Tracking game progress to prevent players from going back and changing their answers to progress down a different path.
* Disguising routes/hiding routes so players can't directly input a location into the url.
* Update capabilities for User Profile. (Update Name, Email, Profile Image).
* Administrative interface to add, delete, or restructure story elements.
* Addtional tracked and updated properties throughout the game, such as character HP, or effects related to a character's clan.
* Warning message to confirm deletion of a game's information from a user's game page.
* Rectify error messages generated by Passport which show on local properly but not on Heroku.
