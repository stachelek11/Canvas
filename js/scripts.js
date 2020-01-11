var chosen_img;

window.onload = function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var img = document.getElementById("img");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img,0,0);
};

function choice(img_nr) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    chosen_img = img_nr.id;
    var img = document.getElementById(chosen_img);
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img,0,0);
}

function change_my_img() {
    if (chosen_img === undefined) {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var img = document.getElementById("img5");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img,0,0);
    }
    else {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var img = document.getElementById(chosen_img);
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        var myImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var red = document.getElementById("red");
        var green = document.getElementById("green");
        var blue = document.getElementById("blue");
        var transparency_25 = document.getElementById("transparency_25");
        var transparency_50 = document.getElementById("transparency_50");
        var transparency_75 = document.getElementById("transparency_75");
        var color_desaturation= document.getElementById("color_desaturation");
        var invert_color= document.getElementById("invert_color");

        function change_red(variable) {
            for (var i = 0; i < variable.length; i += 4) {
                variable[i + 1] = 0;
                variable[i + 2] = 0;
            }
        }

        if (red.checked === true) {
            change_red(myImageData.data);
        }

        function change_green(variable) {
            for (var i = 0; i < variable.length; i += 4) {
                variable[i] = 0;
                variable[i + 2] = 0;
            }
        }

        if (green.checked === true) {
            change_green(myImageData.data);
        }

        function change_blue(variable) {
            for (var i = 0; i < variable.length; i += 4) {
                variable[i] = 0;
                variable[i + 1] = 0;
            }
        }

        if (blue.checked === true) {
            change_blue(myImageData.data);
        }

        function change_transparency(variable, parameter) {
            for (var i = 0; i < variable.length; i += 4) {
                variable[i + 3] = parameter;
            }
        }

        if (transparency_25.checked === true) {
            change_transparency(myImageData.data, 191.25);
        }

        if (transparency_50.checked === true) {
            change_transparency(myImageData.data, 127.5);
        }

        if (transparency_75.checked === true) {
            change_transparency(myImageData.data, 63.75);
        }

        function change_color_desaturation(variable) {
            for (let i=0; i < variable.length; i += 4) {
                const r = variable[i];
                const g = variable[i+1];
                const b = variable[i+2];
                const rgb = (r+g+b) / 3;
                variable[i] = variable[i+1] = variable[i+2] = rgb;
            }
        }

        if (color_desaturation.checked === true) {
            change_color_desaturation(myImageData.data);
        }

        function change_invert_color(variable) {
            for (let i=0; i < variable.length; i += 4) {
                variable[i] =   255 - variable[i];
                variable[i+1] = 255 - variable[i+1];
                variable[i+2] = 255 - variable[i+2];
            }
        }

        if (invert_color.checked === true) {
            change_invert_color(myImageData.data);
        }

        ctx.putImageData(myImageData, 0, 0);
    }
}

function draw() {
    if (chosen_img === undefined) {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var img = document.getElementById("img5");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img,0,0);
    }
    else {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var square_black = document.getElementById("square_black");
        var square_color = document.getElementById("square_color");
        var heart = document.getElementById("heart");

        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min; ;
        }
        
        function draw_square_black() {
            const x = rand(10, canvas.width-100);
            const y = rand(10, canvas.height-100);
            const size = rand(10, 200);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + size, y);
            ctx.lineTo(x + size, y + size);
            ctx.lineTo(x, y + size);
            ctx.closePath();
            ctx.stroke();
        }

        if (square_black.checked === true) {
            draw_square_black();
        }

        function draw_square_color() {
            const x = rand(10, canvas.width-100);
            const y = rand(10, canvas.height-100);
            const size = rand(10, 200);
            var color = `hsla(${Math.random()*360}, 80%, 60%, 0.5)`;
            ctx.fillStyle = color;
            ctx.fillRect(x,y,size,size);
        }

        if (square_color.checked === true) {
            draw_square_color();
        }

        function draw_heart() {
            const x = rand(15, -canvas.width+150);
            const y = rand(20, -canvas.height+150);
            var color = `hsla(${Math.random()*360}, 80%, 60%, 0.5)`;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(75-x,40-y);
            ctx.bezierCurveTo(75-x,37-y,70-x,25-y,50-x,25-y);
            ctx.bezierCurveTo(20-x,25-y,20-x,62.5-y,20-x,62.5-y);
            ctx.bezierCurveTo(20-x,80-y,40-x,102-y,75-x,120-y);
            ctx.bezierCurveTo(110-x,102-y,130-x,80-y,130-x,62.5-y);
            ctx.bezierCurveTo(130-x,62.5-y,130-x,25-y,100-x,25-y);
            ctx.bezierCurveTo(85-x,25-y,75-x,37-y,75-x,40-y);
            ctx.fill();
        }

        if (heart.checked === true) {
            draw_heart();
        }
    }
}

function reset() {
    if (chosen_img === undefined) {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var img = document.getElementById("img5");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img,0,0);
    }
    else {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var img = document.getElementById(chosen_img);
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        var no_change = document.getElementById("no_change");
        var transparency_0 = document.getElementById("transparency_0");
        var color_desaturation = document.getElementById("color_desaturation");
        var invert_color = document.getElementById("invert_color");

        no_change.click();
        transparency_0.click();

        if (color_desaturation.checked === true) {
            color_desaturation.click();
        }

        if (invert_color.checked === true) {
            invert_color.click();
        }
    }
}

function clear_draw() {
        var square_black = document.getElementById("square_black");
        var square_color = document.getElementById("square_color");
        var heart = document.getElementById("heart");

        if (square_black.checked === true) {
            square_black.click();
        }

        if (square_color.checked === true) {
            square_color.click();
        }

        if (heart.checked === true) {
            heart.click();
        }
}


function upload(picture) {
    if (FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(picture.files[0]);
        reader.onload = function (file) {
            var image = new Image();
            image.src = file.target.result;
            chosen_img = "img";
            document.getElementById(chosen_img).src = image.src;
        }

        var delayscript = function () {
            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');
            var img = document.getElementById(chosen_img);
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img,0,0);
        }

        setTimeout(delayscript, 5)
    }
}

function replace() {
    var upload = document.getElementById("upload");
    var input_upload = document.getElementById("input_upload");
    var input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("style", "height: 100%");
    input.setAttribute("id", "input_upload");
    input.setAttribute("onchange", "upload(input_upload)")
    upload.replaceChild(input, input_upload);
}

function download() {
    var link = document.createElement('a');
    link.download = 'My_Canvas_Image.png';
    link.href = document.getElementById('canvas').toDataURL();
    link.click();
}