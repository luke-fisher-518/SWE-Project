import React, { useContext, useState } from 'react';
import UserContext from '../UserContext';
import AvatarEditor from 'react-avatar-editor';


// User Profile Component
const UserProfile = ({ name, accountName, image, onImageUpload, showEditor, onScaleChange, scale, onSaveImage }) => {
    // ...
};

// Inventory Component
const Inventory = ({ items }) => {
    // ...
};

// Seller Insights Component
const SellerInsights = ({ insights }) => {
    // ...
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
            <input type="file" onChange={handleImageUpload} />
            {showEditor && (
                <div>
                    <AvatarEditor
                        ref={editorRef}
                        image={image}
                        width={200}
                        height={200}
                        border={50}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={scale}
                    />
                    <input type="range" min="1" max="3" step="0.01" value={scale} onChange={handleScaleChange} />
                    <button className="save-button" onClick={saveImage}>Save</button>

                    <UserProfile 
                        name="User Name" 
                        accountName="Account Name" 
                        image={image} 
                        onImageUpload={handleImageUpload} 
                        showEditor={showEditor} 
                        onScaleChange={handleScaleChange} 
                        scale={scale} 
                        onSaveImage={saveImage} 
                    />
                    <Inventory items={["Item 1", "Item 2", "Item 3"]} />
                    <SellerInsights insights={["Insight 1", "Insight 2", "Insight 3"]} />
                </div>
            )}
        </div>
    );
}