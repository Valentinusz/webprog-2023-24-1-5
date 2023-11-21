<?php

$students = [
    ['name' => 'Student1', 'age' => 20],
    ['name' => 'Student2', 'age' => 10],
    ['name' => 'Student3', 'age' => 30],
    ['name' => 'Student4', 'age' => 20],
    ['name' => 'Student5', 'age' => 10],
];

if (isset($_GET['age']) && filter_var($_GET['age'], FILTER_VALIDATE_INT)) {
    $age = intval($_GET['age']);

    $students = array_filter($students, fn($student) => $student['age'] === $age);
}

?>


<!DOCTYPE html>
<html lang='hu'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport'
          content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>Diákok</title>
</head>
<body>
    <ul>
        <?php foreach ($students as ['name' => $name, 'age' => $age]): ?>
            <li><?= $name ?> (<?= $age ?>)</li>
        <?php endforeach; ?>
    </ul>
</body>
</html>