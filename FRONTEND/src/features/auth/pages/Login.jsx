import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormGroup from '../componets/FormGroup'
import '../style/auth.scss'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const navigate = useNavigate();
    const { loading, handleLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLogin({ email, password });
            return (navigate('/'))
        } catch (error) {
            console.log(error);
            alert('Invalid Credentials')
        }
    }
    return (
        <main className='auth-page'>
            <div className='auth-split-container'>

                {/* Left Side: Promotional Text */}
                <div className='auth-promo-side'>
                    <div className='promo-content'>
                        <h1 className='app-brand'>Moodify</h1>
                        <h2 className='promo-headline'>Welcome back to your vibe.</h2>
                        <p className='promo-subtext'>
                            Log in to instantly launch the expression detector.
                            Your face brings the mood, we bring the music.
                        </p>
                        <div className='promo-features'>
                            <span>✨ Real-time emotion detection</span>
                            <span>🎧 Premium audio quality</span>
                            <span>⚡ Instant playback</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className='auth-form-side'>
                    <div className='auth-form-wrapper'>
                        <div className='auth-header'>
                            <h2>Login</h2>
                            <p>Sign in to start listening.</p>
                        </div>

                        <form onSubmit={handleFormSubmit} className='auth-form'>
                            <FormGroup placeholder="Enter Your Email" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <FormGroup placeholder="Enter Your Password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            <button type='submit' className='auth-submit-btn'>Login</button>
                        </form>

                        <div className='auth-footer'>
                            <p>Don't have an account? <span className='auth-link' onClick={() => navigate('/register')}>Register</span></p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default Login