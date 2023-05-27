song="";
scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristY = 0;
leftWristX = 0;

rightWristY = 0;
rightWristX = 0;

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
}

function modelLoaded()
{
    console.log('PoseNet is initialized');
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);

    
    fill('#FF0000');
    stroke('#FF0000');
    if (scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20)

        if(scoreRightWrist > 0 && scoreRightWrist <= 100)
        {
            document.getElementById('speed').innerHTML = "Speed = 0.5";
            song.rate(0.5);
        }
        else if(scoreRightWrist > 100 && scoreRightWrist <=200)
        {
            document.getElementById('speed').innnerHTML = "Speed = 1";
            song.rate(1);
        }
        else if(scoreRightWrist > 200 && scoreRightWrist <= 300)
        {
            document.getElementById('speed').innerHTML = "Speed = 1.5";
            song.rate(1.5);
        }
        else if(scoreRightWrist > 300 && scoreRightWrist <= 400)
        {
            document.getElementById('speed').innerHTML = "Speed = 2";
            song.rate(2);
        }
        else if(scoreRightWrist > 400 && scoreRightWrist <=500)
        {
            document.getElementsById('speed').innerHTML = "Speed = 2.5";
            song.rate(2.5);
        }
    }
    
    if (scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristy,20);
        InNumberleftWristX = Number(leftWristX);
        remove_decimals = floor(InNumberleftWristX);
        volume = remove_decimals/500;
        document.getElementById("Volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function preload()
{
    song = loadSound("music.mp3");
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0);
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristx = " + leftWristX + "leftWristy = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristx = " + rightWristX + "rightWristy = " + rightWristY);     
    }
}


  
