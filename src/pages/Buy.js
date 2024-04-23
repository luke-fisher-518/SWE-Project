import React, { useState } from 'react';
import ItemCard from './ItemCard';
import Modal from './Modal';
import asiimov from './img/asiimov-mw.png';
import stiletto from './img/stiletto-knife-vanilla.png';

export default function Buy() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

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
            group: 'Rifle', 
            type: 'AK-47', 
            rarity: 'Covert', 
            quality: 'Factory New' 
        },
        { 
            id: 2, 
            name: 'Stiletto Knife "Vanilla"', 
            price: 400.05, 
            image: stiletto, 
            color: 'Silver', 
            previousPrice: 420.00, 
            averagePrice: 410.00, 
            minPrice: 390.00, 
            maxPrice: 430.00,
            group: 'Melee', 
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

    return (
    <div className="items-grid">
        {items.map(item => (
            <ItemCard item={item} handleItemClick={handleItemClick} />
        ))}
        {isModalOpen && <Modal item={selectedItem} closeModal={closeModal} />}
    </div>
);
}