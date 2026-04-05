import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Layout from '../components/layout';

function Attendance() {
    const [attendance, setAttendance] = useState([]);
    const [batches, setBatches] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [searchType, setSearchType] = useState('batch');

    useEffect(() => {
        API.get('/batches/').then(res => setBatches(res.data));
        API.get('/students/').then(res => setStudents(res.data));
    }, []);

    const fetchByBatch = async () => {
        if (!selectedBatch || !selectedDate) return;
        const res = await API.get(`/attendance/batch/${selectedBatch}/${selectedDate}`);
        setAttendance(res.data);
    };

    const fetchByStudent = async () => {
        if (!selectedStudent) return;
        const res = await API.get(`/attendance/student/${selectedStudent}`);
        setAttendance(res.data);
    };

    const getStudentName = (id) => {
        const student = students.find(s => s.id === id);
        return student ? student.name : id;
    };

    const getBatchName = (id) => {
        const batch = batches.find(b => b.id === id);
        return batch ? batch.batch_name : id;
    };

    return (
        <Layout>
            <h2 style={styles.title}>Attendance Records</h2>

            <div style={styles.form}>
                <div style={styles.tabs}>
                    <button
                        style={searchType === 'batch' ? styles.activeTab : styles.tab}
                        onClick={() => setSearchType('batch')}>
                        📚 Search by Batch
                    </button>
                    <button
                        style={searchType === 'student' ? styles.activeTab : styles.tab}
                        onClick={() => setSearchType('student')}>
                        👨‍🎓 Search by Student
                    </button>
                </div>

                {searchType === 'batch' && (
                    <div style={styles.searchBox}>
                        <select style={styles.input} value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}>
                            <option value="">Select Batch</option>
                            {batches.map(b => (
                                <option key={b.id} value={b.id}>{b.batch_name}</option>
                            ))}
                        </select>
                        <input style={styles.input} type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
                        <button style={styles.button} onClick={fetchByBatch}>Search</button>
                    </div>
                )}

                {searchType === 'student' && (
                    <div style={styles.searchBox}>
                        <select style={styles.input} value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                            <option value="">Select Student</option>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                        <button style={styles.button} onClick={fetchByStudent}>Search</button>
                    </div>
                )}
            </div>

            <div style={styles.table}>
                <h3>Results ({attendance.length} records)</h3>
                {attendance.length === 0 ? (
                    <p style={styles.noData}>No records found — search above</p>
                ) : (
                    <div style={styles.tableWrapper}>
                        <table style={styles.tableEl}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>ID</th>
                                    <th style={styles.th}>Student</th>
                                    <th style={styles.th}>Batch</th>
                                    <th style={styles.th}>Date</th>
                                    <th style={styles.th}>Time</th>
                                    <th style={styles.th}>Status</th>
                                    <th style={styles.th}>Confidence</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.map(record => (
                                    <tr key={record.id}>
                                        <td style={styles.td}>{record.id}</td>
                                        <td style={styles.td}>{getStudentName(record.student_id)}</td>
                                        <td style={styles.td}>{getBatchName(record.batch_id)}</td>
                                        <td style={styles.td}>{record.date}</td>
                                        <td style={styles.td}>{record.time}</td>
                                        <td style={styles.td}>
                                            <span style={{
                                                ...styles.badge,
                                                backgroundColor: record.status === 'present' ? '#4caf50' : '#f44336'
                                            }}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            {record.confidence_score ? `${(record.confidence_score * 100).toFixed(1)}%` : 'N/A'}
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
    form: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '30px'
    },
    tabs: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' },
    tab: {
        padding: '10px 20px',
        border: '2px solid #1a73e8',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: 'white',
        color: '#1a73e8',
        fontSize: '14px'
    },
    activeTab: {
        padding: '10px 20px',
        border: '2px solid #1a73e8',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#1a73e8',
        color: 'white',
        fontSize: '14px'
    },
    searchBox: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '14px',
        flex: 1,
        minWidth: '150px'
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
    tableEl: { width: '100%', borderCollapse: 'collapse', minWidth: '600px' },
    th: { backgroundColor: '#1a73e8', color: 'white', padding: '12px 10px', textAlign: 'left' },
    td: { padding: '10px', borderBottom: '1px solid #ddd', fontSize: '14px' },
    badge: {
        color: 'white',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold'
    },
    noData: { color: '#999', textAlign: 'center', padding: '30px' }
};

export default Attendance;