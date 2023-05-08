const baseUrl = '/api/savedImages';

class UploadFiles {
  async upload(file) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'myUploads');
    data.append("api_key", '231941467471291');
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/pdfuuif0cy/image/upload', {
        method: 'POST',
        body: data
      }).then(r => r.json());
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new UploadFiles();
