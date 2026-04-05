import React, { useState } from 'react';
import Layout from '../components/layout';
import API from '../services/api';

function Embeddings() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleGenerateEmbeddings = async () => {
        setLoading(true);
        setMessage('');
        try {
            const res = await API.post('/embeddings/generate');
            setIsError(false);
            setMessage(`✅ ${res.data.message} — Success: ${res.data.result.success}, Failed: ${res.data.result.failed}`);
        } catch (err) {
            setIsError(true);
            setMessage('❌ Error generating embeddings');
        }
        setLoading(false);
    };

    const handleReloadEmbeddings = async () => {
        setLoading(true);
        setMessage('');
        try {
            await fetch('http://localhost:9000/reload-embeddings', { method: 'POST' });
            setIsError(false);
            setMessage('✅ AI Engine embeddings reloaded successfully');
        } catch (err) {
            setIsError(true);
            setMessage('❌ Error reloading — is AI Engine running?');
        }
        setLoading(false);
    };

    return (
        <Layout>
            <h2 style={styles.title}>Embeddings Management</h2>

            {message && (
                <p style={{...styles.message, color: isError ? 'red' : 'green'}}>
                    {message}
                </p>
            )}

            <div style={styles.cards}>
                <div style={styles.card}>
                    <div style={styles.icon}>🤖</div>
                    <h3>Generate Embeddings</h3>
                    <p style={styles.desc}>Generate face embeddings for all students using InsightFace.</p>
                    <button
                        style={loading ? styles.btnDisabled : styles.button}
                        onClick={handleGenerateEmbeddings}
                        disabled={loading}>
                        {loading ? '⏳ Processing...' : '⚡ Generate'}
                    </button>
                </div>

                <div style={styles.card}>
                    <div style={styles.icon}>🔄</div>
                    <h3>Reload AI Engine</h3>
                    <p style={styles.desc}>Reload embeddings into FAISS index. Do this after adding new students.</p>
                    <button
                        style={loading ? styles.btnDisabled : styles.button}
                        onClick={handleReloadEmbeddings}
                        disabled={loading}>
                        {loading ? '⏳ Processing...' : '🔄 Reload'}
                    </button>
                </div>
            </div>

            <div style={styles.guide}>
                <h3>📋 How it works</h3>
                <ol style={styles.list}>
                    <li>Add a new student with photo</li>
                    <li>Click <strong>Generate Embeddings</strong></li>
                    <li>Click <strong>Reload AI Engine</strong></li>
                    <li>Student will now be recognized by camera ✅</li>
                </ol>
            </div>
        </Layout>
    );
}

const styles = {
    title: { marginBottom: '20px', color: '#1a237e' },
    message: { padding: '12px', borderRadius: '5px', marginBottom: '20px', fontSize: '15px' },
    cards: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
    },
    card: {
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
    },
    icon: { fontSize: '40px', marginBottom: '15px' },
    desc: { color: '#666', marginBottom: '20px', lineHeight: '1.5', fontSize: '14px' },
    button: {
        backgroundColor: '#1a73e8',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '15px',
        width: '100%'
    },
    btnDisabled: {
        backgroundColor: '#ccc',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '5px',
        cursor: 'not-allowed',
        fontSize: '15px',
        width: '100%'
    },
    guide: {
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    list: { lineHeight: '2.5', paddingLeft: '20px', color: '#444' }
};

export default Embeddings;