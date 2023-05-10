import uploadFiles from "../controller/uploadHandler.js";
window.onload = async () => {
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
function toResult(image, type){
    return `
    <section class="One">
    <img src="${image}" alt="">
    <p>Acciedent ${type}</p>
    </section>
    `;
}