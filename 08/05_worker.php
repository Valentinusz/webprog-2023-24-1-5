<?php
// http://webprogramozas.inf.elte.hu/#!/subjects/webprog-pti/gyak/09

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

// $_GET szuperglobális tömb  tartalmazza az URL paramétereket
// minden érték string típusként érkezik, ha számként akarnánk használni konverziót kéne végezni
var_dump($_GET);

// munka típusok lekérése (select generáláshoz)
$jobs = array_unique(array_map(fn($w) => $w['job'], $workers));

// isset megvizsgálja létezik-e az adott változó
// esetünkben, ha igen akkor a felhasználó szűrni akart a dolgozó nevére
if (isset($_GET['name'])) {
    // workers tömböt felülírhatjuk, mivel minden kérésnél új PHP szkript indul
    $workers = array_filter(
            $workers,
            fn($w) => str_contains(strtolower($w['name']),
            strtolower($_GET['name']))
    );
}

// hasonlóan járunk el a job esetében is
// 'job' kulcs hiánya vagy üressége azt jelenti a felhasználó nem akart szűrni
if (isset($_GET['job']) && strlen($_GET['job']) !== 0) {
    $workers = array_filter($workers, fn($w) => $w['job'] === $_GET['job']);
}

// maximum fizetés meghatározása
$max = array_reduce(
        $workers,
        fn($max, $current) => max($max, $current['salary']),
        0
);
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
        <!-- Felhasználóbarát állapottartóvá tenni az űrlapot. -->
        <input id='name' name='name' value='<?= $_GET['name'] ?? '' ?>'>

        <label for='job'>Foglalkozás</label>
        <select id='job' name='job'>
            <option></option>
            <?php foreach ($jobs as $job): ?>
                <option <?= isset($_GET['job']) && $_GET['job'] === $job ? 'selected' : '' ?>><?= $job ?></option>
            <?php endforeach; ?>
        </select>
        <button>Szűrés</button>
    </form>
    <table>
        <thead>
        <tr>
            <th>Név</th>
            <th>Foglalkozás</th>
            <th>Fizetés</th>
        </tr>
        </thead>
        <?php foreach ($workers as $worker): ?>
            <tr <?php if($worker['salary'] === $max): ?> style='background-color: orange' <?php endif; ?>>
                <td><?= $worker['name'] ?></td>
                <td><?php echo $worker['job'] ?></td>
                <td><?= $worker['salary'] ?></td>
            </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
