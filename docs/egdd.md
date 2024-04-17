# Western Weaponsmith: Code Arsenal

# Overview

## Elevator Pitch

Step into a totally accurate representation of Wild West with Western Weaponsmith: Code Arsenal, a unique single-player platformer that blends 2D adventure with coding education as players craft their weapon load-outs through coding classes to rescue the captive saloon people and conquer enemies in this comedic coding quest.

## Influences (Brief)

-   Super Mario Brothers
    -   Medium: Video Game
    -   Explanation: The main aspect pulled from Mario would be the gameplay and basic movement functionality. The movement of the character on a 2D scrolling screen, where several platforms can be moved between using jumping. It also has the functionality of picking up things that are randomly resting on different platforms. Some adversaries will need to be fought to get to the next level.
-   West of Loathing
    -   Medium: Video Game
    -   Explanation: The main inspiration pulled from this game is the graphics. Graphically, West of Loathing has a lot of charm to it. It is very simple, making it very appealing and easy to look at while adding some comedic charm to the gameplay. As far as game functionality, the game is very clean and crisp, making it clear that the simplicity and goofiness of the graphics are intentional and not a result of poor design. The goal of this game is to strike the same balance between graphical simplicity and good functionality in order to create comedic but educational and challenging gameplay.
-   Call of Duty
    -   Medium: Video Game
    -   Explanation: One feature of Call of Duty and similar games that players spend a lot of time on is weapon and character customization. This is a mechanic where the user can choose different clothes, weapons, and weapon attachments in order to personalize their avatar and optimize their loadout for each level. This aspect would be utilized in our game through coding, allowing characters to create their loadout by coding different classes and constructors.

## Core Gameplay Mechanics (Brief)

-   Navigate your sheriff using the WASD keys
-   Attack/use your item by clicking the space bar
-   Loading a new level or reaching a checkpoint will prompt the user to edit their loadout by bringing up the coding arsenal book
-   Navigate unlocked classes and types in the coding menu using the arrow keys
-   Select which part of the coding arsenal book you are writing in by selecting it with your pointer/cursor
-   Use your keyboard to type into each field of the class definition in order to create your loadout (based on the classes and types you have unlocked, as indicated in the coding menu)
-   When the user’s health reaches 0, the user will be prompted to either restart with their current level loadout, to edit their loadout, or to exit to the main menu
-   Use your weapons to defeat all enemies and advance to the end of the level in order to progress to the next round.
-   After all levels have been completed, a victory/congratulations screen will appear

# Learning Aspects

## Learning Domains

-   Introductory TypeScript Programming
-   Class Definitions in Object-Oriented Programming

## Target Audiences

-   Aimed towards novice programmers with little to no experience in writing classes and constructors in object-oriented programming languages
-   Appropriate for people 16+ who are interested in adding class definitions to their programming tool kit

## Target Contexts

-   This game would be suitable as an in-class activity for students in a computer science lab who completed their work before the end of class.
-   Suitable for in-class use, but more useful as an out-of-class activity or extra task to gain practice on the topic

## Learning Objectives

-   Writing Classes: By the end of gameplay, users will be able to write classes and constructors to initialize and create objects in TypeScript
-   Class - Object Relationships: By the end of gameplay users will be able to explain the relationship between objects and the instance variables defined in the class definition describing the object’s properties
-   Describe the “this” operator: By the end of gameplay, users will be able to describe the difference between two variables with the same name but one variable is preceded by the “this” operator

## Prerequisite Knowledge

-   Before playing the game, users must have basic knowledge of the syntax for coding in TypeScript, specifically how to define variables of specific types
-   Before playing this game, users must be able to define the use of the “this.” identifier in programming

## Assessment Measures

A short pre- and matching post-quiz asks a student to make a class object and all its attributes, as well as the constructor as well.

# What sets this project apart?

-   Most games with loadout customization involve simply selecting an attachment or buff from a menu, whereas this game allows the user to type the names of the attachments and buffs rather than navigating a menu to then click what to add. This is a completely new take on character and weapon customization mechanics
-   The gameplay mechanics of typing class definitions and returning an error when a coding mistake has been made help teach the user how to code classes in an environment very similar to an average IDE.
-   Many educational coding games focus on testing coding knowledge or running completed code and visually seeing how that code affects the environment without any further user input. With this game, however, we use classes to create objects which the user can see attached to their player in game. These objects get used in real-time in game rather than simply running a full script coded by the user. The user gets to write code that affects their gameplay experience however they like rather than writing code to arrive at a “correct answer.”

# Player Interaction Patterns and Modes

