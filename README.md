# Music Genre Map (WIP)

An **interactive music genre map** built with **React**, **React Flow**, and **Dagre**.  
Explore relationships between rock and electronic genres, view their history, origin, and notable artists.  

<img width="1916" height="914" alt="image" src="https://github.com/user-attachments/assets/23b1ef2d-28f7-4aea-9b33-1e387815be7e" />

<img width="1915" height="918" alt="image" src="https://github.com/user-attachments/assets/000314ee-a690-4127-9bfe-9d38a5c6f75b" />


---

## Features

- **Interactive graph** of music genres
  - Nodes represent genres (Rock, Electronic, etc.)
  - Edges show influences and connections
    
- **Hover over nodes** to see genre details: era, origin, description, and artists
- **Dynamic Backgrounds** Each genre shows a background image fetched from Unsplash.
- **Click a node** to open a side panel with extended information
- **Automatic layout** using **Dagre** (left-to-right layout)
- **MiniMap, Controls, and Background** for better navigation
  
- Clicking a genre highlights it and its direct influences
- Non-related genres visually de-emphasized

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
│ ├─ SearchBar.jsx # Search bar component
│ └─ MapBackground.jsx   # Dynamic Unsplash background
├─ data/
│ ├─ genres.js # Genre dataset
│ ├─ influences.js # Genre influence connections
├─ pages/
│ ├─ MapPage.jsx # Page containing Music Genres/Connections
│ ├─ LandingPage.jsx # User Landing page 
├─ styles/
│ ├─ style.css # Global styling
│ ├─ SidePanel.css   # Side panel styling 
│ ├─ GenreNode.css   # Genre Nodes styling
│ ├─ MapBackground.css # Unsplash API to call background pictures for genre nodes
│ ├─ SearchBar.css # Search Bar styling
│ └─
├─ utils/
  ├─ navigation.js # Helper for arrow navigation.
│ └─ 
│ ├─ .env # Unsplash/Spotify API access key used to fetch images from Unsplash/Lists from Spotify
│ ├─ App.jsx # Renders MapPage component
│ └─
```

## Getting Started

### Prerequisites

- Node.js (>= 16)
- npm (>= 8)

### Installation

```bash
# Clone the repo
git clone <https://github.com/pavlosgeo/Music-Genre-Map>
cd music-genre-map

# Install dependencies
npm install

# Start the development server
npm run dev

Open http://localhost:5173 in your browser.
```
How to Use:

• Hover over a node to see a tooltip with era, origin, description, and artists.

• Click a node to open a side panel for more detailed information.

• Pan & Zoom the map using mouse or touch gestures.

• MiniMap helps navigate large graphs.

• The background dynamically updates to a related image fetched from Unsplash.


Future Improvements:

• Allow filtering by era, origin, or artist

• Responsive design for mobile/tablet screens

**Design Philosophy**

**This project focuses on making abstract musical history explorable through visual storytelling, combining data-driven layout, motion design, and contextual information.**




