import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../lib/firebase';

function App() {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];

    if(!file) return alert("Error: No image file choosed!")

    const storageRef = ref(storage, `${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setImgUrl(downloadURL);
        });
      }
    )
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(imgUrl).then(() => {
      setIsCopied(true);
    }, (err) => {
      alert(err);
    });
  }
  
  return (
    <>
      <main className="container flex flex-col justify-center items-center h-screen">
        <h1 className="text-6xl lg:text-8xl text-orange-600 font-bold">Imagezing</h1>
        <p className="mt-6 text-lg mb-10">Upload and host your image for free.</p>

        { !imgUrl &&
          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
          <input type="file" accept="image/*" className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-orange-50 file:text-orange-700
            hover:file:bg-orange-100
          "/>
          <button type="submit" className="mt-3 px-5 py-2 bg-orange-500 hover:bg-orange-700 text-orange-50 rounded-lg">Upload</button>
        </form>
        }
        {
          // !imgUrl &&
          // <div className="outerbar">
          //   <div className="innerbar" style={{ width: `${progresspercent}%` }}>
          //     {progresspercent}%
          //   </div>
          // </div>
        }
        {
          imgUrl &&
          <div className="flex flex-col justify-center items-center space-y-4">
            <img src={imgUrl} alt="uploaded file" height={200} className="h-52" />
            <button disabled={isCopied} onClick={copyUrl} className={`px-5 py-2  text-orange-50 rounded-lg ${isCopied ? 'bg-orange-300 italic' : 'bg-orange-500 hover:bg-orange-700'}`}>
              {isCopied ? 'Copied' : 'Copy URL'}
            </button>
          </div>
        }
      </main>
    </>
  )
}

export default App
