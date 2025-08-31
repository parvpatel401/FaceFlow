<?php
include 'db.php';
session_start();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    echo json_encode(['success' => false, 'message' => 'Missing login fields.']);
    exit();
}

$email = $conn->real_escape_string($data->email);
$password = $conn->real_escape_string($data->password);

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        echo json_encode(['success' => true, 'message' => 'Login successful!', 'user' => ['id' => $user['id'], 'username' => $user['username']]]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
}

$conn->close();
?>
