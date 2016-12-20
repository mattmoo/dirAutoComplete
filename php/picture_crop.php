<?php
    //Hardcoded for security
    $url = 'https://unidirectory.auckland.ac.nz';

    //Sanitise input
    $img_path = filter_var($_GET["img_path"], FILTER_SANITIZE_URL);

    ini_set("allow_url_fopen", true);
    header("Content-type: image/jpeg");


    $image = imagecreatefromstring(file_get_contents($url . $img_path));

    $cropped = imagecropauto($image, IMG_CROP_THRESHOLD, .4, 16777215);
    if ($cropped !== false) { // in case a new image resource was returned
        imagedestroy($image);    // we destroy the original image
        $image = $cropped;       // and assign the cropped image to $im
    }

    //Crop a square, centred horizontally, at the top vertically, not including any pixels within a % of the border
    $width = imagesx($image);
    $height = imagesy($image);
    $size = min($width, $height);
    $borderPercent = .04;
    $cropped = imagecrop($image, ['x' => ($width-$size)/2+($size*$borderPercent), 'y' => ($size*$borderPercent), 'width' => ($size*(1-$borderPercent)), 'height' => ($size*(1-$borderPercent))]);
    if ($cropped !== FALSE) {
        imagedestroy($image);    // we destroy the original image
        $image = $cropped;       // and assign the cropped image to $im
    }


    imagejpeg($image);

?>
