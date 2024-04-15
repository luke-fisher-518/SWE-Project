import React, { useContext, useState } from 'react';
import UserContext from '../UserContext';
import AvatarEditor from 'react-avatar-editor';

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
                </div>
            )}
        </div>
    );
}