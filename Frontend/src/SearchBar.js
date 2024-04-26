import React from 'react';

export default function SearchBar({ searchTerm, handleSearchChange }) {
    return (
        <input className= "search-bar" type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search..." />
    );
}