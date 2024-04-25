// Toast.js
const Toast = ({ message }) => {
    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: 1000,
        }}>
            {message}
        </div>
    );
};

export default Toast;
