// api.js
import axios from 'axios';

const API_BASE = 'http://YOUR_SERVER_IP:3000/api/v1'; // Update as needed

export const fetchAllStudents = () =>
  axios.get(`${API_BASE}/users`).then(res => res.data);

export const fetchAbsentees = () =>
  axios.get(`${API_BASE}/attendance/absentees`).then(res => res.data.absentees);

export const modifyAttendance = (userId, date, status, sessionId = null) =>
  axios.post(`${API_BASE}/attendance/modify`, { userId, date, status, sessionId });

export const fetchAttendance = () =>
  axios.get(`${API_BASE}/attendance`).then(res => res.data);
