# Music Genre Map (WIP)

An **interactive music genre map** built with **React**, **React Flow**, and **Dagre**.  
Explore relationships between rock and electronic genres, view their history, origin, and notable artists.  

<img width="1918" height="911" alt="image" src="https://github.com/user-attachments/assets/17c27a79-cd30-4e09-b44a-d61ff977de54" />
<img width="1906" height="919" alt="image" src="https://github.com/user-attachments/assets/0fb83ebb-bdd2-45f3-85b3-fc70284e875f" />



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
│ └─ MapBackground.jsx   # Dynamic Unsplash background
├─ data/
│ ├─ genres.js # Genre dataset
│ ├─ influences.js # Genre influence connections
├─ pages/
│ ├─ MapPage.jsx # Main page with React Flow graph
├─ styles/
│ ├─ style.css # Global styles
│ ├─ SidePanel.css   # Side panel styles 
│ ├─ GenreNode.css   # Genre Nodes styles
│ ├─ MapBackground.css # Unsplash API to call background pictures for genre nodes
│ └─
│ ├─ .env # Unsplash API access key used to fetch images from Unsplash
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

• Add animations for edges

• Responsive design for mobile/tablet screens




