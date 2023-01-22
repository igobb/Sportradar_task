# Sportradar recruitment task


## About
* [Introduction](#introduction)
* [Technologies](#technologies-used)
* [Setup](#setup)
* [Project Status](#project-status)
* [Contact](#contact)


## Introduction
That is my task for recruitment process.

<details>
  <summary>Task description</summary>
  
Step 1: Display results table of Ekstraklasa 20/21 season

 
API:
In your code, please use endpoint and parameters below:
GET Season Schedule soccer/trial/v4/:language_code/seasons/:season_id/schedules:format 
 :language_code – en 
 :season_id - sr:season:77453 
 
 
Description:
·	Table should be divided into 2 columns
·	In the first column display Team Names
·	In the second column display result
·	Commit your changes 

 
Step 2: Display more information in the results table 

 
Description:
·	Add new columns to your table with match date, half time score, and stadium name 
·	Move team names into separate columns 
·	Make team name cell background different depending on result
o	Red – if team lost 
o	Green – if team won
o	Orange – if match ended in a draw
·	 Commit your changes 

 
Step 3: Add season filter to results table 

 
Description:
·	Add „Seasons” dropdown above results table
·	Dropdown options should be fetched from the API:
o	 GET Competition Seasons soccer/trial/v4/:language_code/competitions/:competition_id/seasons:format 
 : language_code – en 
 :competition_id - sr:competition:202 
·	Or hardcoded:
o	sr:season:67233 - Ekstraklasa 19/20 
o	sr:season:77453 - Ekstraklasa 20/21 
o	sr:season: 84320 - Ekstraklasa 21/22 
·	Reload results table on dropdown change using endpoint from step 1
·	Commit your changes


 Step 4: Match info sub page 
 
 
Description:
·	When clicking on matches table row, user should be redirected to a new match info sub page
·	Use endpoint below to fetch match info:
o	GET Sport Event Timeline soccer/trial/v4/:language_code/sport_events/:sport_event_id/timeline:format 
 :language_code – en 
 :sport_event_id – you will find ID in the endpoint from Step 1
·	On a subpage display data about a match, teams, result, and data in Timeline property 
·	Use your CSS skills to display match data in a nice way
·	Commit your changes

 
Step 5: Add any new features by your choice


Description:
In this step you’re free to add whatever features you like, think about refactoring, style improvements, use of another endpoints, etc.

  
</details>


I used a CORS Anywhere, becouse CORS Anywhere helps with accessing data from other websites that is normally forbidden by the same origin policy of web browsers. This is done by proxying requests to these sites via a server. 
To use the API, I just prefixed the API URL with the 'https://cors-anywhere.herokuapp.com/'. 
For example, instead of requesting:

```
https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=cwy2c5a7sxaeyjspgucjtkgz
```

I requested: 

```
https://cors-anywhere.herokuapp.com/https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=cwy2c5a7sxaeyjspgucjtkgz
```

CORS Anywhere will then make the request on behalf of your application, and add CORS headers to the response so that your web application can process the response.

(RECOMMENDED) Other way to request the API:

1. Download and turn on this extension https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=pl
2. Dont use preceding the API address (https://cors-anywhere.herokuapp.com/), should looks like, for example

```
https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=cwy2c5a7sxaeyjspgucjtkgz
```


## Technologies Used
* React
* React Bootstrap
* React Hooks
* Axios for fetch API
* Cors anywhere heroku app (https://cors-anywhere.herokuapp.com)

## Setup
To run this project, turn on 'Allow CORS: Access-Control-Allow-Origin' extension and click this link:

⭐ <a href="https://igobb.github.io/Sportradar_task">Sportradar task</a> ⭐

IF YOU SEE AN ERROR SCREEN, JUST REFRESH PAGE

or follow these steps:

1. Clone the repository to your local machine.
2. Open the 'Sportradar_task' directory as a project in your IDE.
3. If you want to use Cors Anywhere - Go to this page - https://cors-anywhere.herokuapp.com/corsdemo, when it opens, click on the button "Request temporary access to the demo server". In code [Table.jsx and MatchInfo.jsx] just prefixed the API URL with the 'ttps://cors-anywhere.herokuapp.com/' (EXAMPLE: https://cors-anywhere.herokuapp.com/https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=cwy2c5a7sxaeyjspgucjtkgz)

If you dont want to use Cors Anywhere, make sure you turn on 'Allow CORS: Access-Control-Allow-Origin' extension.


4. In the terminal, enter one of the following commands:

```
npm start
npm run start-pc
```

## Project Status
Project is: _complete_


## Contact
Created by [@IGoB](https://igobb-portfolio.netlify.app/) - feel free to contact me!
