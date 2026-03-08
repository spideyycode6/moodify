import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/auth.scss';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <main className='auth-page' style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column' }}>
            <div className='promo-content' style={{ animation: 'fade-in-up 0.8s ease-out forwards', maxWidth: '800px', padding: '0 20px' }}>
                <h1 className='app-brand' style={{ fontSize: '4rem', marginBottom: '1rem', color: '#1db954' }}>Moodify</h1>
                <h2 className='promo-headline' style={{ fontSize: '2.5rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, #ffffff, #b3b3b3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Welcome to your vibe.
                </h2>
                <p className='promo-subtext' style={{ fontSize: '1.2rem', color: '#a0a0a0', marginBottom: '3rem' }}>
                    Your face brings the mood, we bring the music. Instantly launch the expression detector and get tailored playlists just for you.
                </p>
                <button
                    onClick={() => navigate('/register')}
                    style={{
                        padding: '16px 40px',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        color: '#fff',
                        backgroundColor: '#1db954',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(29, 185, 84, 0.3)',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(29, 185, 84, 0.4)';
                        e.target.style.backgroundColor = '#1ed760';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(29, 185, 84, 0.3)';
                        e.target.style.backgroundColor = '#1db954';
                    }}
                >
                    Get Started
                </button>
            </div>
        </main>
    );
};

export default Landing;
