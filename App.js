// App.js
import React, { useState } from 'react';
import { SafeAreaView, Button } from 'react-native';
import StudentList from './components/StudentList';
import AbsenteeList from './components/AbsenteeList';
import AttendanceEditor from './components/AttendanceEditor';

export default function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedAbs, setSelectedAbs] = useState(null);
  const [showView, setShowView] = useState('students'); // 'students', 'absentees', 'edit'

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Button title="View Students" onPress={() => setShowView('students')} />
      <Button title="View Absentees" onPress={() => setShowView('absentees')} />

      {showView === 'students' && (
        <StudentList onEdit={student => {
          setSelectedStudent(student);
          setShowView('edit');
        }} />
      )}

      {showView === 'absentees' && (
        <AbsenteeList onSelect={abs => {
          setSelectedAbs(abs);
          setShowView('edit');
        }} />
      )}

      {showView === 'edit' && (selectedStudent || selectedAbs) && (
        <AttendanceEditor
          selected={selectedStudent || selectedAbs}
          onDone={() => {
            setSelectedStudent(null);
            setSelectedAbs(null);
            setShowView('students');
          }}
        />
      )}
    </SafeAreaView>
  );
}
