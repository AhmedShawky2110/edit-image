// Start Variables

let contrast = document.getElementById("contrast");
let saturate = document.getElementById("saturate");
let brightness = document.getElementById("brightness");
let invert = document.getElementById("invert");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let hueRotate = document.getElementById("hue-rotate");
let blur = document.getElementById("blur");

let download = document.getElementById("download");
let upload = document.getElementById("upload");
let image = document.getElementById("image");

let reset = document.querySelector("span");
let imageBox = document.querySelector(".img-box");

let canvas= document.getElementById("canvas"); // we can edit canvas and download it wiht filters but we can not download image with filters
// the context used to draw in canvas
let ctx= canvas.getContext('2d');

// End Variables

window.onload= function(){
    imageBox.style.display = "none";
    reset.style.display = "none";
    download.style.display = "none";

}

upload.onchange= function(){
    resetFilters();
    
    // Start= to set the download file name with name uploaded and put copyrights 
    let realName= getRealName(upload.value);
    download.download=  realName;
    // End= used to set the download file name with name uploaded and put copyrights 

    imageBox.style.display = "block";
    reset.style.display = "block";
    download.style.display = "block";

    let file= new FileReader; // this class used to read files
    
    if (typeof upload.files[0] !== 'undefined') {
        file.readAsDataURL(upload.files[0]); // *upload is an object we choose the file selected
    }
    
    file.onload= function(){ // when the file loaded
        image.src= file.result; // put image url into the image src
    }

    image.onload= function(){
        canvas.width= image.width;
        canvas.height= image.height;
        ctx.drawImage(image, 0,0, canvas.width, canvas.height);
        image.style.display= 'none';
    }

}

let filters= document.querySelectorAll("ul li input");
// console.log(filters);

filters.forEach(function(filter){
    filter.addEventListener("input", function(){
        ctx.filter= `
            contrast(${contrast.value}%)
            saturate(${saturate.value}%)
            brightness(${brightness.value}%)
            invert(${invert.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            hue-rotate(${hueRotate.value}deg)
            blur(${blur.value}px)
        `;
        ctx.drawImage(image, 0,0, canvas.width, canvas.height);

    });
});


// Start Functions

function resetFilters(){
    ctx.filter= "none";
    contrast.value= "100";
    saturate.value= "100";
    brightness.value= "100";
    invert.value= "0";
    sepia.value= "0";
    blur.value= "0";
    grayscale.value= "0";
    hueRotate.value= "0";
    ctx.drawImage(image, 0,0, canvas.width, canvas.height);

}

function getRealName(path){
    let arr= path.split('\\');
    return "AhShawki" + arr[arr.length - 1];
}

// End Functions


download.onclick= function(){
    download.href= canvas.toDataURL(); // toDataURL Convert the image to the needed extention default: png
}
