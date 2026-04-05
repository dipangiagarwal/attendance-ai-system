import React, { useState } from 'react';

function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
        { path: '/students', label: 'Students', icon: '👨‍🎓' },
        { path: '/batches', label: 'Batches', icon: '📚' },
        { path: '/attendance', label: 'Attendance', icon: '✅' },
        { path: '/embeddings', label: 'Embeddings', icon: '🤖' },
        { path: '/cameras', label: 'Cameras', icon: '📷' },
    ];

    const currentPath = window.location.pathname;

    return (
        <div style={styles.container}>
            {/* Mobile Toggle Button */}
            <button
                style={styles.toggleBtn}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? '✕' : '☰'}
            </button>

            {/* Sidebar */}
            <div style={{
                ...styles.sidebar,
                transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
            }}>
                {/* Logo */}
                <div style={styles.logo}>
                    <h2 style={styles.logoText}>🎓 AI Attendance</h2>
                </div>

                {/* Nav Items */}
                <nav style={styles.nav}>
                    {navItems.map(item => (
                        <a 
                            key={item.path}
                            href={item.path}
                            style={{
                                ...styles.navItem,
                                backgroundColor: currentPath === item.path ? '#2196f3' : 'transparent'
                            }}>
                            <span style={styles.icon}>{item.icon}</span>
                            <span>{item.label}</span>
                        </a>
                    ))}
                </nav>

                {/* Logout */}
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    🚪 Logout
                </button>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    style={styles.overlay}
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div style={{
                ...styles.content,
                marginLeft: isSidebarOpen ? '250px' : '0'
            }}>
                {children}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f2f5'
    },
    toggleBtn: {
        position: 'fixed',
        top: '15px',
        left: '15px',
        zIndex: 1000,
        backgroundColor: '#1a73e8',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 12px',
        cursor: 'pointer',
        fontSize: '18px',
        display: 'none',
        '@media (max-width: 768px)': {
            display: 'block'
        }
    },
    sidebar: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '250px',
        height: '100vh',
        backgroundColor: '#1a237e',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease',
        zIndex: 999,
        overflowY: 'auto'
    },
    logo: {
        padding: '20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    logoText: {
        color: 'white',
        margin: 0,
        fontSize: '18px'
    },
    nav: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 0',
        flex: 1
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 20px',
        color: 'white',
        textDecoration: 'none',
        fontSize: '15px',
        borderRadius: '8px',
        margin: '2px 10px',
        transition: 'background 0.2s'
    },
    icon: {
        fontSize: '18px'
    },
    logoutBtn: {
        margin: '20px',
        padding: '12px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '15px',
        textAlign: 'left'
    },
    overlay: {
        display: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 998
    },
    content: {
        flex: 1,
        marginLeft: '250px',
        padding: '30px',
        transition: 'margin-left 0.3s ease',
        width: 'calc(100% - 250px)'
    }
};

export default Layout;