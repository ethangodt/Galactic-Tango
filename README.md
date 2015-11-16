# Galactic Tango

Snakes... in space!!! Four players battle in a fast-paced game of snake.  Multiple instances are supported -- simply load the webpage, hit 'Ready', and once three other players have joined the game, the battle begins.

## Team

  - __Product Owner__: Oliver Wang
  - __Scrum Master__: Ethan Godt
  - __Development Team Members__: Andrew Vickory, Adam Grimm

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)

## Usage

This probject is deployed at https://protected-bastion-6370.herokuapp.com/

To host a local server, simple run node ./Server/server.js.  The server is currently configured to listen on port 8080.

To play, simply press the "Ready" button and wait for 3 other players to enter the game, at which point the game will begin.  Players control 'snakes' which automatically move forward.  Players may use the direction buttons to turn their snakes.  Stars will spawn (represented as yellow squares) and may be eaten to grow the snake.  If a snake collides with a wall, or the body of a snake (including his own body!), he is eliminated.  The last snake alive wins the match!

## Requirements

- Node 0.12.7
- Bower ^1.6.5
- Express ^4.13.3
- Socket.io ^1.3.7

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Tasks

Grunt?


