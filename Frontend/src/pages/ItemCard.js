// ItemCard.js
import React from 'react';

const ItemCard = ({ item, handleItemClick, showButton = true, buttonText, pageType }) => {
    return (
        <div className="item-container" onClick={() => handleItemClick(item, pageType)}>
            <img className="item-image" src={item.image} alt={item.name} />
            <h2 className="item-name">{item.name}</h2>
            <p className="item-price">${item.price.toFixed(2)}</p>
            {showButton && <button className="button" onClick={(e) => {
                e.stopPropagation(); // Prevents the modal from triggering when clicking the button
                console.log(`${buttonText} ${item.name}`);
            }}>{buttonText}</button>}
        </div>
    );
};



export default ItemCard;