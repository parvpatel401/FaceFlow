<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username) || !isset($data->email) || !isset($data->password)) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
    exit();
}

$username = $conn->real_escape_string($data->username);
$email = $conn->real_escape_string($data->email);
$password = password_hash($conn->real_escape_string($data->password), PASSWORD_BCRYPT);

// Check if email already exists
$checkEmail = $conn->query("SELECT email FROM users WHERE email='$email'");
if ($checkEmail->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email is already registered.']);
    exit();
}

$sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true, 'message' => 'Registration successful. You can now log in.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
}

$conn->close();
?>
