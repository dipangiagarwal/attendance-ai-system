import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Layout from '../components/layout';

function Dashboard() {
    const [students, setStudents] = useState([]);
    const [batches, setBatches] = useState([]);

    useEffect(() => {
        API.get('/students/').then(res => setStudents(res.data));
        API.get('/batches/').then(res => setBatches(res.data));
    }, []);

    return (
        <Layout>
            <h2>Dashboard</h2>
            <div style={styles.cards}>
                <div style={styles.card}>
                    <h3>Total Students</h3>
                    <p style={styles.number}>{students.length}</p>
                </div>
                <div style={styles.card}>
                    <h3>Total Batches</h3>
                    <p style={styles.number}>{batches.length}</p>
                </div>
            </div>
        </Layout>
    );
}

const styles = {
    cards: {
        display: 'flex',
        gap: '20px',
        marginTop: '20px',
        flexWrap: 'wrap'
    },
    card: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '200px',
        textAlign: 'center'
    },
    number: {
        fontSize: '40px',
        color: '#1a73e8',
        fontWeight: 'bold'
    }
};

export default Dashboard;