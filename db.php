<?php
$servername = "localhost";
$username = "root";  // your db username
$password = "";      // your db password
$dbname = "faceflow_ai";
$port = 3306;
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>
