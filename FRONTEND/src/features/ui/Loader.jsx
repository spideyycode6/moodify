import React from 'react';
import './Loader.scss';

export default function Loader() {
    return (
        <div className="loader-container">
            <div className="music-loader">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <h2 className="loader-text">Warming up the player...</h2>
        </div>
    );
}
