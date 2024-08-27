import './App.css';
import { useState } from 'react';
import imageCompression from 'browser-image-compression';

const COMPRESSION_THRESHOLD = 150 * 1024;

function App() {
  const [fileSize, setFileSize] = useState<string>('')
  // the goal of this app is the user to upload a file and then compress it
  // after that compression the file is sent to the server for further processing
  // the server will then return the compressed file to the user
  const handleInputChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    setFileSize(String(file?.size))
    const fileSize = Number(file?.size)
    if(fileSize >  COMPRESSION_THRESHOLD){
      alert(`it passes the threshold for ${fileSize - COMPRESSION_THRESHOLD} bytes`)
      console.log(`${file?.size}`)
    } else{
      return
    }
  }

  const handleUpload = async () => {

    const response = await fetch('http://localhost:3001/upload', {
      method:'POST',
      body: ''
    })
    if(!response.ok){
      alert(`HTTP error! status: ${response.status}`)
    }
  }
  return (
    <div className="App">
      <div className="App">
      <h1 className='image-comp-h1'>Image Compressor</h1>
      <input type="file" accept="image/*" onChange={handleInputChange} />
      <h3>fileSize</h3>
      {fileSize  ? `${Number(fileSize)/1000} kbytes` : 'upload your file to know the size'}
      </div>
    </div>
  );
}

export default App;
