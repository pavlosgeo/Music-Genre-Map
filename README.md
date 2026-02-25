# Music Genre Map (WIP)

An **interactive music genre map** built with **React**, **React Flow**, and **Dagre**.  
Explore relationships between rock and electronic genres, view their history, origin, and notable artists.  

<img width="1919" height="918" alt="image" src="https://github.com/user-attachments/assets/485900e4-a5cb-4524-8b8c-43aa6dceaa77" />


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



### Project Structure

**Frontend**: React, React Flow, JavaScript  
**Graph layout**: Dagre  
**Styling**: CSS modules  
**Data**: Local JSON-like structures for genres and influences  
**APIs**: Unsplash (backgrounds), Spotify (artist info)
```
src/
├─ App.jsx
├─ index.css
├─ main.jsx
│  
├─ components/
│   ├─ ArtistTag.jsx
│   ├─ GenreNode.jsx
│   ├─ MapBackground.jsx
│   ├─ SearchBar.jsx
│   └─ SidePanel.jsx
├─ data/
│   ├─ genres.js
│   └─ influences.js
├─ pages/
│   ├─ CallbackPage.jsx
│   ├─ LandingPage.jsx
│   └─ MapPage.jsx
├─ styles/
│   ├─ GenreNode.css
│   ├─ LandingPage.css
│   ├─ MapBackground.css
│   ├─ SearchBar.css
│   ├─ SidePanel.css
│   └─ style.css
├─ utils/
│   ├─ fetchSpotifyArtist.js
│   ├─ navigation.js
│   ├─ spotifyAuth.js
│   └─ spotifyCache.js
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




