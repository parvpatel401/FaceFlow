<?php
session_start();

header('Content-Type: application/json');

// Include database connection
require_once 'db.php';

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

$stmt = $conn->prepare("SELECT id, username, email, password, created_at FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row['password'])) {
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['email']   = $row['email'];

        echo json_encode([
            "success"  => true,
            "message"  => "Login successful",
            "username" => $row['username'],
            "email"    => $row['email'],
            "joined"   => $row['created_at']  // ⚠️ matches schema
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid email or password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid email or password"]);
}

$stmt->close();
$conn->close();
?>
