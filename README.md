# startup

## Find my notebook [here](./notes.md)

## Specification Deliverable

### Elevator Pitch
Imagine a world of brave heroes and warmongering monsters that is available at your fingertips at any time. The world has simple rules: choose to fight or protect yourself. Valuable gold can be gained from battling brutes, but beware! There are dangerous risks at every turn. Jump into adventure, and don't worry if you don't have much time, you can pick up exactly where you left off whenever it is convenient. When you and your friends fight at the same time, you can see their successes and failures as you prove to them how strong of a hero you are. Fear not, traveler, and take on this challenge head-on!

### Design Images

![Rough sketch of the main page of the app](images/cs260-app_sketch-AlexSnow.png)


### Key Features
- HTTPS Login
- Display player character and monster character
- Ability to choose to fight, heal, or run
    * Fighting removes one heart from the monster and has a chance of removing a heart from the player
    * Healing uses a limited, replenishable resource to restore one of the player's hearts
    * Running subtracts from the player's score but replenishes the healing resource by 1
- Finishing a fight, either by running or depleting the monster's hearts, displays a random different monster image (one of 2-5 monsters) and replenishes the monster's hearts
- Depleting all the monster's hearts results in the player's score increasing by a fixed amount depending on the type of monster
- Losing all the player character's hearts results in their score decreasing by a fixed amount depending on how high their score is
- Game state is persistently stored in database and linked to the user
    * Number of player hearts
    * Number of monster hearts
    * Which monster is being displayed
    * Amount of healing resource
    * Score
- The most recent important events are displayed for all users in the form of simple text and a timestamp; for example, when a user defeats a monster, all users, including the user who defeated the monster, see a message in the adventure log that says 
>*USERNAME* defeated a monster! 5:34 PM

