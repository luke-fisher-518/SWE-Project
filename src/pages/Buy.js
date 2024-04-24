import React, { useState } from 'react';
import ItemCard from './ItemCard';
import Modal from './Modal';
import SearchBar from '../SearchBar';
import Filters from '../Filters';
import asiimov from './img/asiimov-mw.png';
import stiletto from './img/stiletto-knife-vanilla.png';

export default function Buy() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        color: '',
        rarity: '',
        quality: '',
        type: '',
        minPrice: 0,
        maxPrice: Infinity
    });
    
    const handleResetFilters = (newFilters) => {
        setFilters(newFilters);
    };

    const items = [
        { 
            id: 1, 
            name: 'Asiimov-MW', 
            price: 50.16, 
            image: asiimov, 
            color: 'Black', 
            previousPrice: 55.00, 
            averagePrice: 52.00, 
            minPrice: 45.00, 
            maxPrice: 60.00,
            type: 'Rifle', 
            rarity: 'Covert', 
            quality: 'Factory New' 
        },
        { 
            id: 2, 
            name: 'Stiletto Knife "Vanilla"', 
            price: 400.05, 
            image: stiletto, 
            color: 'Gray', 
            previousPrice: 420.00, 
            averagePrice: 410.00, 
            minPrice: 390.00, 
            maxPrice: 430.00,
            type: 'Knife', 
            rarity: 'Covert', 
            quality: 'Minimal Wear' 
        },
        // add more items as needed
    ];

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value
        });
    };

    const filteredItems = items.filter(item => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase())
            && item.color.toLowerCase().includes(filters.color.toLowerCase())
            && item.rarity.toLowerCase().includes(filters.rarity.toLowerCase())
            && item.quality.toLowerCase().includes(filters.quality.toLowerCase())
            && item.type.toLowerCase().includes(filters.type.toLowerCase())
            && item.price >= filters.minPrice
            && item.price <= filters.maxPrice;
    });

    return (
        <div>
        <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        <Filters filters={filters} handleFilterChange={handleFilterChange} handleResetFilters={handleResetFilters} />        <div className="items-grid">
            {filteredItems.map(item => (
                <ItemCard key={item.id} item={item} handleItemClick={handleItemClick} />
            ))}
            {isModalOpen && <Modal item={selectedItem} closeModal={closeModal} />}
        </div>
    </div>
);
}