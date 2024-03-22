# Jungle Quest

## Elevator Pitch

Jungle Quest follows a cute jaguar character through a series of levels that teach basic programming concepts such as classes and for loops.

## Influences (Brief)

- Putt-Putt: Saves the Zoo:
  - Medium: Game
  - Explanation: It’s an educational adventure game where you solve various puzzles to help the main character Putt-Putt rescue baby animals. Jungle Quest will have a similar puzzle adventure format with a friendly main character.

- Code.org:
  - Medium: Game
  - Explanation: Jungle Quest will have drag and drop block coding similar to the hundreds of themed Code.org levels that teach basic programming concepts and algorithms.

## Core Gameplay Mechanics (Brief)

- Drag and drop blocks representing code to fill in blanks or make corresponding actions occur on the screen depending on the level
- Collectables around game screens, stored in a popup menu on the main screen
- Timed levels with higher score for faster completion time and better accuracy (stretch goal)

# Learning Aspects

## Learning Domains

Introductory Python Programming

## Target Audiences

Our learners are older elementary aged children, ideally ages 8-11. Learners will not have much prior programming experience, and should be able to read.

## Target Contexts

As more schools are implementing basic computer science education throughout k-12, this game would be played during introductory lessons on logic, algorithms, and simple programming concepts. It can also be used as a casual computer lab activity. Audio will have a mute button, allowing the game to be played quietly in the classroom.

## Learning Objectives

- Classes: By the end of the lesson, players will be able to complete the fields of a class based on a given object.
- Use Conditionals: By the end of the lesson, players will be able to use branching conditionals.
- Trace Loops: By the end of the lesson, players will be able to use iterative loops to solve problems.

## Prerequisite Knowledge

- Prior to the game, players should be able to read and type.

## Assessment Measures

A pre-test and post-test should be administered to assess students’ understanding.

- Given an image of an object, which of these values would correctly complete the following class?
- Given an if-statement, what would the result be if our animal is a yellow hatless monkey?
- If we have a row of five trees, how many swings would it take for a monkey to go from one end to the other?

# What sets this project apart?

- Jungle Quest aims to teach the concept of classes, a topic most computer science games overlook, in addition to conditionals and loops 
- The collectable system and timed star rewards encourage replayability and will keep players engaged
- Players will use block coding to solve puzzles, introducing the concept of programming in a non-intimidating way

# Player Interaction Patterns and Modes

## Player Interaction Pattern

This is a single player game where the user clicks and drags with their mouse.

## Player Modes

- Main menu: Contains start button, credits, collectable menu button, and a level select button that is only seen once a player has completed each level sequentially
- Level 1/Level 2: Contains a help button, reset button, and a puzzle activity solved by dragging blocks. After the level is completed, a popup with a number of stars corresponding to the accuracy and speed of completion will appear with a next button that progresses players to the next level.
- Level 3: Contains a help button, reset button, and a puzzle activity solved by dragging blocks together. After the level is completed, the star popup and a button will appear that returns the player to the main menu, where they now have access to all the previous levels.

# Gameplay Objectives

- Solve each level’s puzzle:
    - Description: The levels will have an interactive problem requiring the player to organize blocks representing code. Each block will correspond to an action on screen. Using the blocks correctly will solve the puzzle, allowing the player to advance. Solving the level faster and with fewer mistakes will earn the user more stars 
    - Alignment: Classes, Use conditionals, Trace loops 
- Find hidden collectables:
    - Description: Each level will have a few small hidden collectables around the screen, which can be viewed from the main menu

# Procedures/Actions

You can click on the reset or help button. You can drag the “code” blocks into a designated location, and stack them together depending on the level. 

# Rules

Players will have access to a “tooltip” help button. This button will give a hint to the player about how to proceed through the current objective, as well as potentially restating the objective should it not be present on the screen. 
Players can click and drag blocks representing code to stack them together.
If players make a mistake, they can click the reset button.


# Objects/Entities

- Code blocks for each level
- Help and Reset buttons
- Objective text
- Collectables around the screen

## Core Gameplay Mechanics (Detailed)

