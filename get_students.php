<?php
include 'db.php';
session_start();

// Ensure the user is logged in before fetching data
if (!isset($_SESSION['user_id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(['success' => false, 'message' => 'User not authenticated.']);
    exit();
}

$user_id = $_SESSION['user_id'];

// Fetches all students associated with the logged-in user
$sql = "SELECT student_id, roll_no, class, section, institution, enrollment_date FROM students WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$students = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
}

echo json_encode($students);

$stmt->close();
$conn->close();
?>
