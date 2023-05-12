import uploadFiles from "../controller/uploadHandler.js";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
const Acc_MODEL = [{ name: "yolov5", child: ["best_web_model"] }];
let modelName = Acc_MODEL[0];

async function loadModel() {
  const model = await tf.loadGraphModel(`/model/${modelName.name}/${modelName.child[0]}/model.json`);
  console.log('Model loaded successfully!');
  // Use the model for inference, evaluation, or fine-tuning
}

loadModel().catch(error => {
  console.log('Error loading model: ', error);
});

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
