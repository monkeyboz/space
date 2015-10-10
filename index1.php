<?php
	$content = file_get_contents('http://graph.facebook.com/platform');
	echo $content;
?>
<html>
    <head>
    	<title>Layout</title>
    	<script src="js/galaxy_render.js"></script>
    </head>
    <body style="background: black">
        <div></div>
        <canvas id="canvas"></canvas>
        <script>
        	var canvas = document.getElementById('canvas');
        	canvas.width = window.innerWidth;
        	canvas.height = window.innerHeight;
        	
        	var ctx = canvas.getContext('2d');
        	ctx.width = canvas.offsetWidth;
        	ctx.height = canvas.offsetHeight;
        	
        	var galaxy = new galaxy_render(2);
        	galaxy.init();
        </script>
    </body>
</html>