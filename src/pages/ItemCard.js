// ItemCard.js
import React, { useState } from 'react';

const ItemCard = ({ item, handleItemClick, showButton = true, buttonText, pageType, updateRecentActivity }) => {
    const [message, setMessage] = useState('');

    const handleClick = (e) => {
        e.stopPropagation(); // Prevents the modal from triggering when clicking the button
        let activityMessage = '';
        if (buttonText === 'Buy') {
          activityMessage = `Item ${item.name} added to inventory!`;
          setMessage(activityMessage);
        } else if (buttonText === 'List') {
          activityMessage = `Item ${item.name} listed for sale!`;
          setMessage(activityMessage);
        }
    
        // make the message disappear after 2 seconds
        setTimeout(() => {
          setMessage('');
        }, 2000);
      };

    return (
        <div className="item-container" onClick={() => handleItemClick(item, pageType)}>
            <img className="item-image" src={item.image} alt={item.name} />
            <h2 className="item-name">{item.name}</h2>
            <p className="item-price">${item.price.toFixed(2)}</p>
            {showButton && <button className="button" onClick={handleClick}>{buttonText}</button>}
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ItemCard;