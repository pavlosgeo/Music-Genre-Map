# Music Genre Map

An **interactive music genre map** built with **React**, **React Flow**, and **Dagre**.  
Explore relationships between rock and electronic genres, view their history, origin, and notable artists.  

![Music Genre Map Screenshot](./screenshot.png) <!-- Optional, add if you have a screenshot -->

---

## Features

- **Interactive graph** of music genres
  - Nodes represent genres (Rock, Electronic, etc.)
  - Edges show influences and connections
- **Hover over nodes** to see genre details: era, origin, description, and artists
- **Click a node** to open a side panel with extended information
- **Automatic layout** using **Dagre** (left-to-right layout)
- **MiniMap, Controls, and Background** for better navigation

---

## Tech Stack

- **Frontend**: React, React Flow, JavaScript  
- **Graph layout**: Dagre  
- **Styling**: CSS modules  
- **Data**: Local JSON-like structures for genres and influences  

---

### Project Structure
```
src/
├─ components/
│ ├─ GenreNode.jsx # Custom node for React Flow
│ ├─ SidePanel.jsx # Side panel showing genre details
├─ data/
│ ├─ genres.js # Genre dataset
│ ├─ influences.js # Genre influence connections
├─ pages/
│ ├─ MapPage.jsx # Main page with React Flow graph
├─ styles/
│ ├─ style.css # Global styles
```

## Getting Started

### Prerequisites

- Node.js (>= 16)
- npm (>= 8)

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd music-genre-map

# Install dependencies
npm install

# Start the development server
npm run dev


