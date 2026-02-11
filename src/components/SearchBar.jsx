import React from 'react';
import '../styles/SearchBar.css';

export default function SearchBar({
    searchTerm,
    setSearchTerm,
    onKeyDown,
    placeholder = 'Search genres…',
}) {
    return (
        <div className="map-search">
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
            />

            <div className="search-hint">
                ↑ ↓ navigate · Enter select · Esc clear
            </div>
        </div>
    );
}
