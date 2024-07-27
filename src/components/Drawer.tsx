// Drawer.tsx
import React from 'react';
import './Drawer.scss';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
    return (
        <div className={`drawer ${isOpen ? 'open' : ''}`}>
            <div className="drawer-overlay" onClick={onClose}></div>
            <div className="drawer-content">
                <button className="drawer-close" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Drawer;
