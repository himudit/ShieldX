import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShieldIcon from '../components/Common/ShieldIcon';

const Login: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
                {/* 35% Section - Visible on all screens */}
                <div
                    style={{
                        width: '35%',
                        backgroundColor: 'var(--auth-grey)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem',
                        color: 'white',
                        transition: 'width 0.3s ease',
                    }}
                    className="auth-sidebar"
                >
                    <div style={{ maxWidth: '400px', width: '100%' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <button
                                onClick={() => navigate('/')}
                                style={{
                                    all: 'unset',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    color: 'var(--accent)'
                                }}
                            >
                                <ShieldIcon size={20} />
                                <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>ShieldX</span>
                            </button>

                            <p style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '0.5rem' }}>Welcome back</p>
                            <p style={{ fontSize: '0.8745em', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Please enter your details</p>
                        </div>

                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    style={{
                                        padding: '0.5rem 0.65rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--border-color)',
                                        backgroundColor: 'var(--bg-secondary)',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    style={{
                                        padding: '0.5rem 0.65rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--border-color)',
                                        backgroundColor: 'var(--bg-secondary)',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    padding: '0.5rem 0.65rem',
                                    borderRadius: '0.5rem',
                                    backgroundColor: 'var(--accent)',
                                    color: 'white',
                                    fontWeight: '600',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
                            >
                                Log In
                            </button>
                        </form>

                        <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            Don't have an account?{' '}
                            <Link to="/signup" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* 65% Section - Hidden on mobile */}
                <div
                    style={{
                        width: '65%',
                        backgroundColor: 'var(--bg-primary)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem',
                    }}
                    className="auth-main"
                >
                    <div style={{ textAlign: 'center', color: 'white' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome back to ShieldX</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px' }}>
                            Access your dashboard, manage your projects, and keep your applications secure.
                        </p>
                    </div>
                </div>

                <style>
                    {`
          @media (max-width: 768px) {
            .auth-sidebar {
              width: 100% !important;
            }
            .auth-main {
              display: none !important;
            }
          }
        `}
                </style>
            </div>
        </>
    );
};

export default Login;
