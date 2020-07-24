# BetVictorRho
Job Interview Challenge

# Dependencies
```
npm i
```

# How to run
```
npm start
```

# How to run all tests
```
npm run test
```

# Endpoints

- **List all sports:**

&nbsp; &nbsp; &nbsp; /sports/languages/{lang}

- **List all sports in all languages**

&nbsp; &nbsp; &nbsp; /sports/languages/all

- **List all events per sportId (sportId is optional parameter)**

&nbsp; &nbsp; &nbsp; /events/{lang}?sportId=sport_id

- **List all data for a given event**

&nbsp; &nbsp; &nbsp; /events/{lang}/{eventId}

- **List all sports names for a given language or for all languages (if no language is provided)**

&nbsp; &nbsp; &nbsp; /sports/names?lang=langCode

- **List all events names for a given language and sportId or all events names for a given language (sportId is optional parameter)**

&nbsp; &nbsp; &nbsp; /events/names/{lang}?sportId=sport_id
