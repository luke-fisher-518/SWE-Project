import React, { useContext, useState } from 'react';
import UserContext from '../UserContext';
import AvatarEditor from 'react-avatar-editor';
import ItemCard from './ItemCard';
import Modal from './Modal';

// User Profile Component
const UserProfile = ({ name, accountName, image, onImageUpload, showEditor, onScaleChange, scale, onSaveImage, editorRef }) => {
    const fileInputRef = React.useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    

    return (
        <div>
            <h2>{name}</h2>
            <h3>{accountName}</h3>
            <div className="image-upload" onClick={handleImageClick}>
                <img src={image} alt="User" className="profile-image" style={{ cursor: 'pointer' }}/>
                <input
                    type="file"
                    onChange={onImageUpload}
                    className="file-input"
                    ref={fileInputRef}
                    style={{ display: 'none' }}  // Hide the file input
                />
            </div>
            {showEditor && (
                <div>
                    <AvatarEditor
                        ref={editorRef}
                        image={image}
                        width={250}
                        height={250}
                        border={50}
                        borderRadius={125}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={scale}
                        rotate={0}
                    />
                    <input
                        type="range"
                        onChange={onScaleChange}
                        min="1"
                        max="2"
                        step="0.01"
                        defaultValue="1"
                        style={{ width: '100%' }}
                    />
                    <button className="save-button" onClick={onSaveImage}>Save</button>
                </div>
            )}
        </div>
    );
};

// Inventory Component
const Inventory = ({ items }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <h2>Inventory</h2>
            <div className="items-grid">
                {items.map(item => (
                    <ItemCard item={item}  handleItemClick={handleItemClick} showBuyButton={false} />
                ))}
                {isModalOpen && <Modal item={selectedItem} closeModal={closeModal} showBuyButton={false}/>}
            </div>
        </div>
    );
};

// Recent Activity Component
const RecentActivity = ({ activities }) => {
    return (
        <div>
            <h2>Recent Activity</h2>
            <ul>
                {activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                ))}
            </ul>
        </div>
    );
};

export default function User() {
    const { userImage, setUserImage, userName, setUserName, accountName, setAccountName, inventory, setInventory, recentActivity, setRecentActivity } = useContext(UserContext);
    const [scale, setScale] = useState(1);
    const [showEditor, setShowEditor] = useState(false);
    const editorRef = React.useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) { // Check if the file exists
            setUserImage(URL.createObjectURL(file)); // Create a URL for the file
            setShowEditor(true); // Show the editor
        } else {
            setShowEditor(false); // Hide the editor if no file is selected
        }
    };
    

    const handleScaleChange = (event) => {
        setScale(parseFloat(event.target.value));
    };

    const saveImage = () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
            setUserImage(canvas);
            setShowEditor(false);
        }
    };

    return (
        <div className="user-container">
            <div className="user-profile-container">
                <UserProfile 
                    name={userName} 
                    accountName={accountName} 
                    image={userImage}
                    onImageUpload={handleImageUpload} 
                    showEditor={showEditor} 
                    onScaleChange={handleScaleChange} 
                    scale={scale} 
                    onSaveImage={saveImage} 
                    editorRef={editorRef}
                />
            </div>
            <div className="inventory-container">
                <Inventory items={inventory}/>
            </div>
            <div className="recent-activity-container">
                <RecentActivity activities={recentActivity} />
            </div>
        </div>
    );
}