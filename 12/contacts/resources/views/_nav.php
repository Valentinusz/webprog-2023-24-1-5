<?php
/**
 * @var Auth $auth
 */
?>

<header>
    <nav role='menubar'>
        <ol>
            <li style='margin-right: auto'>Névjegyek</li>
            <?php if($auth->is_authenticated()): ?>
            <li><?= $auth->authenticated_user()['username'] ?></li>
            <li><a href='logout.php'>Kijelentkezés</a></li>
            <?php else: ?>
            <li><a href='login.php'>Bejelentkezés</a></li>
            <li><a href='register.php'>Regisztráció</a></li>
            <?php endif; ?>
        </ol>
    </nav>
</header>
