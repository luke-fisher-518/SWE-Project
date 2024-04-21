import React, { useContext, useState } from 'react';
import UserContext from '../UserContext';
import AvatarEditor from 'react-avatar-editor';

// User Profile Component
// User Profile Component
const UserProfile = ({ name, accountName, image, onImageUpload, showEditor, onScaleChange, scale, onSaveImage, editorRef }) => {
    return (
        <div>
            <h2>{name}</h2>
            <h3>{accountName}</h3>
            <div className="image-upload">
                <img src={image} alt="User" className="profile-image" />
                <input type="file" onChange={onImageUpload} className="file-input" />
            </div>
            {showEditor && (
                <div>
                    <AvatarEditor
                        ref={editorRef}
                        image={image}
                        width={100}
                        height={100}
                        border={50}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={scale}
                        onScaleChange={onScaleChange}
                    />
                    <button onClick={onSaveImage}>Save</button>
                </div>
            )}
        </div>
    );
};

// Inventory Component
const Inventory = ({ items }) => {
    return (
        <div>
            <h2>Inventory</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
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
    const {setUserImage} = useContext(UserContext);
    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(1);
    const [showEditor, setShowEditor] = useState(false);
    const editorRef = React.useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file));
        setShowEditor(true);
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
        <div>
            <h1>User</h1>
            <UserProfile 
                name="User Name" 
                accountName="Account Name" 
                image={image} 
                onImageUpload={handleImageUpload} 
                showEditor={showEditor} 
                onScaleChange={handleScaleChange} 
                scale={scale} 
                onSaveImage={saveImage} 
                editorRef={editorRef}
            />
            <Inventory items={["Item 1", "Item 2", "Item 3"]} />
            <RecentActivity activities={["Purchased Item 1", "Traded Item 2", "Purchased Item 3"]} />
        </div>
    );
}