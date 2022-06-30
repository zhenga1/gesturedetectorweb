//STEPS
//1. install fingerpose library DONE
//2. add use state DONE
//3. import emojis and finger pose import * as fp from fingerpose DONE
//4. update detection function for gesture handling
//5. Setup emoji and hook object
//6. Add emoji display to scrn

import React, {useRef,useState} from 'react';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose"
import Webcam from "react-webcam";
import logo from './logo.svg';
import './App.css';
import {draw_hand} from './infstone'
import * as fp from "fingerpose";
import victory from './victory.png';
import thumbs_up from './thumbs_up.png';
import thumbs_down from './thumbs_down.jpg';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [emoji,setEmoji] = useState(null);
  //A dictionary
  const images = {thumbs_up:thumbs_up,victory:victory,thumbs_down:thumbs_down};


  const runHandpose = async() =>{
    const net = await handpose.load();
    console.log("handpose loaded!!!");
    //Handpose loaded, now looped detection sequence will begin
    setInterval(()=>{
      detect(net);
    },100)
  }
  const detect = async(net) =>{
    //Check webcam data avaialbel
    if(
      typeof webcamRef.current !== undefined &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState===4
    ){
      //Webcam ready to collect data
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //set video width/height
      //This must be the video.videowidth, not the videoWidth only
      webcamRef.current.video.height = videoHeight;
      webcamRef.current.video.width = videoWidth;

      //set canvas width/height
      canvasRef.current.height = videoHeight;
      canvasRef.current.width = videoWidth;

      //Make detections
      const hand = await net.estimateHands(video);
      //console.log(hand);

      if(hand.length>0){
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture
        ]);
        const gesture = await GE.estimate(hand[0].landmarks,8);
        //console.log(gesture);
        if(gesture.gestures !== undefined && gesture.gestures.length>0){
          const confidence = gesture.gestures.map((prediction)=>
          prediction.confidence);
          const maxconfidence = confidence.indexOf(
            Math.max.apply(null,confidence)
          );
          //console.log(gesture)
          //console.log(maxconfidence);
          setEmoji(gesture.gestures[0].name);
          console.log(emoji);
        }
      }
      //Drawing
      const ctx = canvasRef.current.getContext('2d');
      draw_hand(hand,ctx);
      //console.log(ctx);
    }
  }
  runHandpose();
  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={webcamRef}
        style={{
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:0,
          right:0,
          textAlign:"center",
          zindex:9,
          width:640,
          height:480
        }}
        />
        <canvas ref={canvasRef}
        style={{
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:0,
          right:0,
          textAlign:"center",
          zindex:9,
          width:640,
          height:480
        }}/>
         {emoji !== null ? (
          <img
            src={images[emoji]}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 300,
              right: 0,
              textAlign: "center",
              height: 100,
            }}
          />
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;
