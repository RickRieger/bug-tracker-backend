#Bug-tracker app backend
###The following are the steps I took to complete the project in the back end.

- In the terminal of my mac, type the following:

```
npx express-generator bug-tracker-backend view=ejs
```

- After installing the packages ( npm i ), installed the folloing middleware as well:

```
 npm i axios bcryptjs cors dotenv express-rate-limit jsonwebtoken mongoose validator
```

- Open in vscode, and add a markdown file, .env file, and .gitignore file to the root of the file structure.

## Research Links

- Schemas in mongodb: https://docs.mongodb.com/realm/mongodb/document-schemas/
- Time stamps in mongodb: https://masteringjs.io/tutorials/mongoose/timestamps
- Role based API authentication: https://www.youtube.com/watch?v=QbgJgZY7vBM
- Enumerations in Node.js and Mongoose: https://rclayton.silvrback.com/export-enumerations-as-static-mongoose-properties
- ROLE-BASED USER ACCESS CONTROL IN MERN STACK APPLICATIONS: https://www.theseus.fi/bitstream/handle/10024/343968/Thesis_Purna_Baral.pdf?sequence=2&isAllowed=y
- Declaring Defaults in Your Schema: https://mongoosejs.com/docs/defaults.html
- Bug tracker example: https://www.youtube.com/watch?v=vG824vBdYY8

## Continue steps...

- Started building different schemas that relate to each other for this project.
- Delete auto generated files and code from express-generator not needed for this project.
- add server.js to root folder and start up mongoose there on port 8080
