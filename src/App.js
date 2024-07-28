import React, { useState } from 'react';
import axios from 'axios';
import Voices from './Voices';
import Spinner from './spinner';
import './App.css';

const App = () => {
  const [selectedOption, setSelectedOption] = useState('text');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [uri, setUri] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/plain') {
      setFile(selectedFile);
      setErrorMessage('');
    } else {
      setFile(null);
      setErrorMessage('Unsupported file type. Please upload a text file.');
    }
  };
  const handleReset = () =>{
    setText('');
    setFile(null);
    setErrorMessage('');
    setMessage('');
    setUri('');
    setLoading(false);
    setSelectedOption('text');
  }
  const handleSubmit = async () => {
    if (selectedOption === 'text' && text) {
      setLoading(true);
      try {
        const response = await axios.post('http://127.0.0.1:5000/upload', {text}, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setMessage(response.data.message);
        setUri(response.data.uri);
        setLoading(false);
      }
      catch (error) {
        setMessage(error || "Some Error occured");
        setLoading(false);
      }

    } else if (selectedOption === 'file' && file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage(response.data.message);
        setUri(response.data.uri);
        setLoading(false);
      }
      catch (error) {
        setMessage(error || "Some error occured");
        setLoading(false);
      }
    }
  }


  return (


    <div className="app-container">
      <h1>Text to Speech</h1>
      <div className="button-group">
        <button onClick={() => setSelectedOption('text')} className={selectedOption === 'text' ? 'active' : ''}>Text</button>
        <button onClick={() => setSelectedOption('file')} className={selectedOption === 'file' ? 'active' : ''}>Files</button>
        <Voices/>
      </div>
      <div className="input-group">
        {selectedOption === 'text' ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            className="text-input"
          />
        ) : (
          <div>
            <input type="file" accept=".txt" onChange={handleFileChange} />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        )}
      </div>
     
      <button className="convert-button" onClick={handleSubmit}>Convert</button>
      <button className="reset-button" onClick={handleReset}>Reset</button>
      {loading && <Spinner />}
      {message && <p>{message}</p>}
      {uri && <p>Download your file <a target="_blank" rel="noreferrer" href={uri}>here</a>.</p>}
    </div>
  );
};

export default App;
