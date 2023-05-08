const baseUrl = '/api/savedImages'
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
      return response.url;
    } catch (error) {
      console.error(error);
    }
  }
  async toDataBase(url){
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    return data.id;
  }
  async getImage(id){
    const response = await fetch(`${baseUrl}?id=${id}`)
    const data = await response.json()
    return data.url
  }

}

export default new UploadFiles();
