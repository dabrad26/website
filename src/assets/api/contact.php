<?php
    session_cache_limiter( 'nocache' );
    header( 'Expires: ' . gmdate( 'r', 0 ) );
    header( 'Content-type: application/json' );

    $to         = 'davidbradshaw415@gmail.com';
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);

    $subject    = strip_tags($_POST['subject']);
    $email       = strip_tags($_POST['email']);
    $name       = strip_tags($_POST['name']);
    $message    = strip_tags(nl2br( htmlspecialchars($_POST['message'], ENT_QUOTES)));
    $result     = array();


    if(empty($name)){

        $result = array( 'response' => 'error', 'empty'=>'name', 'message'=>'<strong>Error!</strong>&nbsp; Name is required.' );
        echo json_encode($result);
        die;
    }

    if(empty($email)){

        $result = array( 'response' => 'error', 'empty'=>'email', 'message'=>'<strong>Error!</strong>&nbsp; Email is required.' );
        echo json_encode($result );
        die;
    }

    if(empty($message)){

         $result = array( 'response' => 'error', 'empty'=>'message', 'message'=>'<strong>Error!</strong>&nbsp; Message body is required.' );
         echo json_encode($result );
         die;
    }



    $headers  = "From: " . $name . ' <' . $email . '>' . "\r\n";
    $headers .= "Reply-To: ". $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";


    $templateTags =  array(
        '{{subject}}' => $subject,
        '{{email}}'=>$email,
        '{{message}}'=>$message,
        '{{name}}'=>$name,
        '{{phone}}'=>$phone
        );


    $contents = "<table><tbody><tr><td><h2>Subject: " . $subject . "</h2><p>Name: " . $name . "</p><p>E-mail: " . $email . "</p><p>" . $message . "</p></td></tr></tbody></table>";

    if ( mail( $to, "[David Website]: " . $subject, $contents, $headers ) ) {
        $result = array( 'response' => 'success', 'message'=>'<strong>Thank You!</strong>&nbsp; Your email has been delivered.' );
    } else {
        $result = array( 'response' => 'error', 'message'=>'<strong>Error!</strong>&nbsp; Cann\'t Send Mail.'  );
    }

    echo json_encode( $result );

    die;
?>
