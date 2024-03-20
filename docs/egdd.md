# Schedulsine


## Elevator Pitch


*A one sentence pitch for your game. Pretend that your were pitching your game to a executive going to the elevator. You have less than 60 Seconds. Check [this resource](http://www.gameacademy.com/perfecting-indie-games-elevator-pitch/) for more information.*


## Influences (Brief)


- Overcooked:
 - Medium: Game
 - Explanation: Overcooked perfectly simulates the fast-paced environment of a kitchen brigade. Although our game is not focused on the intricacies of cooking, we are influenced by the overall perspective it provides of the entire kitchen situation. It provides timers for each ticket, which makes time a primary aspect of the game, similar to how time is a primary aspect of most scheduling algorithms. We hope to carry over a similar high-intensity feeling.
- Cooking Simulator:
 - Medium: Game
 - Explanation: Cooking simulator using some ideas that we would love to implement within our game. Some of these include the ticket system, which has all the orders in a very clean, queue-like mechanism. They also have a rating system which is satisfying and a direct reflection of the person's performance, which is something we want to mirror in our game regarding runtime or turnaround time performance.
- Hell’s Kitchen:
 - Medium: Television Series
 - Explanation: Hell’s kitchen is the epitome of the stereotypical fast-paced, high-stress cooking situation. While we do not want to make the player feel bad, it would be interesting to include a comically-tough feedback system when a player makes a mistake, simulating Gordon Ramsay’s insults in a SFW and topic relevant manner.
- Cooking Dash:
 - Medium: Game
 - Explanation: The game opens up with a comical preview of the character and just some insight as to more or less what is happening in the game. As the intro ends it opens up with the character taking a position from the comic and letting the person who wants to play know what the character is going to do. We would like to implement this in a way to introduce the algorithm required to play out game schedulsine.


## Core Gameplay Mechanics (Brief)


- Player assigns part of a dish to a station
- After player finishes all dishes, they receives a metric report of their performance
- Player decides whether or not to take a dish ticket based on the algorithm
- Player is penalized if they choose the wrong dish/mess up the order
- Dish needs all parts to be completed before counted as done
- Rewarded based on consistent correct completed orders in a row.
- They get a profit (score) based on their overall metric
- Online ranking system so students can be in a challenge
- Player loses the shift after a set amount of mistakes 


# Learning Aspects


## Learning Domains


OS scheduling algorithms.


## Target Audiences


- Novice system programmers who have a basic understanding of what the CPU is
- Appropriate for people who are interested in how computers decide on running processes


## Target Contexts


- Could be assigned as an additional practice tool for students to study the algorithms
- Tool to competitively practice scheduling algorithms


## Learning Objectives


- Write Steps: After playing, students will be able to write out the steps of an OS scheduling algorithm.
- Use Case: After playing, students will be able to justify why a certain algorithm would be used over another.
- Define Quantum: After playing, students will be able to define what a quantum is in the context of OS scheduling algorithms.


## Prerequisite Knowledge




- Prior to playing, students should be able to define the concept of scheduling jobs on the OS.
- Prior to playing, students should be able to describe the concept of an algorithm.


## Assessment Measures


A pre- and post-test will be given in the format of a job tracing worksheet.
- The worksheet tells them to trace which job is on the CPU at a certain time
- The algorithm they need to follow is given in name only


# What sets this project apart?


- Our game teaches algorithmic concepts with no requirement of pre-requisite coding knowledge and requires no coding in the game at all.
- The game will be quite quirky and humorous, providing funny audio snippets when a player messes up or does well.
- The concept of deciding which dishes to cook in an industrial kitchen maps to the decision an OS needs to make when deciding which job to run.


# Player Interaction Patterns and Modes


## Player Interaction Pattern


Only one player interacts with the system at a time. This player is the one who selects which orders (jobs) to run in the kitchen, and who decides which station the subcomponents of the dish go to. Essentially, they have full control of the system, alone. 


## Player Modes


- Main Menu: Player is able to select from various game modes, a rudimentary settings menu, a global leaderboard view, as well as an exit button to leave the game.
- Tutorial: Demonstrates the basic mechanics of the game without teaching a scheduling algorithm. Shows the player how to schedule dishes, how to complete their various components, and finally how to send them off to the dining room. This mode is only accessible from the menu.
- Career: The main game mode. This will take the player through a week of restaurant service, where each day covers a different scheduling algorithm.
- Competitive: The sandbox mode where the player is not instructed to follow a certain algorithm, but left to their own devices. The profit (calculated from their metrics) will be added to a global leaderboard (database) to introduce a competitive aspect.


# Gameplay Objectives


- Gain a profit after a shift:
   - Description: Failure to deliver a dish in accordance with the respective scheduling algorithm, or failure to make the dish properly will result in a loss of profit, potentially going negative. By following the algorithm correctly, the player will be able to end the shift with a positive profit.
   - Alignment: Gaining a profit primarily reflects the player’s ability to understand and implement the scheduling algorithm.
- Advance to the next day:
   - Description: If the restaurant does not make a profit with the given algorithm, the player will have to repeat that shift (day) via performing another service using that algorithm.
   - Alignment: By advancing the days, the player is able to follow the algorithm correctly, and therefore most likely grasps its concepts.
- Advance to the next day:
   - Description: If the restaurant does not make a profit with the given algorithm, the player will have to repeat that shift (day) via performing another service using that algorithm.
   - Alignment: By advancing the days, the player is able to follow the algorithm correctly, and therefore most likely grasps its concepts.


# Procedures/Actions


*Describe the control scheme and what actions a user can take in the game.*


# Rules


*What resources are available to the player that they make use of?  How does this affect gameplay? How are these resources finite?*


# Objects/Entities


*What other things are in the world that you need to design? These may or may not directly translate to actual objects and classes.*


## Core Gameplay Mechanics (Detailed)


- *Core Gameplay Mechanic #1*: *Describe in 2 paragraphs or less, along with how it generally works*
- *Core Gameplay Mechanic #2*: *Describe in 2 paragraphs or less, along with how it generally works*
- *Core Gameplay Mechanic #3*: *Describe in 2 paragraphs or less, along with how it generally works*


  
## Feedback


*Explicitly describe what visual/audio/animation indicators there are that give players feedback on their progress towards their gameplay objectives (and ideally the learning objectives).*


*Describe what longer-term feedback you detect and give that guides the player in their learning and lets them know how they are doing in regards to the learning objectives.*


# Story and Gameplay


## Presentation of Rules


*Briefly describe how the player will learn the gameplay mechanics. Avoid using walls of text, since people will not read them. Think instead of natural ways of teaching mechanics iteratively and slowly.*


## Presentation of Content


*Briefly describe how the player will be taught the core material they are meant to learn. Avoid using walls of text, since people will not read them. Think instead of natural ways of teaching material iteratively and slowly.*


## Story (Brief)


*The Summary or TL;DR version of below*


## Storyboarding


*Go into as much detail as needs be to visually convey the Dynamics of your game. Be detailed. Create storyboards and freeze frame images that concisely capture important key elements of your game. You are strongly recommended to sketch pictures on paper and embed them here. Be sure make it clear how previously-described mechanics come through in the dynamics.*


# Assets Needed


## Aesthetics


*Give a sense of the aesthetics of your game, the spirit and atmosphere. Use descriptive, evocative words that can help the reader understand the emotional response of your game.*


## Graphical


- Characters List
 - Restaurant manager: Talking head which instructs you to follow certain scheduling algorithms
 - Chefs: A collection of generic looking chef sprites which will walk autonomously towards stations that you designate parts of the dish to.
 - Waiter: Sprite who will walk up to the service area to retrieve the finished dishes.
- Textures:
 - *Texture 1*
 - *Texture 2*
 - *...*
- Environment Art/Textures:
 - *Environment Texture 1*
 - *Environment Texture 2*
 - *...*




## Audio




*Game region/phase/time are ways of designating a particularly important place in the game.*


- Music List (Ambient sound)
 - *Game region/phase/time*: *Example 1*, *Example 2*
 - *Game region/phase/time*: *Example 3*, *Example 4*
 *Game Interactions are things that trigger SFX, like character movement, hitting a spiky enemy, collecting a coin.*


- Sound List (SFX)
 - *Game Interaction*: *Example 1*, *Example 2*
 - *Game Interaction*: *Example 3*, *Example 4*




# Metadata


* Template created by Austin Cory Bart <acbart@udel.edu>, Mark Sheriff, Alec Markarian, and Benjamin Stanley.
* Version 0.0.3




