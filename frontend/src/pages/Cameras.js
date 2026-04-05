import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Layout from '../components/layout';

function Cameras() {
    const [cameras, setCameras] = useState([]);
    const [cameraName, setCameraName] = useState('');
    const [cameraIp, setCameraIp] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchCameras();
    }, []);

    const fetchCameras = () => {
        API.get('/cameras/all').then(res => setCameras(res.data));
    };

    const handleAddCamera = async (e) => {
        e.preventDefault();
        try {
            await API.post('/cameras/add', {
                camera_name: cameraName,
                camera_ip: cameraIp,
                location
            });
            setIsError(false);
            setMessage('✅ Camera added successfully!');
            fetchCameras();
            setCameraName(''); setCameraIp(''); setLocation('');
        } catch (err) {
            setIsError(true);
            setMessage('❌ Error adding camera');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this camera?')) {
            await API.delete(`/cameras/${id}`);
            fetchCameras();
        }
    };

    return (
        <Layout>
            <h2 style={styles.title}>Cameras</h2>

            {message && (
                <p style={{...styles.message, color: isError ? 'red' : 'green'}}>
                    {message}
                </p>
            )}

            <div style={styles.form}>
                <h3>Add New Camera</h3>
                <form onSubmit={handleAddCamera}>
                    <div style={styles.grid}>
                        <input style={styles.input} placeholder="Camera Name" value={cameraName} onChange={e => setCameraName(e.target.value)} required />
                        <input style={styles.input} placeholder="Camera IP (e.g. 192.168.1.128)" value={cameraIp} onChange={e => setCameraIp(e.target.value)} required />
                        <input style={styles.input} placeholder="Location (e.g. Main Gate)" value={location} onChange={e => setLocation(e.target.value)} required />
                    </div>
                    <button style={styles.button} type="submit">📷 Add Camera</button>
                </form>
            </div>

            <div style={styles.table}>
                <h3>All Cameras ({cameras.length})</h3>
                {cameras.length === 0 ? (
                    <p style={styles.noData}>No cameras added yet</p>
                ) : (
                    <div style={styles.tableWrapper}>
                        <table style={styles.tableEl}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>ID</th>
                                    <th style={styles.th}>Camera Name</th>
                                    <th style={styles.th}>Camera IP</th>
                                    <th style={styles.th}>Location</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cameras.map(camera => (
                                    <tr key={camera.id}>
                                        <td style={styles.td}>{camera.id}</td>
                                        <td style={styles.td}>{camera.camera_name}</td>
                                        <td style={styles.td}>{camera.camera_ip}</td>
                                        <td style={styles.td}>{camera.location}</td>
                                        <td style={styles.td}>
                                            <button onClick={() => handleDelete(camera.id)} style={styles.deleteBtn}>🗑️ Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Layout>
    );
}

const styles = {
    title: { marginBottom: '20px', color: '#1a237e' },
    message: { padding: '10px', borderRadius: '5px', marginBottom: '15px' },
    form: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '30px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '10px',
        marginBottom: '10px'
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        boxSizing: 'border-box',
        fontSize: '14px'
    },
    button: {
        backgroundColor: '#1a73e8',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '15px'
    },
    table: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    tableWrapper: { overflowX: 'auto' },
    tableEl: { width: '100%', borderCollapse: 'collapse', minWidth: '400px' },
    th: { backgroundColor: '#1a73e8', color: 'white', padding: '12px 10px', textAlign: 'left' },
    td: { padding: '10px', borderBottom: '1px solid #ddd', fontSize: '14px' },
    deleteBtn: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '13px'
    },
    noData: { color: '#999', textAlign: 'center', padding: '30px' }
};

export default Cameras;