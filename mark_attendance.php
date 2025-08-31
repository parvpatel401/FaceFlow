<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->student_id) || !isset($data->status)) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'Missing student_id or status.']);
    exit();
}

$student_id_from_script = $conn->real_escape_string($data->student_id);
$status = $conn->real_escape_string($data->status);
$attendance_date = date('Y-m-d');
$attendance_time = date('H:i:s');

// First, get the internal numeric ID from the students table using the student_id string
$id_query = "SELECT id FROM students WHERE student_id = '$student_id_from_script' LIMIT 1";
$result = $conn->query($id_query);

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => "Student with ID '$student_id_from_script' not found."]);
    exit();
}

$student_row = $result->fetch_assoc();
$student_internal_id = $student_row['id'];

// Check if attendance for this student has already been marked today to avoid duplicates
$check_sql = "SELECT id FROM attendance WHERE student_id = ? AND attendance_date = ?";
$stmt_check = $conn->prepare($check_sql);
$stmt_check->bind_param("is", $student_internal_id, $attendance_date);
$stmt_check->execute();
$check_result = $stmt_check->get_result();

if ($check_result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => "Attendance for student $student_id_from_script already marked today."]);
    $stmt_check->close();
    $conn->close();
    exit();
}
$stmt_check->close();


// Insert the new attendance record
$sql = "INSERT INTO attendance (student_id, attendance_date, attendance_time, status) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isss", $student_internal_id, $attendance_date, $attendance_time, $status);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => "Attendance marked for student $student_id_from_script."]);
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
