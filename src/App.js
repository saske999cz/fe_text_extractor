import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faFileLines, faImage, faImages, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';


function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [text, setText] = useState("");

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(text).then(() => {
        alert("Text copied to clipboard!");
      });
    } catch (err) {
      console.error("Unable to copy text: ", err);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  const clearImage = () => {
    setSelectedImage(null);
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  return (
    <div className="App w-full h-[100%] flex flex-col">
    <div className="w-full h-24 min-h-[150px] min-w-min flex flex-row items-center justify-center">
      <h1 className='w-[200px] text-[28px] font-bold text-[#2E3856]'>Text Extracator</h1>
    </div>
    <div className='body w-full h-[600px] min-w-min flex flex-row items-center justify-around'>
    <div className='image_uploader w-[40%] h-[500px] flex flex-col items-center justify-center mt-[-30px]'>
    <h1 className='text-2xl font-bold text-[#2E3856] mb-3'>Upload Image</h1>
      <div className={`border-2 border-solid border-gray-300 image_container w-full h-[400px] flex flex-col items-center justify-center rounded-[15px] cursor-pointer`} onDrop={handleDrop}
      onDragOver={preventDefault} onClick={openFileInput}>
      <FontAwesomeIcon icon={faImages} className={`${selectedImage ? "hidden" : ""} text-[70px] text-blue-500 mb-7`} />
      <label htmlFor="imageInput" className={`${selectedImage ? "hidden" : "" } text-[#2E3856] rounded text-[18px] font-semibold`}>
        {selectedImage ? 'Change Image' : 'Drag & Drop or Browse for Image'}
      </label>
      <input
  type="file"
  id="imageInput"
  className="hidden"
  accept=".png, .jpg"
  onChange={handleImageChange}
  ref={fileInputRef}
/>
      {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected Image"
            className=" max-w-full max-h-[100%] h-auto rounded-[15px] object-fit"
          />
      )}
      {!selectedImage && (
        <p className= {` ${selectedImage ? "hidden" : ""} mt-4 text-gray-500 text-[15px]`}>Supported formats: PNG, JPG</p>
      )}
      </div>
      </div>
      <FontAwesomeIcon icon={faRightLong} className='text-[48px] text-[#2E3856]'/>
      <div className='text_after_extraction w-[40%] h-[500px] flex flex-col items-center justify-center mt-[-30px]'>
      <h1 className='text-2xl font-bold text-[#2E3856] mb-3'>Extracted Text</h1>
      <div className='text_container w-full h-[400px] border-2 border-solid border-gray-300 flex items-center justify-center rounded-[15px]'>
          <p className='font-semibold text-[20px] w-[80%] max-h-[350px] h-auto text-[#2E3856] tracking-wide overflow-auto' style={{
                    overflowWrap: "anywhere",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}>Text</p>
      </div>
    </div>
    </div>
    <div className='actions w-full h-[150px] flex flex-col items-center mt-[-50px]'>
      <p className='text-[20px] font-semibold text-[#2E3856]'>Actions</p>
      <div className='w-full h-[40px] buttons flex flex-row items-center justify-center mt-8 relative'>
      <button
            className={`w-[180px] h-[40px] text-white bg-blue-500 rounded-[5px] px-4 py-2 hover:bg-blue-400 mr-4`}
            onClick={openFileInput}
          >
            Change Image &nbsp;<FontAwesomeIcon icon={faImage} />
          </button>
          <button className='w-150px h-[40px] text-white bg-emerald-500 rounded-[5px] px-4 py-2 hover:bg-emerald-400 mr-4'>
            Extract Text &nbsp;<FontAwesomeIcon icon={faFileLines} />
          </button>
          <button className='w-150px h-[40px] text-white bg-violet-500 rounded-[5px] px-4 py-2 hover:bg-violet-400' onClick={handleCopyClick}>
            Copy Text &nbsp;<FontAwesomeIcon icon={faCopy} />
          </button>
      </div>
    </div>
    </div>
  );
}

export default App;
