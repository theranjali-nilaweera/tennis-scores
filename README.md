# TennisWorkspace

# Assumptions:
### About the code
- There is no scenario where in a game if a person is only ahead by 1 point and from there onwards they keep getting the same points: ie: no one ever gets 2 points ahead
- There is no special ruls apart from the simple rules ie: 
for a game playerAWin>4 or playerBWins>4 &&  abs(playerAWin-playerBWin)>2
for a set win whoever gets 6 games wins the set
- There is no scenario where scores been equal and different ruls apply
- The data validations in the inputs sub classes providers has been ignored for now. TODO add zod


### About your env

-You have fnm/nvm or some version manager installed so u can easily switch the version used in this project

-You will use bash/zsh or similar terminal to run the scripts


## Trial some responses

Go to below URL and try it out

https://tennis-api.adaptable.app/api#

## Start the app

Dev mode
```
npm run serve:api
```

Open your browser and navigate to http://localhost:3000/api#


## Running tasks
```
npm run test:api:watch

npm run start
```
For more scripts check the package.json scripts


## TODO Improvements
- Add some more test scenarios
- Mock services to control the tests scenarios
- Add middleware for a nice error handling experience
- Add a zod to do validations
- Save processed scoreFile to disk so repetitive reads/processing file can be avoided
- Add a UI that would give the combined input for scores and games api endpoints



✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨




# The Problem statement: Tennis Calculator

The tennis calculator takes a set of scores as inputs and produces useful statistics based on those scores.

This calculator will use a simplified version of scoring where whoever gets to 6 games first wins the set

## Overview

The Tennis Calculator takes inputs in the form of a list of points of a tennis match. 

Given this list of points, it will calculate the "games", "sets" and "matches" results.

From there it can be queried about various statistics around the input matches it received. 

## Input

The input will have some header lines, and then a list of points. 
For example:, the following would result in 2 games to "Person A":

    Match: 01
    Person A vs Person B
    0
    1
    0
    1
    0
    0
    0
    0
    0
    0

10 rows
    
The first row is a match id, the second row shows who is playing against whom.
After that are a series of points, where 0 is a point for the first person listed, 1 is for last person.

i.e.

| Input                | Score   |
|----------------------|---------|
| Match: 01            |         |
| Person A vs Person B |         |
| 0                    | 15 - 0  |
| 1                    | 15 - 15 |
| 0                    | 30 - 15 |
| 1                    | 30 - 30 |
| 0                    | 40 - 30 |
| 0                    | Game    |
| 0                    | 15 - 0  |
| 0                    | 30 - 0  |
| 0                    | 40 - 0  |
| 0                    | Game    |


For processing, blank lines must be ignored

## Queries

### Query match result
Query scores for a particular match
Prints who defeated whom, and the result of the sets for the match (winning player score first).

Query: `Score Match <id>`

Example: `Score Match 01`

Example output:

    Person A defeated Person B
    2 sets to 0
 
### Query games for player
Prints a summary of games won vs lost for a particular player over the tournament
Query: `Games Player <Player Name>`

Example: `Games Player Person A`

Example output:

    23 17

## Sample output
Running the application against the 'full_tournament.txt' file results in the following:

    $ python tennis_calculator_app.py test/test_data/full_tournament.txt << EOF
    Score Match 02
    Games Player Person A
    EOF
    
    Person C defeated Person A
    2 sets to 1
    
    23 17
    


## Scoring Rules
Details of tennis scoring can be found online. See here for reference:  
https://en.wikipedia.org/wiki/Tennis_scoring_system

The variation used for this application is a best of 3 sets match, with first to 6 games wins a set. 

Details as follows:
* A tennis match is split up into points, games and sets.
* Winning a game requires a person to win 4 points, but they must be ahead by at least 2 points (deuce, advantage						, game)
* The first player to win 6 games wins a set. I.e:
    * Players do NOT need to be ahead by 2 to win a set (6-5 finishes a set) 
    * There is nothing special about that final game in a set. All games are the same.
* Best of 3 sets (first to 2 sets wins).

what happens to a game if a person is only ahead by 1 point or is getting same points after each, how long would it go on for 



