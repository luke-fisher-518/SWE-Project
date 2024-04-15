import React from 'react';

const Modal = ({ item, closeModal }) => {
    return (
        <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">{item.name}</h4>
                    <span className="close-button" onClick={closeModal}>X</span>
                </div>
                <div className="modal-body">
                    <img src={item.image} alt={item.name} />
                    <p>Price: ${item.price}</p>
                    <p>Color: {item.color}</p>
                    <p>Previous Selling Price: ${item.previousPrice}</p>
                    <p>Price Average: ${item.averagePrice}</p>
                    <p>Minimum Sold Price: ${item.minPrice}</p>
                    <p>Item Group: {item.group}</p>
                    <p>Item Type: {item.type}</p>
                    <p>Rarity: {item.rarity}</p>
                    <p>Quality: {item.quality}</p>
                </div>
                <div className="modal-footer">
                    <button className="buy-button">Buy</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;