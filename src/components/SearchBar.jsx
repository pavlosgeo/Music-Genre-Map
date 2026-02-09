import React from 'react';
import '../styles/SearchBar.css';

export default function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <div className="map-search">
            <input
                type="text"
                placeholder="Search genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}