## Player Interaction Pattern

Single Player Game: Use WASD to move around the screen, and space bar, as well as other keys, to jump use weapons, and pick things up.

## Player Modes

-   Single Player: The player advances through rounds until completed all levels
-   Weapon menus: In between levels have a menu that pops up to change out weapons and modify equipment.

# Gameplay Objectives

-   Customize weapons:
    -   Description: Use classes to build and customize weapons
    -   Alignment: Lines up with the writing class learning objective as this is where they are mainly learning to write classes
-   Defeat All enemies:
    -   Description: Kill all the outlaws before they kill you
    -   Alignment: Lines up with the Class - Object Relationships learning objective, as user needs to customize there class objects to defeat the enemy.

# Procedures/Actions

Players can use WASD keys to move around the screen: forward, backward, jump, and roll

Players can use the space bar to attack with a weapon

Players use a “command window” to add on/ modify an existing weapon, or make a new one. Players will type out the classes they need to make to create new weapons.

# Rules

-   If user inputs incorrect information or has syntax errors with their code, a simple error will be displayed briefly identifying and explaining the error
-   User can only utilize classes and attributes which they have collected/already own
-   All enemies must be defeated for boss to appear
    -   “Defeated” means enemy health bar has depleted to 0 and enemy disappears from the screen
-   Can only change weapon between levels, before boss, or between deaths
-   If user health bar reaches 0, level restarts
    -   If user dies 3 times in the same level, entire game resets

# Objects/Entities

-   There is the player itself
-   All the weapons/modifiers the player will use/ can modify throughout the game
-   The extra items that can be equipped to the character such as shoes/ clothing
-   The platforms that will scroll across the screen at random intervals for the player to jump on
-   The opposing shooters that the player will have to defeat to move onto the next level
-   The portals between levels
-   The final bosses that will weather appear after the lackeys are defeated, or are just more powerful than the opposing shooters
-   The menu that contains all of the weapons/ modifiers and equipment that have been picked up by the player
-   The command window where the player types out the classes to modify/ create new weapons

## Core Gameplay Mechanics (Detailed)

-   Character navigation and Attacking: The sheriff character is controlled by the user using the WASD keys. W causes the character to jump, A causes the character to move left, D causes the character to move right, and S allows the character to quickfall if they are in the air. If S is pressed while the character is already on the ground, nothing happens. If the spacebar is pressed, the character attacks using the weapon in their hand.
-   Accessing Checkpoint: When the player character is standing on top of a checkpoint, they will be prompted to change their loadout (if they desire). Pressing the Enter key will allow them to access the weapon customization screen, where they can edit their loadout if desired.
-   Weapon Menu Navigation: When on the weapon customization screen, there is a menu on the right hand side of the window which shows the currently unlocked classes and attributes. The user uses the up, down, left, and right arrow keys to navigate this menu. The up key moves the cursor up in each menu, the down key moves the cursor down in each menu, the right arrow key moves to the next menu based on the currently selected class or attribute, and the left arrow key can be used to backtrack to the previous menu.
-   Accessing Regions on Coding Arsenal Screen: The player accesses each region in which they are able to type their code using their cursor. By navigating the cursor over a region and left clicking the region, they enter that text box to enter their code. Once in the textbox, users type their code for each class they add. After everything has been coded, the user clicks on the “Next” button, which checks if their code is correct. This will either throw an error if code is incorrect or allow them to move onto the next screen.
-   Health Depletion and Lives System: When player health reaches 0, the current level would restart. Each time the level restarts due to health depletion, the player would lose a life. If the player’s health is depleted completely 3 times on the same level, then the player loses the game, a “You Lose” message pops up and the game resets, sending the user back to the starting screen.
-   Level Completion Criteria: All enemies must be defeated to progress in the level. Once all enemies have been defeated, the boss appears at the end of the level (far right of the scrolling screen). Once the boss is defeated, the level ends and a completed level message appears on screen. The user is then brought to the level selection screen and prompted to select the next level.
-   Game Completion: After all levels have been cleared and the final boss has been defeated, a “Congratulations” message appears on the screen. The user is then prompted to either click “Restart” (which would restart the game) or “Free Play” (which would allow them to go back to the level selection screen and replay any level they have completed from the main game).

## Feedback

-   Players will receive a error message when they have a syntax or type error in their class definitions, and they cannot enter the level until everything is written correctly
    -   Harsh beep sound will be played when error message is displayed
    -   Pleasant “ding” sound will be played when code is correct and next button is clicked, displaying the character with their equipped items
