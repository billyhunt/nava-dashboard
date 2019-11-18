## Billy Hunt's Nava Project

###Install instructions

My project consists of two parts.  

###1.  simple-node-api
  simple-node-api is an api you run to send out batch requests.  To install

```
cd simple-node-api
npm install
npm start
```

This will run a simple API on port 8000 of your machine (localhost)

###2.  nava-dashboard
This is the very beginning of a dashboard that displays the schema and converts and displays the data (the files are located here), and allows you to send the put request.  If all requests succeed, then a 201 response is given.  If any of them fail, a 500 is sent back the user gets a message to try again.  

To install:
(In a separate terminal window)
```
cd nava-dashboard
npm install
npm start
```

You can now use http://localhost:3000/ to initiate the records transfer.

###Notes and Assumptions
####Things the dashboards needs
1.  Display information in a table
2.  Have a timer to repeat request the user desires
3.  Ability to upload new data or schemas
4.  Better Documentation
5.  Better Exception Handling
6.  Fix security vulnerabilities
7.  Design
8.  Performance improvements.  I built this with create-react-app, which is quick to build, but probably has things we do not need in a production environment.

####Things the API needs
1.  A database to store which requests succeeded, and which failed.
2.  Better exception handling
3.  Better Documentation
4.  Testing
5.  Perhaps some throttling if the API is not robust
6.  Fix CORS, which was turned off for local development of this project.