<?php
// Database connection
$servername = "localhost"; 
$username = "root";        // Default in XAMPP
$password = "Parvsql401";            // Default is empty in XAMPP
$dbname = "faceflow_ai";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Collect form data
$user = $_POST['username'];
$pass = $_POST['password'];

// Hash password before storing (for security)
$hashed_pass = password_hash($pass, PASSWORD_DEFAULT);

// Insert into database
$sql = "INSERT INTO users (username, password) VALUES ('$user', '$hashed_pass')";

if ($conn->query($sql) === TRUE) {
    // Redirect to dashboard
    header("Location: dashboard.html");
    exit();
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

