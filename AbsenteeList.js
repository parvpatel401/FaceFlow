// AbsenteeList.js
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Button } from 'react-native';
import { fetchAbsentees } from '../api';

export default function AbsenteeList({ onSelect }) {
  const [absentees, setAbsentees] = useState([]);

  useEffect(() => {
    fetchAbsentees().then(setAbsentees).catch(() => setAbsentees([]));
  }, []);

  return (
    <ScrollView style={{ marginTop: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Today's Absentees</Text>
      {absentees.map(abs => (
        <Text key={abs.email} style={{ margin: 8 }}>
          {abs.username} ({abs.email})
          <Button title="Edit Attendance" onPress={() => onSelect(abs)} />
        </Text>
      ))}
      {absentees.length === 0 && <Text>No absentees reported.</Text>}
    </ScrollView>
  );
}
