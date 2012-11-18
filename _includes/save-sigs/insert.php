<?php
// Open the database connection
$db = new PDO($dsn, $user, $pass);
// Make sure we are talking to the database in UTF-8
$db->exec('SET NAMES utf8');

// Create some other pieces of information about the user
//  to confirm the legitimacy of their signature
$sig_hash = sha1($output);
$created = time();
$ip = $_SERVER['REMOTE_ADDR'];

// Use PDO prepare to insert all the information into the database
$sql = $db->prepare('
  INSERT INTO signatures (signator, signature, sig_hash, ip, created)
  VALUES (:signator, :signature, :sig_hash, :ip, :created)
');
$sql->bindValue(':signator', $name, PDO::PARAM_STR);
$sql->bindValue(':signature', $output, PDO::PARAM_STR);
$sql->bindValue(':sig_hash', $sig_hash, PDO::PARAM_STR);
$sql->bindValue(':ip', $ip, PDO::PARAM_STR);
$sql->bindValue(':created', $created, PDO::PARAM_INT);
$sql->execute();
