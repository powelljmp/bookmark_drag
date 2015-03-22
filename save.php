<?php

$del 	= isset($_GET['delete'])? $_GET['delete'] : false;
$in 	= $_GET['id'];
$url 	= $_GET['url'];
$title 	= $_GET['title'];
$x 		= isset($_GET['x'])? $_GET['x'] : 0;
$y 		= isset($_GET['y'])? $_GET['y'] : 0;
$layer	= isset($_GET['layer'])? $_GET['layer'] : "";
$tags	= isset($_GET['tags'])? $_GET['tags'] : "";

echo "saving {$in}";

$file = "./example2.json";

$string = file_get_contents($file);
$json_a = json_decode($string, true);

print_r($json_a );

if($del){
	unset($json_a[$in]);
}else{
	$json_a[$in] = array(
		"title"=>$title, 
		"url"=>$url,
		"x"=>(int)$x,
		"y"=>(int)$y,
		"layer"=>$layer,
		"tags"=>$tags
	);

	print_r($json_a );
}

$fh = fopen($file, 'w') or die("can't open file");
fwrite($fh, json_encode($json_a));
fclose($fh);

exit();
