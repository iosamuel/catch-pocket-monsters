# Capture Pocket Monsters! — Viafoura Test

## Rules

> ⚠️
>
> - Source code **and** resulting markup will be evaluated
> - A **performant, responsive, accessible, and readable** submission is ideal.
>
> ⚠️

- Layout and colours are up to the Candidate **unless noted otherwise**.
  - All given Vue components and views may be refactored as desired.
- Submitted code should work, with no issues, in both mobile and desktop viewports.
- Desktop users should be able to successfully navigate the entire experience with a keyboard.
- Tools which must be used:
  - Vue (2.6 or 2.7 or 3.x)
  - VueX or Pinia
  - SASS
  - Any other tools the Candidate deems helpful to finish the task and/or add more polish/performance/best practices to the final product.

### Submitting Attempted Tests

The Candidate is to...

1. email back a ZIP containing their project to the original sender of this test, CCing any related parties
   1. Exclude `./dist` and `./node_modules` directories
2. upload their working project to a Git repository (such as [GitHub](https://github.com/) or similar) **AND/OR**
3. upload their working project to an online code editor (such as [codepen.io](https://codepen.io/pen/) or similar)
4. include the viewable URL(s) in the email
5. optionally include any feedback regarding the test and its instructions.

The Candidate is NOT to send multiple emails with ZIP files. If alternate versions of the game were created to showcase their talents, the Candidate may use their Git repository and share them.

## Test Resources

- API - [Documentation - PokéAPI](https://pokeapi.co/docs/v2)
- Source Code - Included in ZIP file

## Requirements

Try to have some fun but please in mind the [Rules](#rules) during development and follow these instructions as closely as possible.

### Part 1: Title Screen

Given the source code in `HomeView`, the Candidate is to add/modify the markup, styling, and JavaScript they deem essential for a website/webapp to do the following:

- **Page Title**:
  - large
  - center of viewport (both vertically and horizontally)
- **Controls Form**:
  - The user must enter their trainer's name
  - **Start Button**: when clicked...
    - page title sizes down
    - page title slides to the top of the page, centered horizontally
    - start the game (`CatchView`)
    - **[After Part 2]:** If trainer's name exists in local storage, load their data and continue the game

### Part 2: Game Components

The Candidate is free to design and lay out this page to their liking, **unless noted otherwise**, as well as adding extra functionality to the game.

> 💁 Some basic starter components have been included to be used or discarded as desired:
>
> - `.src/components/EncounterStats.vue`
> - `.src/components/EventLog.vue`
> - `.src/components/GameControls.vue`
> - `.src/components/ViewFinder.vue`

- Event log window: `EventLog`
  - Event status and messages should appear here for the trainer.
  - The trainer should be able to see all the logs from the start of their play session.
- Game controls panel: `GameControls`
  - All of the interactive elements go here.
  - **FIND**
    - Spawns a random Pokémon from generation 1 using the RESTful API given
      - If generation option select exists on Title Screen, use the user’s selection instead
    - Add Pokémon image and `EncounterStats` to viewfinder
    - Update event log to tell the trainer which Pokémon has appeared
    - Disable Find button
    - Enable Ignore and Throw buttons
  - **IGNORE**
    - Clears viewfinder
    - Disable Ignore and Throw buttons
    - Enable Find button
  - **THROW**
    - Disable Ignore button
    - Update event log with [trainer name] throws ball at [Pokémon name]
    - 1 in 3 chance for _failure_
      - If successful
        - Update event log
        - Add Pokémon to collection
        - Clear viewfinder
        - Enable Find button
        - Disable Ignore and Throw buttons
      - if failure, update event log
      - if 2nd failure in a row during the same encounter
        - Pokémon runs away
          - **(optional)** Make animations for “run away” and Ignore events
        - Update event log
        - Disable Ignore and Throw buttons
        - Enable Find button
    - **POKÉDEX (n)**
      - `n` will be the number of unique Pokémon in the collection
      - Starts at zero for new games
      - Goes up as _unique_ Pokémon are caught
      - Goes to collection screen
        - **(bonus)** Make this a proper modal window
    - **QUIT**
      - Show confirmation modal
        - Yes → back to Title Screen
          - Save important data to local storage
            - _See Part 1 about loading progress!_
        - No → close modal and continue game
- Viewfinder: `ViewFinder`
  - Must have a visible border
  - Blank at the start (and after Ignore and “run away” events)
  - Shows Pokémon sprite after Find event
  - Shows Pokémon encounter stats (`EncounterStats`)
    - Stats: name, type, height and what the Candidate would like to add (if any)
    - Must exist to the right of Pokémon on desktop viewports
    - Must exist below the Pokémon on mobile viewports

### Part 3: Collection Gallery (Pokédex)

This page (or modal window) will show a listing of each _unique_ Pokémon caught and allow the trainer to sort them by different stats and filter them by "type" with a short summary of the results. From this gallery, the trainer must have ways to go back to the game screen to capture more Pokémon.

- **Controls**:
  - Sort by: name, id, height, and speed
  - Filter by: type
    - Filters should be checkboxes.
    - Checkboxes shown should only be of the types the trainer currently has in their collection.
- **Listing**:
  - Each item must show: id, picture, name height, speed and number caught
    - **(optional)** Add any other info or functionality as desired.
    - List should update instantly upon sort or filter toggle.
- **Summary**:
  - Display the number of unique Pokémon currently shown.
  - Display the total number captured of the ones currently shown.

---

## Project Setup

```sh
npm install
```

Created using `npm create vue@latest`

### Dependencies of Note

- "pinia": "^2.1.7",
- "vue": "^3.4.15",
- "vue-router": "^4.2.5"
- **DevDependencies:**
  - "@vitejs/plugin-vue-jsx": "^3.1.0",
  - "sass": "^1.71.1",
  - "vite": "^5.0.11",
  - "vitest": "^1.2.2"

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
