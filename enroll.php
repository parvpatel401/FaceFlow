<?php
include 'db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not authenticated.']);
    exit();
}

$user_id = $_SESSION['user_id'];
$student_id = $_POST['student_id'];
$roll_no = $_POST['roll_no'];
$class = $_POST['class'];
$section = $_POST['section'];
$institution = $_POST['institution'];
$enrollment_date = date('Y-m-d');

// Handle the image upload
if (isset($_FILES['face_image'])) {
    $target_dir = "../public/uploads/";
    // Create a unique folder for each student
    $student_dir = $target_dir . $student_id . "/";
    if (!file_exists($student_dir)) {
        mkdir($student_dir, 0777, true);
    }
    
    $image_name = uniqid() . '.png';
    $target_file = $student_dir . $image_name;
    $image_path_for_db = "uploads/" . $student_id . "/" . $image_name;

    if (move_uploaded_file($_FILES['face_image']['tmp_name'], "../public/" . $image_path_for_db)) {
        $sql = "INSERT INTO students (user_id, student_id, roll_no, class, section, institution, enrollment_date, face_image_path)
                VALUES ('$user_id', '$student_id', '$roll_no', '$class', '$section', '$institution', '$enrollment_date', '$image_path_for_db')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'Student enrolled successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload image.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No face image provided.']);
}

$conn->close();
?>
