<?php
$sig = $_POST['output'];

// or the better way, using PHP filters
$sig = filter_input(INPUT_POST, 'output', FILTER_UNSAFE_RAW);
