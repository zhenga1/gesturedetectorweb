const fingerJoints = {
    thumb:[0,1,2,3,4],
    indexFinger:[0,5,6,7,8],
    middleFinger:[0,9,10,11,12],
    ringFinger:[0,13,14,15,16],
    pinky:[0,17,18,19,20]
}

//named export of relevant function
export const drawhand = (predictions,ctx)=>{
    if(predictions.length>0){
        //Loop through predictions
        predictions.forEach(prediction=>{
            const landmarks = prediction.landmarks;

            //Looping throuhg fingers
            //To draw line connecting landmarks
            for(let j=0;j<Object.keys(fingerJoints);j++){
                let finger = Object.keys(fingerJoints)[j];
                //This is the finger, the thumb, indexFinger, ... or whatever the finger is
                for(let k=0;k<fingerJoints[finger].length-1;k++){
                    const firstjointindex = fingerJoints[finger][k];
                    const secondjointindex = fingerJoints[finger][k+1];
                    ctx.beginPath();
                    ctx.moveTo(
                        landmarks[firstjointindex][0],
                        landmarks[firstjointindex][1]
                    );
                    ctx.lineTo(
                        landmarks[secondjointindex][0],
                        landmarks[secondjointindex][1]
                    );
                    ctx.strokeStyle="plum";
                    ctx.stroke();
                }

            }
            //Drawing circles on landmarks themselves
            for(let i=0;i<landmarks.length;i++){
                const x = landmarks[i][0];
                const y = landmarks[i][1];

                ctx.beginPath();
                ctx.arc(x,y,10,0,3*Math.PI);

                //set line color
                ctx.fillStyle = "gold";
                ctx.fill();
            }

        })
    }
}