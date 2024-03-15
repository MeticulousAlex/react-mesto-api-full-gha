# Mesto ![Static Badge](https://img.shields.io/badge/In progress-!-yellow)

This is an assembled version of `express-mesto-gha` and `react-mesto-auth`

The end purpose of a project is an application with authorization implemented through validated forms, the ability to create cards and like/dislike them, change username and email of an account and automatically log in using JWT-signed userId.

Upd: The public IP of the virtual machine has changed (malfunction of authorization occurred), fix is underway.


## Technologies
- React
- JS
- CSS
- NodeJS
- Express
- MongoDB
- JSON Web Token
- OpenSSH
- NGINX
- PM2
- ESLint
- Joi Validation
- Postman

## Features
- Ability to create an account
- Name and email of an account may be changed manually by user
- Ability to create/remove user's cards
- Like/dislike of all cards
- Management of database of users and their cards
- Model mask/Joi validation
- User's password is stored in the database as a hashcode
- JWT verification 
- User's JWT-signed Id is sent to frontend as a cookie
- Centralized error handling

## Documentation

### Register / Login

Unauthorized user is not allowed to visit the main page, so he is redirected to an `auth page`, where the user must fill in his name, email and password to create an account and continue or if user already has one, he should click the ***already have and account?*** button below and fill in his email and password in order to proceed to the main page.

As a new user account is created on the front end of the application, the user's password and email are passed to the backend where they are validated using Joi. Then, the password is encoded to a hash code to keep it safe outside the program. Next, user's data with an encoded password is forwarded to the MongoDB database as a new Mongoose model.

During the Login process, received data is similarly validated using Joi, then if the coincidental email is found in the database, the stored password is decoded from the hash and compared to the received one. If the password is also alright, userId (is equal to the Id of a database cell of a user) is signed with JWT and then passed to the frontend as a cookie attached to the response containing user's data.

Auto-login is available for a week after the last login/registration. During this time a cookie with JWT signed userId is stored in a browser. The next time the user visits the application, the cookie is sent to the backend with an automatic initial request, where the JWT-signed userId will be extracted from the cookie and compared to other existing userId until it matches one. As userIds match, the user's data is forwarded to the front end.

### Cards
 
An authorized user is able to create new cards, by clicking `[ + ]` button and filling in a card's name and attached image URL. Then the card information is Joi validated and put into the separate database table with an `owner` property similar to user's Id.
A card also may be deleted by clicking a trashbin icon on the user's own cards. Deletion of other users' cards is not allowed.

As the user sets 'like' to a card it's Id is then appended to an array of liked cards in the current user's cell property `liked_cards`. Card may be disliked similarly, but the card's Id is removed from an array in this case.
The cumulative amount of likes set by all users on each card is displayed.

### Update of user's info

User can change the avatar photo, name or description.

To change avatar click the current avatar and in the appearing pop-up window fill in a URL of another image.

To change name or description click `edit` button near the current name and in the appearing pop-up you can manage your credentials.

A new user's name, description or avatar URl is passed to the backend, validated through the Mongoose model mask and replaced in the database.

## Project Links

- Mesto: https://alexsng.mesto.nomoredomainsmonster.ru

## Feedback

If you found this project interesting or have any comments, please write me back at aleksandr.smelov.web@gmail.com. 
