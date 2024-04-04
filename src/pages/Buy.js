import React from 'react';
import asiimov from './img/asiimov-mw.png';
import stiletto from './img/stiletto-knife-vanilla.png';

export default function Buy() {
    const items = [
        { id: 1, name: 'Asiimov-MW', price: 50.16, image: asiimov },
        { id: 2, name: 'Stiletto Knife "Vanilla"', price: 400.05, image: stiletto },
        // add more items as needed
    ];

    return (
        <div>
            <div className="items-grid">
                {items.map(item => (
                    <div className="item-container" key={item.id}>
                        <img className="item-image" src={item.image} alt={item.name} />
                        <h2 className="item-name">{item.name}</h2>
                        <p className="item-price">${item.price}</p>
                        <button className="buy-button">Buy</button>
                    </div>
                ))}
            </div>
        </div>
    );
}