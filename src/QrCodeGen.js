import React, { useState } from 'react';

function QrCodeGen() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState("");
  const [checkData, setCheckData] = useState(false);
  const [checkSize, setCheckSize] = useState(false);
  const [err, setErr] = useState("");

  const generateQr = async () => {
    if (qrData === '') {
      setCheckData(true);
    }
    if(qrSize === ''){
      setCheckSize(true);
    }
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch (error) {
      console.error('Error generating QR code', error)
    } finally {
      setLoading(false);
      setErr('');
      if (qrData !== '') {
        setCheckData(false);
      }
      if(qrSize !== ''){
        setCheckSize(false); 
      }
    }
  }
  const downloadQr = () => {
    fetch(img) // Fetch the image from given URL
      .then((response) => response.blob()) // Convert the response to a blob (binery)
      .then((blob) => {
        const link = document.createElement("a"); // Create <a> tag element
        link.href = URL.createObjectURL(blob); // Create temporary URL for the blob
        link.download = "qrcode.png"; // Set the Download filename
        document.body.appendChild(link); // Append the <a> element to the body
        link.click(); // Simulate a click event to start a download
        document.body.removeChild(link); // Remove the <a> element after the download
      }).catch((error) => {
        console.error('Error downloading QR code', error)
        setErr("QR Not Generated");
      });
  }
  return (
    <div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
      <h2>{err}</h2>
      {loading && <p>Please wait...</p>}
      {img && <img className='qr-code-img' src={img} alt="QR code" />}
      <div>
        <label htmlFor='dataInput' className='input-lable'>Data for QR Code</label>
        <input type='text' id='dataInput' value={qrData} className='input-label' placeholder='Enter data for QR Code'
          onChange={(e) => setQrData(e.target.value)} />
        {checkData && <p>*Enter Data URL</p>}
        <label htmlFor='sizeInput' className='input-lable'>Image Size <span>(e.g; 150)</span></label>
        <input type='text' id='sizeInput' value={qrSize} className='input-label' placeholder='Enter image size'
          onChange={(e) => setQrSize(e.target.value)} />
        {checkSize && <p>*Enter QR Size</p>}
        <button className='generate-btn' disabled={loading} onClick={generateQr}>Generate QR Code</button>
        {img && <button className='download-btn' onClick={downloadQr}>Download QR Code</button>}
      </div>
    </div>
  )
}

export default QrCodeGen;