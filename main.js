//video=""
statuss=""
objects=[]

function preload(){
    video=createVideo("video.mp4")
}

function setup(){
    canvas=createCanvas(480,380)
    canvas.center()
    video.hide()
}

function draw(){
    image(video,0,0,480,380)
    if(statuss !=""){
        objectDetector.detect(video, gotResults)
    }
    for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML = "Objects Being Detected"
        document.getElementById("num_of_obj").innerHTML="Number of Objects is"+ objects.length
        fill('#d37c02')
        percent=floor(objects[i].confidence*100)
        text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15)
        noFill()
        stroke("#d37c02")
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
    }

}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("accuracy").innerHTML="Detecting Objects..."
}

function modelLoaded(){
    console.log("Model is Loaded")
    statuss=true
    video.loop()
    video.speed(1)
    video.volume(0)
}

function gotResults(error, results){
if(error){
console.error(error)
}
else{
    console.log(results)
    objects=results
}
}