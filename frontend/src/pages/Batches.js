import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Layout from '../components/layout';

function Batches() {
    const [batches, setBatches] = useState([]);
    const [students, setStudents] = useState([]);
    const [batchName, setBatchName] = useState('');
    const [className, setClassName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedBatches, setSelectedBatches] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchBatches();
        API.get('/students/').then(res => setStudents(res.data));
    }, []);

    const fetchBatches = () => {
        API.get('/batches/').then(res => setBatches(res.data));
    };

    const handleAddBatch = async (e) => {
        e.preventDefault();
        try {
            await API.post('/batches/', {
                batch_name: batchName,
                class_name: className,
                start_time: startTime,
                end_time: endTime
            });
            setIsError(false);
            setMessage('✅ Batch added successfully!');
            fetchBatches();
            setBatchName(''); setClassName('');
            setStartTime(''); setEndTime('');
        } catch (err) {
            setIsError(true);
            setMessage('❌ Error adding batch');
        }
    };

    const handleAssignStudent = async (e) => {
        e.preventDefault();
        if (selectedBatches.length === 0 || selectedStudents.length === 0) {
            setIsError(true);
            setMessage('❌ Please select at least one batch and one student');
            return;
        }

        let successCount = 0;
        let alreadyCount = 0;
        let errorCount = 0;

        for (const batchId of selectedBatches) {
            for (const studentId of selectedStudents) {
                try {
                    await API.post('/student-batches/', {
                        student_id: parseInt(studentId),
                        batch_id: parseInt(batchId)
                    });
                    successCount++;
                } catch (err) {
                    if (err.response?.data?.detail === 'Student already assigned to this batch') {
                        alreadyCount++;
                    } else {
                        errorCount++;
                    }
                }
            }
        }

        if (errorCount > 0) {
            setIsError(true);
            setMessage(`❌ ${errorCount} assignments failed`);
        } else {
            setIsError(false);
            setMessage(`✅ ${successCount} assigned successfully${alreadyCount > 0 ? `, ${alreadyCount} already existed` : ''}`);
        }
        setSelectedBatches([]);
        setSelectedStudents([]);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this batch?')) {
            await API.delete(`/batches/${id}`);
            fetchBatches();
        }
    };

    return (
        <Layout>
            <h2 style={styles.title}>Batches</h2>

            {message && (
                <p style={{...styles.message, color: isError ? 'red' : 'green'}}>
                    {message}
                </p>
            )}

            <div style={styles.grid}>
                {/* Add Batch Form */}
                <div style={styles.form}>
                    <h3>Add New Batch</h3>
                    <form onSubmit={handleAddBatch}>
                        <input style={styles.input} placeholder="Batch Name" value={batchName} onChange={e => setBatchName(e.target.value)} required />
                        <input style={styles.input} placeholder="Class Name" value={className} onChange={e => setClassName(e.target.value)} required />
                        <label style={styles.label}>Start Time</label>
                        <input style={styles.input} type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required />
                        <label style={styles.label}>End Time</label>
                        <input style={styles.input} type="time" value={endTime} onChange={e => setEndTime(e.target.value)} required />
                        <button style={styles.button} type="submit">Add Batch</button>
                    </form>
                </div>

                {/* Assign Students */}
                <div style={styles.form}>
                    <h3>Assign Students to Batches</h3>
                    <p style={styles.hint}>Hold Ctrl to select multiple</p>
                    <form onSubmit={handleAssignStudent}>
                        <label style={styles.label}>Select Batches</label>
                        <select
                            style={{...styles.input, height: '120px'}}
                            multiple
                            value={selectedBatches}
                            onChange={e => setSelectedBatches([...e.target.selectedOptions].map(o => o.value))}>
                            {batches.map(b => (
                                <option key={b.id} value={b.id}>{b.batch_name}</option>
                            ))}
                        </select>
                        <label style={styles.label}>Select Students</label>
                        <select
                            style={{...styles.input, height: '120px'}}
                            multiple
                            value={selectedStudents}
                            onChange={e => setSelectedStudents([...e.target.selectedOptions].map(o => o.value))}>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                        <button style={styles.button} type="submit">Assign</button>
                    </form>
                </div>
            </div>

            {/* Batches List */}
            <div style={styles.table}>
                <h3>All Batches ({batches.length})</h3>
                <div style={styles.tableWrapper}>
                    <table style={styles.tableEl}>
                        <thead>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Batch Name</th>
                                <th style={styles.th}>Class</th>
                                <th style={styles.th}>Start Time</th>
                                <th style={styles.th}>End Time</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batches.map(batch => (
                                <tr key={batch.id}>
                                    <td style={styles.td}>{batch.id}</td>
                                    <td style={styles.td}>{batch.batch_name}</td>
                                    <td style={styles.td}>{batch.class_name}</td>
                                    <td style={styles.td}>{batch.start_time}</td>
                                    <td style={styles.td}>{batch.end_time}</td>
                                    <td style={styles.td}>
                                        <button onClick={() => handleDelete(batch.id)} style={styles.deleteBtn}>🗑️ Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

const styles = {
    title: { marginBottom: '20px', color: '#1a237e' },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
    },
    form: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        boxSizing: 'border-box',
        fontSize: '14px'
    },
    label: { fontSize: '13px', color: '#666', marginBottom: '5px', display: 'block' },
    hint: { fontSize: '12px', color: '#999', marginBottom: '10px' },
    button: {
        backgroundColor: '#1a73e8',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '15px',
        width: '100%'
    },
    message: { padding: '10px', borderRadius: '5px', marginBottom: '20px' },
    table: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    tableWrapper: { overflowX: 'auto' },
    tableEl: { width: '100%', borderCollapse: 'collapse', minWidth: '500px' },
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
    }
};

export default Batches;