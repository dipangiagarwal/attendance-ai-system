import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Layout from '../components/layout';

function Students() {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [studentPhone, setStudentPhone] = useState('');
    const [parentPhone, setParentPhone] = useState('');
    const [className, setClassName] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await API.get('/students/');
            setStudents(res.data);
        } catch (err) {
            console.error("Error fetching students:", err);
        }
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('student_phone', studentPhone);
        formData.append('parent_phone', parentPhone);
        formData.append('class_name', className);
        formData.append('joining_date', joiningDate);
        if (photo) formData.append('photo', photo);

        try {
            // Cookie is sent automatically by browser ✅
            // DO NOT set Authorization header manually
            await API.post('/students/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setIsError(false);
            setMessage('✅ Student added successfully!');
            fetchStudents();

            // Reset form
            setName('');
            setEmail('');
            setStudentPhone('');
            setParentPhone('');
            setClassName('');
            setJoiningDate('');
            setPhoto(null);

        } catch (err) {
            setIsError(true);
            const detail = err.response?.data?.detail;
            if (err.response?.status === 401) {
                setMessage('❌ Not authenticated. Please login again.');
            } else {
                setMessage(detail || '❌ Error adding student');
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await API.delete(`/students/${id}`);
                fetchStudents();
            } catch (err) {
                if (err.response?.status === 401) {
                    alert('❌ Not authenticated. Please login again.');
                } else {
                    alert(err.response?.data?.detail || '❌ Error deleting student');
                }
            }
        }
    };

    return (
        <Layout>
            <h2>Students</h2>

            {/* Add Student Form */}
            <div style={styles.form}>
                <h3>Add New Student</h3>
                {message && (
                    <p style={{ ...styles.message, color: isError ? 'red' : 'green' }}>
                        {message}
                    </p>
                )}
                <form onSubmit={handleAddStudent}>
                    <div style={styles.grid}>
                        <input style={styles.input} placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
                        <input style={styles.input} placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <input style={styles.input} placeholder="Student Phone" value={studentPhone} onChange={e => setStudentPhone(e.target.value)} required />
                        <input style={styles.input} placeholder="Parent Phone" value={parentPhone} onChange={e => setParentPhone(e.target.value)} required />
                        <input style={styles.input} placeholder="Class Name" value={className} onChange={e => setClassName(e.target.value)} required />
                        <input style={styles.input} type="date" value={joiningDate} onChange={e => setJoiningDate(e.target.value)} required />
                    </div>
                    <input style={styles.input} type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} />
                    <button style={styles.button} type="submit">Add Student</button>
                </form>
            </div>

            {/* Students List */}
            <div style={styles.table}>
                <h3>All Students ({students.length})</h3>
                <div style={styles.tableWrapper}>
                    <table style={styles.tableEl}>
                        <thead>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Photo</th>
                                <th style={styles.th}>Name</th>
                                <th style={styles.th}>Email</th>
                                <th style={styles.th}>Student Phone</th>
                                <th style={styles.th}>Parent Phone</th>
                                <th style={styles.th}>Class</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id} style={styles.row}>
                                    <td style={styles.td}>{student.id}</td>
                                    <td style={styles.td}>
                                        {student.photo_url
                                            ? <img src={student.photo_url} alt="student" style={styles.photo} />
                                            : <div style={styles.noPhoto}>N/A</div>
                                        }
                                    </td>
                                    <td style={styles.td}>{student.name}</td>
                                    <td style={styles.td}>{student.email}</td>
                                    <td style={styles.td}>{student.student_phone}</td>
                                    <td style={styles.td}>{student.parent_phone}</td>
                                    <td style={styles.td}>{student.class_name}</td>
                                    <td style={styles.td}>
                                        <button onClick={() => handleDelete(student.id)} style={styles.deleteBtn}>
                                            🗑️ Delete
                                        </button>
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
        marginBottom: '10px',
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
        fontSize: '16px'
    },
    message: {
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px'
    },
    table: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    tableWrapper: { overflowX: 'auto' },
    tableEl: {
        width: '100%',
        borderCollapse: 'collapse',
        minWidth: '600px'
    },
    th: {
        backgroundColor: '#1a73e8',
        color: 'white',
        padding: '12px 10px',
        textAlign: 'left',
        fontSize: '14px'
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        fontSize: '14px'
    },
    row: { transition: 'background 0.2s' },
    photo: {
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    noPhoto: {
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        backgroundColor: '#ddd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        color: '#666'
    },
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

export default Students;