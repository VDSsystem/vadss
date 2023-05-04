const baseUrl = '/api/savedImages'

class UploadFiles {
    async upload(file) {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await fetch(baseUrl, {
              method: 'POST',
              body: formData
            })
  
            if (response.ok) {
                const result = await response.json();
                console.log('Image uploaded successfully:', result.imageUrl);
            } else {
              throw new Error('Upload failed')
            }
          } catch (error) {
            console.error(error)
          }
        }
        async getImages(){
            try {
                const response = await fetch(baseUrl);
                if (response.ok) {
                  const images = await response.json();
                  return images.data;
                } else {
                  throw new Error('Error retrieving images');
                }
              } catch (error) {
                console.error(error);
              }
            
        }
      
   
}

export default new UploadFiles()
