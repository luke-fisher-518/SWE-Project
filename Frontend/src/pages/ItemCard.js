// ItemCard.js
import React from 'react';

const ItemCard = ({ item, handleItemClick, showBuyButton = true }) => {
    
    return (
        <div className="item-container" key={item.id} onClick={() => handleItemClick(item)}>
            <img className="item-image" src={item.image} alt={item.name} />
            <h2 className="item-name">{item.name}</h2>
            <p className="item-price">${item.price}</p>
            {showBuyButton && <button className="buy-button">Buy</button>}
        </div>
    );
};

export default ItemCard;