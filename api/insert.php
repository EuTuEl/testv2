<?php
require_once "../db/queries.php";

header("Content-Type:application/json");

$result = DB::insertCar($_POST);

if ($result){
    response(NULL, 200, "Success");
}else{
    response(NULL, 500,"Failed");
}

function response($data, $response_code, $response_desc): void {
    $response['data'] = $data;
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;

    $json_response = json_encode($response);
    echo $json_response;
}
