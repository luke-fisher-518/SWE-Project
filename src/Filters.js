import React, { useState, useEffect } from 'react';

function getRarityColor(rarity) {
    switch (rarity.toLowerCase()) {
        case 'consumer grade':
        case 'base grade':
            return 'grey';
        case 'industrial grade':
            return 'lightblue';
        case 'mil-spec':
        case 'high grade':
            return 'blue';
        case 'restricted':
        case 'remarkable':
            return 'purple';
        case 'classified':
        case 'exotic':
            return 'pink';
        case 'covert':
        case 'extraordinary':
            return 'red';
        case 'contraband':
            return 'gold';
        default:
            return 'black';
    }
}

export default function Filters({ filters, handleFilterChange, handleResetFilters }) {
    // State for controlling the visibility of each category
    const [showColor, setShowColor] = useState(false);
    const [showRarity, setShowRarity] = useState(false);
    const [showQuality, setShowQuality] = useState(false);
    const [showType, setShowType] = useState(false);
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);


    const colorOptions = ["Red", "Orange", "Blue", "Gold", "Yellow", "Green", "Blue", "Cyan", "Purple", "Pink", "Brown", "Black", "Gray", "White" ];
    const rarityOptions = ["Consumer Grade", "Base Grade", "Industrial Grade", "Mil-Spec", "High Grade", "Restricted", "Remarkable", "Classified", "Exotic", "Covert", "Extraordinary", "Contraband"];
    const qualityOptions = ["Factory New", "Minimal Wear", "Field-Tested", "Well-Worn", "Battle-Scarred"];
    const typeOptions = ["SMG", "Rifle", "Pistol", "Knife", "Heavy", "Gloves"];

    // Function to calculate the number of active filters
    const updateActiveFiltersCount = () => {
        const count = Object.values(filters).filter(value => value).length;
        setActiveFiltersCount(count);
    };

    // Update active filters count on any filter change
    useEffect(() => {
        updateActiveFiltersCount();
    }, [filters]);

    // Function to reset all filters
    const resetFilters = () => {
        handleResetFilters({
            color: '',
            rarity: '',
            quality: '',
            type: '',
            minPrice: 0,
            maxPrice: Infinity
        }
        // by default the max price is set to Infinity
        // this will show all items with prices greater than the min price
    );
};

    return (
        <div className="filters">
            <span className="filter-label">Filters</span>
            {activeFiltersCount > 1 && <span className="active-label"> ({activeFiltersCount - 1} active) </span>}
            {activeFiltersCount > 1 && (
                <button onClick={resetFilters} className="reset-button">Reset</button>
            )}
            <div className="filter-category" onClick={() => setShowColor(!showColor)}>
            <legend>Color <span className={`arrow ${showColor ? 'up' : 'down'}`}>▼</span></legend>
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
                                 <span style={{ color: color.toLowerCase() }}>{color}</span>
                            </label>
                        ))}
                    </fieldset>
                )}
            </div>
            <div className="filter-category" onClick={() => setShowRarity(!showRarity)}>
            <legend>Rarity <span className={`arrow ${showRarity ? 'up' : 'down'}`}>▼</span></legend>
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
                                <span style={{ color: getRarityColor(rarity) }}>{rarity}</span>
                            </label>
                        ))}
                    </fieldset>
                )}
            </div>
                <div className="filter-category" onClick={() => setShowQuality(!showQuality)}>
                <legend>Quality <span className={`arrow ${showQuality ? 'up' : 'down'}`}>▼</span></legend>
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
            <legend>Type <span className={`arrow ${showType ? 'up' : 'down'}`}>▼</span></legend>
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
            <div><span className="filter-label">Price Range</span></div>
            <input className="field-min" type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="Min Price" />
            <input className="field-max" type="number" name="maxPrice" value={filters.maxPrice === Infinity ? "" : filters.maxPrice} onChange={handleFilterChange} placeholder="Max Price" />
        </div>
    );
}
