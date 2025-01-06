import React, { useState } from 'react';

function QrCodeGen() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState("");
  const generateQr = async () => {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch (error) {
      console.error('Error generating QR code', error)
    } finally {
      setLoading(false);
    }
  }
  const downloadQr = () => {
    fetch(img)
    .then((response)=>response.blob())
    .then((blob) =>{
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error) =>{
      console.error('Error downloading QR code', error);
    });
  }
  return (
    <div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img className='qr-code-img' src={img} alt="yoga" />}
      <div>
        <label htmlFor='dataInput' className='input-lable'>Data for QR Code</label>
        <input type='text' id='dataInput' value={qrData} className='input-label' placeholder='Enter data for QR Code' 
        onChange={(e) => setQrData(e.target.value)} />
        <label htmlFor='sizeInput' className='input-lable'>Image Size (e.g; 150)</label>
        <input type='text' id='sizeInput' value={qrSize} className='input-label' placeholder='Enter image size' 
        onChange={(e) => setQrSize(e.target.value)} />
        <button className='generate-btn' disabled={loading} onClick={generateQr}>Generate QR Code</button>
        <button className='download-btn' onClick={downloadQr}>Download QR Code</button>
      </div>
    </div>
  )
}

export default QrCodeGen;