<h1>ARRAY</h1>
<?php
  $cars = array("Volvo","BMW","Nissan");
  $cars = ["Volvo","BMW","Nissan"];

  //echo $cars[1];

  $userInformation = array(
    "firstname"=>"Richmon",
    "lastname"=>"Pascual",
    "role"=>"admin"
  );
  $userInformation["address"] = 'bocaue'; 

  echo $userInformation['role'];
  //print all arrays
  print_r($userInformation);
  echo "<br/>";
  var_dump($userInformation);
  echo "</pre>";

  $user = array(
     "information"=> array(
        "firstname"=>"Richmon",
        "lastname"=>"Pascual",
     ),
     "roles"=>array(
        "instructor",
        "student"
     ),
     "address"=>array(
        "province"=>"bulacan",
        "municipality"=>"bocaue",
        "city"=>"New townsville"
     )
     );

     echo "<h1>".$user["address"]["province"]."</h1>";
     echo "<h2>".$user["roles"][1]."</h2>";
?>