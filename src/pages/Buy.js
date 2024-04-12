import React, { useState } from 'react';
import asiimov from './img/asiimov-mw.png';
import stiletto from './img/stiletto-knife-vanilla.png';
import Modal from './Modal'; // import your Modal component

export default function Buy() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const items = [
        { id: 1, name: 'Asiimov-MW', price: 50.16, image: asiimov },
        { id: 2, name: 'Stiletto Knife "Vanilla"', price: 400.05, image: stiletto },
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
                <div className="item-container" key={item.id} onClick={() => handleItemClick(item)}>
                    <img className="item-image" src={item.image} alt={item.name} />
                    <h2 className="item-name">{item.name}</h2>
                    <p className="item-price">${item.price}</p>
                    <button className="buy-button">Buy</button>
                </div>
            ))}
            {isModalOpen && <Modal item={selectedItem} closeModal={closeModal} />}
        </div>
    );
}