- Block Coding: There will be a portion of the screen dedicated to storing draggable blocks that represent code. The blocks can be stacked together, or dragged into a text box depending on the objective of the level. 
- Collectables: Hidden around the screen, there will be 2-3 jungle themed collectables in the environment that can be clicked on by the player and added to their collection. Their collection can be seen from the main menu. They have no functionality other than a motivator for encouraging careful attention and level replay.
- Completion Stars: When the player completes a level, a popup with 0-3 stars will appear depending on how many mistakes were made and how fast the level was completed. A formula will be written to calculate the number of stars that will appear.

    
## Feedback

When the player correctly completes an action, a sound effect will play and the game will progress. At the end of each level, the player will be sent to the next level. When a wrong action is taken, animals will display actions signaling a mistake, such as a monkey falling out of a tree. If the player makes a mistake, the environment will react to it, so if they try to make a monkey swing 3 trees when there are only 2 trees, the monkey will look confused or will try to swing when there is no tree and fall to the ground.

As the player makes their way through the game, they may be given a badge or something to show that they have completed the exercise meant to teach them the topic. If they do well on the post exam, they will be given a score showing how well they did.

# Story and Gameplay

## Presentation of Rules

The player will learn the game mechanics through multiple, small tooltip popups. It will walk the player through the game mechanics needed for the specific level by having pop ups that show where to click on certain things by darkening the rest of the screen slightly, while further illuminating the necessary area to teach the player. If a player wants further help learning the mechanics, they can click the help button for further assistance.

## Presentation of Content

The player will learn the core material through each of the three levels. In level 1, which teaches classes, players will see an image of a monkey and fill in a Python class with different fields representing different descriptors of the monkeys. For example, there would be a monkey with a hat, so they would drag the block “true” to the “has_a_hat” field. They would do this for multiple different monkeys, to show how to make an instance of a class. In level 2, which teaches conditionals, there will be some conditions we have to meet to catalog the animals. For example, we only want to record the yellow animals without hats, so the player would fill out an if statement that would check if the animal’s has_a_hat attribute is false, then if the animal’s color is yellow. The complexity would increase for each correct if statement. In level 3, which teaches iteration, the player will use blocks to represent a for loop to help monkeys complete various tasks, like swinging through a group of 4 trees. 

## Story (Brief)

You are a jaguar in a jungle that is traveling along with a band of monkeys. In each level, you are introduced to a basic programming concept through a puzzle that requires dragging and dropping blocks to solve.

## Storyboarding

![IMG_7149](https://github.com/UD-S24-CISC374/final-project-apricot/assets/98707863/f75d6cae-9e8d-4ea7-9cde-2f3136dab7ea)



![IMG_7152](https://github.com/UD-S24-CISC374/final-project-apricot/assets/98707863/33eaaad9-7ba3-42b4-b996-33eb1c701d9c)

![IMG_7153](https://github.com/UD-S24-CISC374/final-project-apricot/assets/98707863/71d3266a-142b-4c05-8296-d14a125fa77c)

![IMG_7154](https://github.com/UD-S24-CISC374/final-project-apricot/assets/98707863/ec71c856-23b2-4cf3-accf-2510b2dc7524)


# Assets Needed

## Aesthetics

The general aesthetic of the game is a jungle adventure, featuring lots of imagery of wildlife, plants, and a busy screen. The game is meant to invoke a sense of adventure, where the wonder of the jungle is all around them. With happy and friendly characters, it is meant to feel safe and fun, while still having some level of wonder.

## Graphical

- Characters List
  - Jaguar (currently unnamed): need a cartoonish asset of a jaguar in both standing and sitting positions, potentially with a walking animation
  - The Monkeys: need a cartoonish monkey asset that is easily editable
  - Other rainforest animals?: need cartoonish rainforest animals for the second level
- Environment Art/Textures:
  - Level backgrounds: the levels backgrounds should be a lush green rainforest to immerse players in the setting
  - Menu background: the menu background should be a light green to match the jungle color palette
  -Tree assets matching the level backgrounds


## Audio

- Music List (Ambient sound)
  - Menu: *Example 1*, *Example 2*
  - Levels: *Example 3*, *Example 4*

- Sound List (SFX)
  - Correct answer: 
  - Incorrect answer:
  - Finding a hidden collectable: [click](https://uppbeat.io/sfx/video-game-bonus-pop-swish/142/326)

# Metadata

* Template created by Austin Cory Bart <acbart@udel.edu>, Mark Sheriff, Alec Markarian, and Benjamin Stanley.
* Version 0.0.3
