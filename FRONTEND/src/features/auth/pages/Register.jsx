import React from 'react'
import '../style/auth.scss'
import FormGroup from '../componets/FormGroup'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const Register = () => {
    const navigate = useNavigate();
    const { handleRegister, loading } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({ username, email, password });
        navigate('/')
    }

    return (
        <main className='auth-page'>
            <div className='auth-split-container'>

                {/* Left Side: Promotional Text */}
                <div className='auth-promo-side'>
                    <div className='promo-content'>
                        <h1 className='app-brand'>Moodify</h1>
                        <h2 className='promo-headline'>Music that matches your vibe.</h2>
                        <p className='promo-subtext'>
                            Let your face do the talking. We detect your expression
                            and instantly play the perfect track for your current mood.
                            No searching, just feeling.
                        </p>
                        <div className='promo-features'>
                            <span>✨ Real-time emotion detection</span>
                            <span>🎧 Premium audio quality</span>
                            <span>⚡ Instant playback</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Registration Form */}
                <div className='auth-form-side'>
                    <div className='auth-form-wrapper'>
                        <div className='auth-header'>
                            <h2>Create an Account</h2>
                            <p>Join the future of music listening.</p>
                        </div>

                        <form onSubmit={handleFormSubmit} className='auth-form'>
                            <FormGroup placeholder="Enter Your Username" type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                            <FormGroup placeholder="Enter Your Email" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <FormGroup placeholder="Enter Your Password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            <button type='submit' className='auth-submit-btn'>Register</button>
                        </form>

                        <div className='auth-footer'>
                            <p>Already have an account? <span className='auth-link' onClick={() => navigate('/login')}>Login</span></p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default Register