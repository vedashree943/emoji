var prediction1="";
var prediction2="";
Webcam.set({
    width:350,height:300,image_format:"png",png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML='<img id="capurted_image" src="'+data_uri+'"/>'
        
    });
    
}
console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier('https://storage.googleapis.com/tm-model/xKztslOR-/model.json',modelLoaded);
function modelLoaded() {
    console.log("model Loaded");
}
function speak() {
    var synth=window.speechSynthesis;
    speak_data_1="The First Prediction Is "+prediction1;
    speak_data_2="The Second Prediction Is "+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);

    
}
function check() {
    img=document.getElementById("capurted_image");
    classifier.classify(img,gotresult);
}
function gotresult(error,results) {
    if (error) {
        console.log(error);
        
    } else {
        console.log(results);
        document.getElementById("result_1").innerHTML=results[0].label;
        document.getElementById("result_2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if (results[0].label=="happy") {
            document.getElementById("emoji1").innerHTML="&#128522;";
        }
        if (results[0].label=="sad") {
            document.getElementById("emoji1").innerHTML="&#128532;";
        }
        if (results[0].label=="angry") {
            document.getElementById("emoji1").innerHTML="&#128548;";
        }
        if (results[1].label=="happy") {
            document.getElementById("emoji2").innerHTML="&#128522;";
        }
        if (results[1].label=="sad") {
            document.getElementById("emoji2").innerHTML="&#128532;";
        }
        if (results[1].label=="angry") {
            document.getElementById("emoji2").innerHTML="&#128548;";
        }
        
    }
    
}