<?php

$workers = [
    ['name' => 'KING', 'job' => 'PRESIDENT', 'salary' => 5000],
    ['name' => 'BLAKE', 'job' => 'MANAGER', 'salary' => 2850],
    ['name' => 'CLARK', 'job' => 'MANAGER', 'salary' => 2450],
    ['name' => 'JONES', 'job' => 'MANAGER', 'salary' => 2975],
    ['name' => 'MARTIN', 'job' => 'SALESMAN', 'salary' => 1250],
    ['name' => 'ALLEN', 'job' => 'SALESMAN', 'salary' => 1600],
    ['name' => 'TURNER', 'job' => 'SALESMAN', 'salary' => 1500],
    ['name' => 'JAMES', 'job' => 'CLERK', 'salary' => 950],
    ['name' => 'WARD', 'job' => 'SALESMAN', 'salary' => 1250],
    ['name' => 'FORD', 'job' => 'ANALYST', 'salary' => 3000]
];

var_dump($_GET);

$filtered_workers = isset($_GET['name'])
    ? array_filter($workers, fn($w) => str_contains(strtolower($w['name']), strtolower($_GET['name'])))
    : $workers;

$max = array_reduce($filtered_workers, fn($max, $current) => max($max, $current['salary']), 0);

$jobs = array_unique(array_map(fn($w) => $w['job'], $workers));

$filtered_workers = isset($_GET['job'])
    ? array_filter($workers, fn($w) => $w['job'] === $_GET['job'] )
    : $workers;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>8. gyakorlat</title>
</head>
<body>
    <form>
        <label for='name'>Név</label>
        <input id='name' name='name' value='<?= $_GET['name'] ?? '' ?>'>
        <button>Szűrés</button>

        <label for='job'>Foglalkozás</label>
        <select id='job' name='job'>
            <option></option>
            <?php foreach ($jobs as $job): ?>
                <option <?= isset($_GET['job']) && $_GET['job'] === $job ? 'selected' : '' ?>><?= $job ?></option>
            <?php endforeach; ?>
        </select>
    </form>
    <table>
        <thead>
        <tr>
            <th>Név</th>
            <th>Foglalkozás</th>
            <th>Fizetés</th>
        </tr>
        </thead>
        <?php foreach ($filtered_workers as $worker): ?>
            <tr <?php if($worker['salary'] === $max): ?> style='background-color: orange' <?php endif; ?>>
                <td><?= $worker['name'] ?></td>
                <td><?php echo $worker['job'] ?></td>
                <td><?= $worker['salary'] ?></td>
            </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
