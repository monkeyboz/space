<html>
    <head>
    </head>
    <body>
        <div></div>
        <canvas id="canvas"></canvas>
        <script>
            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');
            
            var rectangles = [{'height':100,'width':100,'x':100,'y':100},{'height':100,'width':100,'x':200,'y':200}];
            var finish = {'x':0,'y':0};
            
            function layout(el){
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                
                ctx.clearRect(0,0,canvas.width,canvas.height);
                
                for(a in rectangles){
                    create_rectangle(rectangles[a]);
                }
                
                
                var start = {'x':el.pageX,'y':el.pageY};
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = 'rgba(0,0,0,.3)';
                ctx.moveTo(start.x,start.y);
                
                create_path(start,rectangles);
                ctx.stroke();
            }
            
            function create_rectangle(rectangle){
                ctx.fillStyle = 'black';
                ctx.rect(rectangle.x,rectangle.y,rectangle.width,rectangle.height);
                ctx.fill();
            }
            
            function create_path(start,rectangle){
                var current_position = {'x':start.x,'y':start.y};
                for(var a = rectangle.length-1; a > 0; --a){
                    if(current_position.y <= rectangle[a].y-rectangle[a].height){
                        ctx.lineTo(0,rectangle[a].height+rectangle[a].y);
                    } else {
                        if(current_position.x-rectangle[a].width < rectangle[a].x-(rectangle[a].width/2)){
                            ctx.lineTo(rectangle[a].x-10,rectangle[a].height+rectangle[a].y);
                            current_x = rectangle[a].x-10;
                        } else {
                            ctx.lineTo(rectangle[a].x+rectangle[a].width+10,rectangle[a].height+rectangle[a].y);
                            current_x = rectangle[a].x+rectangle[a].width+10;
                        }
                        ctx.lineTo(current_x,rectangle[a].y);
                    }
                    if(rectangle[parseInt(a)+1] == undefined){
                        ctx.lineTo(finish.x,finish.y);
                    } else {
                        current_position = {'x':current_x,'y':rectangle[a].y};
                    }
                }
            }
            
            layout({'pageX':300,'pageY':500});
        </script>
    </body>
</html>