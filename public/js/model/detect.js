import uploadFiles from "../controller/uploadHandler.js";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
const Acc_MODEL = [{ name: "yolov5", child: ["best_web_model"] }];

const imageRef = document.querySelector("#image");
const videoRef = document.querySelector("#video");
const canvasRef = document.querySelector("#canvas");
const inputImageRef = document.querySelector("#inputImage");

let model = null;
let aniId = null;
let modelName = Acc_MODEL[0];
let loading = 0;

let singleImage = false;
let liveWebcam = false;

function setModel(mod) {
  model = mod;
}

function setLoading(fractions) {
  loading = fractions;
}

function loadModel() {
  tf.loadGraphModel(`/model/${modelName.name}/${modelName.child[0]}/model.json`, {
    onProgress: setLoading,
  }).then(async (mod) => {
    // warming up the model before using real data
    const dummy = tf.ones(mod.inputs[0].shape);
    const res = await mod.executeAsync(dummy);

    // clear memory
    tf.dispose(res);
    tf.dispose(dummy);

    // save to state
    setModel(mod);
  }).catch((err) => {
    console.error("Error loading model:", err);
  });
}


window.onload = async () => {
  loadModel();

    const uploadBTN = document.querySelector('.upload');
    uploadBTN.addEventListener('click', handleDetect);
}
async function handleDetect(){
   const result = document.querySelector('.result')
   const type = "detected"
   const fileInput = document.querySelector('#file'); 
    const imageUploaded = fileInput.files[0]; 
    console.log(imageUploaded);
    const imageURL = await uploadFiles.upload(imageUploaded)
    const imageID = await uploadFiles.toDataBase(imageURL)
    const toModel = await uploadFiles.toModel(imageID)
    console.log(toModel);
   /* const displayImage = await uploadFiles.getImage(toDataBase)
    console.log("imageURL!!! "+displayImage);
    result.innerHTML = toResult(displayImage, type)*/
  const form = document.querySelector("form")
  form.reset()

}
