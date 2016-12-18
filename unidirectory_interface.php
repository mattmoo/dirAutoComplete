
<?php
    //A simple POST interface for University of Auckland unidirectory
    require 'curl_interface.php';

    $url = 'https://unidirectory.auckland.ac.nz/people/moar';

    $postdata = file_get_contents("php://input");

    $args = array (
        'hostkey' => 'search',
        'page' => '1',
        'rows' => '20',
        'search' => $postdata
    );

    $curl_interface = new curl_interface;

    $resp = $curl_interface->curl_get($url, $args);

    echo $resp;
