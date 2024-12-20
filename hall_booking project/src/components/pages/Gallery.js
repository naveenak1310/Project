import React from 'react';
import hall1 from '../../assets/images/hall1.jpg';
import hall2 from '../../assets/images/hall2.jpg';
import hall3 from '../../assets/images/hall3.jpg';
import hall4 from '../../assets/images/hall4.jpg';
import hall5 from '../../assets/images/hall5.jpg';
import hall6 from '../../assets/images/hall6.jpg';
import './Gallery.css';

const hallData = [
    { id: 'jennis-hall', image: hall1, title: "Jennis Hall"},
    { id: 'harrys-hall', image: hall2, title: "Harry's Hall" },
    { id: 'grant-hall', image: hall3, title: "Grant Hall" },
    { id: 'richie-hall', image: hall4, title: "Richie Hall" },
    { id: 'golden-hall', image: hall5, title: "Golden Hall" },
    { id: 'durian-hall', image: hall6, title: "Durian Hall" }
];

export default function Gallery() {
    return (
        <div className="gallery-container">
            <h1 className="gallery-title">Our Gallery</h1>
            <div className="gallery-grid">
                {hallData.map((hall) => (
                    <div className="gallery-item" key={hall.id}>
                        <img src={hall.image} alt={hall.title} className="gallery-image" />
                        <div className="gallery-overlay">
                            <h2 className="gallery-text">{hall.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
