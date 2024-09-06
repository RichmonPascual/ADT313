<?php
   echo "Conditional statements <br/>";
     
   $showVariable == true;
   $name = "Richmon";
   $auth = false;
   if($showVariable == true){
      echo $name;
   }elseif($showVariable && $name == 'Richmon' && $auth){
      echo "Hello" .$name;
   }elseif($showVariable && $name){
      echo 'Not Richmon';
   }else{
      echo "Else statement";
   }
     
   $anotherVariable = ($showVariable == true)  ? $name : "short hand: else";
   echo $anotherVariable;
?>