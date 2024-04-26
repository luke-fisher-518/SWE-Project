import React from 'react';

function getRarityColor(rarity) {
    switch (rarity.toLowerCase()) {
        case 'consumer grade' || 'base grade':
            return 'grey';
        case 'industrial grade':
            return 'lightblue';
        case 'mil-spec'|| 'high grade':
            return 'blue';
        case 'restricted' || 'remarkable':
            return 'purple';
        case 'classified' || 'exotic':
            return 'pink';
        case 'covert' || 'extraordinary':
            return 'red';
        case 'contraband':
            return 'gold';
        default:
            return 'black';
    }
}

const Modal = ({ item, closeModal, showBuyButton = true, showSellButton = false }) => {
    return (
        <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">{item.name}</h4>
                    <span className="close-button" onClick={closeModal}>X</span>
                </div>
                <div className="modal-body">
                    <img src={item.image} alt={item.name}/>
                    <p>Price: ${item.price}</p>
                    <p>Color: <span style={{color: item.color}}>{item.color}</span></p>
                    <p>Previous Selling Price: ${item.previousPrice}</p>
                    <p>Price Average: ${item.averagePrice}</p>
                    <p>Minimum Sold Price: ${item.minPrice}</p>
                    <p>Item Type: {item.type}</p>
                    <p>Rarity: <span
                        style={{color: getRarityColor(item.rarity), fontFamily: 'Kode Mono'}}>{item.rarity}</span></p>
                    <p>Quality: {item.quality}</p>
                </div>
                <div className="modal-footer">
                    {showBuyButton && <button className="buy-button">Buy</button>}
                    {showSellButton && <button className="sell-button">Sell</button>}
                </div>

            </div>
        </div>
    );
};

export default Modal;