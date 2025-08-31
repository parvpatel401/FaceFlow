// AttendanceEditor.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { modifyAttendance } from '../api';

export default function AttendanceEditor({ selected, onDone }) {
  const [status, setStatus] = useState('Present');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function submit() {
    setLoading(true);
    try {
      await modifyAttendance(selected.id, date, status, sessionId || null);
      setMessage('Attendance updated!');
      setTimeout(onDone, 1500);
    } catch (err) {
      setMessage('Error updating attendance.');
    }
    setLoading(false);
  }

  return (
    <View style={{ marginTop: 16, padding: 16, backgroundColor: '#f2f2f2', borderRadius: 8 }}>
      <Text style={{ fontWeight: 'bold' }}>Edit Attendance for: {selected.username}</Text>
      <Text>Status:</Text>
      <TextInput
        value={status}
        onChangeText={setStatus}
        style={{ borderWidth: 1, borderColor: '#bbb', padding: 8, margin: 4 }}
        placeholder="Present/Absent/School Representative"
      />
      <Text>Date:</Text>
      <TextInput
        value={date}
        onChangeText={setDate}
        style={{ borderWidth: 1, borderColor: '#bbb', padding: 8, margin: 4 }}
      />
      <Text>Session ID (for session attendance):</Text>
      <TextInput
        value={sessionId}
        onChangeText={setSessionId}
        style={{ borderWidth: 1, borderColor: '#bbb', padding: 8, margin: 4 }}
        placeholder="Enter Session ID"
      />
      <Button title="Submit" onPress={submit} disabled={loading} />
      {message !== '' && <Text style={{ marginTop: 8 }}>{message}</Text>}
    </View>
  );
}
