#Blog app in node.js

##My requirements list (not finished)
See requirements.txt ;)

Still a work in progress.

##How to make it work on your own machine

You need to have homebrew installed or something similar.

To install dependencies:
`npm install`

It also requires spinning up a mongodb server. For that you'd need to do:

```
brew install mongodb
mongod --dbpath /tmp #starts mongodb server
```

Start up the mongodb client by typing `mongo` and add an initial user with the username `mella` and (hashed) password `paard` via the client.
In the mongo db client you type:

```
use blogapp
db.users.insertOne(
        {firstname: "Melvin", lastname: "Roest", username: "mella", password: "$2a$10$Ggg0Usp6T2a.lJMbTWrLEupiZUJBjH4uQy.G1tpzxu9gX9EtnJyUm"}
)
```

Create your own config.js in the root folder and save it with `var session_secret = 'typeinanythingyouwanthere';`

To run it:
`node app.js`

The fun starts at:
`localhost:3000/auth/login`

To logout type: `localhost:3000/auth/logout`


