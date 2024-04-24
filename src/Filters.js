import React, { useState } from 'react';

export default function Filters({ filters, handleFilterChange }) {
    // State for controlling the visibility of each category
    const [showColor, setShowColor] = useState(false);
    const [showRarity, setShowRarity] = useState(false);
    const [showQuality, setShowQuality] = useState(false);
    const [showType, setShowType] = useState(false);

    const colorOptions = ["Red", "Blue", "Green", "Yellow"];
    const rarityOptions = ["Consumer Grade", "Base Grade", "Industrial Grade", "Mil-Spec", "High Grade", "Restricted", "Remarkable", "Classified", "Exotic", "Covert", "Extraordinary", "Contraband"];
    const qualityOptions = ["Factory New", "Minimal Wear", "Field-Tested", "Well-Worn", "Battle-Scarred"];
    const typeOptions = ["SMG", "Rifle", "Pistol", "Knife", "Heavy", "Gloves"];

    return (
        <div className="filters">
            <div className="filter-category" onClick={() => setShowColor(!showColor)}>
                <legend>Color</legend>
                {showColor && (
                    <fieldset>
                        {colorOptions.map(color => (
                            <label key={color}>
                                <input
                                    type="radio"
                                    name="color"
                                    value={color}
                                    checked={filters.color === color}
                                    onChange={handleFilterChange} />
                                {color}
                            </label>
                        ))}
                    </fieldset>
                )}
            </div>
            <div className="filter-category" onClick={() => setShowRarity(!showRarity)}>
                <legend>Rarity</legend>
                {showRarity && (
                    <fieldset>
                        {rarityOptions.map(rarity => (
                            <label key={rarity}>
                                <input
                                    type="radio"
                                    name="rarity"
                                    value={rarity}
                                    checked={filters.rarity === rarity}
                                    onChange={handleFilterChange} />
                                {rarity}
                            </label>
                        ))}
                    </fieldset>
                )}
            </div>
            <div className="filter-category" onClick={() => setShowQuality(!showQuality)}>
                <legend>Quality</legend>
                {showQuality && (
                    <fieldset>
                        {qualityOptions.map(quality => (
                            <label key={quality}>
                                <input
                                    type="radio"
                                    name="quality"
                                    value={quality}
                                    checked={filters.quality === quality}
                                    onChange={handleFilterChange} />
                                {quality}
                            </label>
                        ))}
                    </fieldset>
                )}
            </div>
            <div className="filter-category" onClick={() => setShowType(!showType)}>
                <legend>Type</legend>
                {showType && (
                    <fieldset>
                        {typeOptions.map(type => (
                            <label key={type}>
                                <input
                                    type="radio"
                                    name="type"
                                    value={type}
                                    checked={filters.type === type}
                                    onChange={handleFilterChange} />
                                {type}
                            </label>
                        ))}
                    </fieldset>
                )}
            </div>
            <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="Min Price" />
            <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="Max Price" />
        </div>
    );
}