-   If enemy is defeated, enemy disappears
    -   Once all enemies are defeated, boss appears, signifying advancement in that level
        -   Once boss is defeated, screen pops up showing character walking to level 2
-   When enemy and/or player is hit, respective health bar decreases
    -   If player dies in a level, number of hearts at top of screen decreases

# Story and Gameplay

## Presentation of Rules

-   Brief text explaining objectives and rules of the game appears upon starting the game
    -   These objectives will be followed by a screen briefly showing the simple movement and attack controls
-   Reference button available on the side of screen to briefly explain classes and show sample class

## Presentation of Content

-   The player is taught through examples, trial and error, and repetition
-   Player must recode loadout each level, thus forcing them to consistently rethink their logic between levels and gain practice in creating classes

## Story (Brief)

-   You need to save the captives in the saloon from the outlaws, but you can only carry weapons that have a class constructor.

## Storyboarding

Starting screen (begin game):
![Main Menu Screen](/assets/img/MainScreen.jpg "Main Menu")
Rules screen + keyboard screen:
![Rules and instructons](/assets/img/keyboard.jpg "Rules")
Level select screen:
![Level Screen](/assets/img/LevelScreen.jpg "Level")
Level 1 Start:
![Level One Start](/assets/img/LevelOneStart.jpg "Level One Start")
Level 1 Mid-Game:
![Level One Mid-gameplay](/assets/img/LevelOneMid.jpg "Level One Mid-gameplay")
Level 1 Boss:
![Level One Boss](/assets/img/LevelOneBoss.jpg "Level One Boss")
Level 2 Start:
![Level Two Start](/assets/img/LevelTwoStart.jpg "Level Two Start")
Level 2 Mid-Game:
![Level Two Mid-gameplay](/assets/img/LevelTwoMid.jpg "Level Two Mid-gameplay")
Level 2 Boss:
![Level Two Boss](/assets/img/LevelTwoBoss.jpg "Level Two Boss")
Loadout Creation Screen Menu 1:
![Loudout Creation Menu 1](/assets/img/LoadoutMenuOne.jpg "Loudout Creation Menu 1")
Loadout Creation Screen Menu 2:
![Loudout Creation Menu 2](/assets/img/LoadoutMenuTwo.jpg "Loudout Creation Menu 2")
Post-Loadout Character View Screen:
![Post-loadout Character View](/assets/img/CharacterView.jpg "Post-loadout Character View")
Background:
![Wild West background](/assets/img/WildWest.jpeg "Wild West")

# Assets Needed

## Aethestics

The aesthetics should be simple and cartoonish. The simplistic and rough around the edges aspects of the graphics should be intentional and convey a comedic charm. The comedic graphics should encourage the user to want to play more of the game while keeping them engaged and preventing them from getting bored of the coding aspects.

## Graphical

-   Characters List
    -   Sheriff (player’s character): basic stick figure, deadpan facial expression, cowboy hat
    -   Outlaw (ranged): basic stick figure, holds a ranged weapon, has a red bandana over face
    -   Outlaw (melee): basic stick figure, holds a melee weapon, has a blue bandana over face
    -   Final Bosses: stick figure with an additional twist (generally multiple limbs, multiple characters together, or some other obvious defining trait)
-   Textures:
    -   Simple. No shadows or shading on any characters or objects.
    -   No texture on objects other than solid colors (aside from background image)
-   Environment Art/Textures:
    -   Background: the background should be a blue sky, yellow sun, and brown ground (for dirt) with cactuses and tumbleweeds
    -   Environment: simple and rough around the edges, but everything should be placed with intention. Simplistic, intentionally low-level graphics.

## Audio

-   Music List (Ambient sound)

    -   Gentle whooshing wind sound (ambient): Recorded by Jake and Sibyl

-   Sound List (SFX)
    -   _pew_ sound (spoken) when gun is shot: Recorded by Jake and Sibyl
    -   _hi-ya_ sound (spoken) when character jumps: Recorded by Jake and Sibyl
    -   _oh I died_ sound (spoken) when main character dies: Recorded by Jake and Sibyl
    -   _ouch_ sound (spoken) when outlaw dies: Recorded by Jake and Sibyl
    -   _ding_ sound (spoken) when code is successfully submitted: Recorded by Jake and Sibyl
    -   _beep_ sound (spoken) when code is incorrect: Recorded by Jake and Sibyl
    -   _I did it_ sound (spoken) when level is complete

# Metadata

-   Template created by Austin Cory Bart <acbart@udel.edu>, Mark Sheriff, Alec Markarian, and Benjamin Stanley.
-   Version 0.0.3
