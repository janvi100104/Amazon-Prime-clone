# Smart Hostel Room Allocation System

A frontend-only hostel room management and allocation system built with React, TypeScript, and Tailwind CSS.

## Features

- **Add Rooms**: Create rooms with capacity, AC, and washroom specifications
- **View Inventory**: See all rooms in a responsive grid layout
- **Search & Filter**: Filter rooms by capacity, AC, and washroom availability
- **Smart Allocation**: Automatically allocate rooms based on student requirements
- **Data Persistence**: All data stored in browser localStorage

## Technology Stack

- React 19 + TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- localStorage API (Data persistence)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## How It Works

The room allocation algorithm works as follows:
1. Filters rooms by AC and washroom requirements
2. Filters rooms where capacity >= number of students
3. Sorts remaining rooms by capacity (ascending)
4. Selects the first room (smallest suitable room)

## Local Storage

All room data is stored in the browser's localStorage under the key `hostel_rooms`. Data persists between browser sessions but is specific to the device/browser.

## Development

This project was bootstrapped with Vite and uses modern React features including hooks and TypeScript for type safety.
