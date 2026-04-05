import React, { useState } from 'react';
import API from '../services/api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Backend sets cookie automatically in response
            // We do NOT need to read or store anything manually
            await API.post("/api/admin/login", {
                email: email,
                password: password
            });

            // Cookie is set by browser automatically ✅
            // Redirect to dashboard
            window.location.href = "/dashboard";

        } catch (err) {
            setError(err.response?.data?.detail || "❌ Invalid email or password");
        }

        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <div style={styles.logo}>🎓</div>
                <h2 style={styles.title}>AI Attendance System</h2>
                <h3 style={styles.subtitle}>Admin Login</h3>

                {error && (
                    <p style={styles.error}>{error}</p>
                )}

                <form onSubmit={handleLogin}>
                    <input
                        style={styles.input}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        style={styles.button}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "⏳ Logging in..." : "🔐 Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5'
    },
    box: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
        width: '350px',
        textAlign: 'center'
    },
    logo: { fontSize: '50px', marginBottom: '10px' },
    title: { color: '#1a237e', marginBottom: '5px', fontSize: '20px' },
    subtitle: { color: '#666', marginBottom: '20px', fontWeight: 'normal' },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '14px',
        boxSizing: 'border-box'
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#1a73e8',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    error: {
        color: 'red',
        marginBottom: '10px',
        fontSize: '14px'
    }
};

export default Login;