// StudentList.js
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Button } from 'react-native';
import { fetchAllStudents } from '../api';

export default function StudentList({ onEdit }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchAllStudents().then(setStudents).catch(() => setStudents([]));
  }, []);

  return (
    <ScrollView style={{ marginTop: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>All Students</Text>
      {students.map(student => (
        <Text key={student.id} style={{ margin: 8 }}>
          {student.username} ({student.email})
          <Button title="Edit Attendance" onPress={() => onEdit(student)} />
        </Text>
      ))}
      {students.length === 0 && <Text>No students found.</Text>}
    </ScrollView>
  );
}
