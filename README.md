# Experiencing Ward One - Three.js Research Prototype

## Project Overview

This repository contains my individual research prototype for CSCE 490
at the University of South Carolina.

Our capstone project, Experiencing Ward One, aims to create an interactive
3D environment where users can explore the history of Ward One, a
predominantly Black neighborhood that once existed near what is now
the University of South Carolina campus.

For this research milestone, I explored Three.js to better understand
how we could build an interactive historical environment in a web browser.

## Technologies Used

- JavaScript
- Three.js
- WebGL
- HTML/CSS
- Vite
- Node.js and npm


## Application Features

## Application Features

- **3D Environment:** Created a basic environment using Three.js geometry, materials, and lighting.
- **Interactive Camera:** Implemented OrbitControls to rotate, zoom, and pan around the environment.
- **Object Interaction:** Used raycasting to detect building clicks and display historical information.
- **Historical Transformation:** Created modern and historical building representations that users can switch between.
- **Year Selection:** Implemented a dropdown that controls the building's appearance and stays synchronized with the transformation button.

## Three.js Concepts Researched

Through this research, I explored how Three.js uses scenes, cameras, and WebGL rendering to display 3D environments. I learned how geometry and materials define objects, how lighting affects their appearance, and how OrbitControls and raycasting allow users to interact with the environment. I also explored application state to manage transformations between modern and historical representations.

## Research Findings

### Advantages of Three.js

- Runs directly in modern web browsers.
- Integrates with JavaScript and existing web technologies.
- Supports interactive 3D environments.
- Allows developers to manipulate objects.
- Can integrate HTML interfaces with 3D content.

### Challenges Encountered

- Understanding 3D coordinate systems and camera positioning.
- Learning how geometry, materials, and lighting interact.
- Converting mouse coordinates for raycasting which informs object interaction.
- Managing canvas dimensions when resizing the browser, camera would lose building.
- Synchronizing multiple interface controls with application state.
- Learning that Three.js mesh objects cannot be styled directly using CSS IDs like HTML elements.
## Future Development

For the actual capstone project, our team could explore:

- Importing historical 3D building models.
- Creating a larger representation of Ward One.
- Implementing third-person character movement.
- Developing interactive NPCs.
- Adding historical photographs and primary sources.
- Improving the historical transformation mechanic.
- Optimizing the application for different devices.

## Limitations

The current application is a technical prototype rather than a
historically accurate reconstruction.

The buildings are represented using basic geometry, and the
historical years are illustrative placeholders.

## Running the Application

Clone the repository:

```bash
git clone https://github.com/cmhanner/ward-one-threejs-research.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address provided by Vite.

## Course Information

Course: CSCE 490 - Capstone Computing Project

Institution: University of South Carolina

Milestone: Individual Research Milestone