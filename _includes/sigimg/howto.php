<?php
require_once 'signature-to-image.php';

$json = $_POST['output'];
$img = sigJsonToImage($json);

imagepng($img, 'signature.png');
imagedestroy($img);
