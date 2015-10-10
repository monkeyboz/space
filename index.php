<html>
	<head>
		<title></title>
		<style>
			body{
				margin: 0px;
			}
		</style>
		<?php
		    $json = '{"elements":[';
		    $fh = fopen('elements.txt','r') or exit('cannot find');
		    while(($line = fgets($fh,4096)) !== false){
		        $line = explode("\t",str_replace("\r\n","",$line));
		        $elements = array($line[1][0]=>array($line));
		        $json .= json_encode($elements).',';
		    }
		    fclose($fh);
		    
		    $json = substr($json,0,-1).']}';
		?>
		<script src="js/space.js"></script>
		<script src="js/planet.js"></script>
		<script src="js/animal.js"></script>
		<script src="js/render.js"></script>
		<script src="js/galaxy_render.js"></script>
	</head>
	<body>
		<script>
			var elements = JSON.parse('<?php echo $json; ?>');
			
			var canvas = document.createElement('canvas');
        	canvas.setAttribute('id','canvas');
        	
        	var div = document.createElement('div');
        	div.setAttribute('id','loading');
        	div.textContent = 'Loading ...';
        	
        	document.getElementsByTagName('body')[0].appendChild(div);
        	document.getElementsByTagName('body')[0].appendChild(canvas);
        	
        	canvas = document.getElementById('canvas');
        	canvas.style.height = window.offsetHeight;
        	canvas.style.width = window.offsetWidth;
        	
        	var ctx = canvas.getContext('2d');
			
			var screens = { 'menu':'testing',
							'home':'testing',
							'space':'testing',
							'planet':'testing'};
			
			var render = new render('space');
			render.create_galaxies();
		</script>
	</body>
</html>