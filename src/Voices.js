import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Voices({Voice_choice}){
    let sel_voice;
    const [voices, setVoices] = useState({ Male: [], Female: [] });
    const [error, setError] = useState('');


    useEffect(() => {
    const fetchVoices = async () =>{
        try{
            const response = await axios.get('http://127.0.0.1:5000/voices')
            setVoices(response.data)
        }
        catch (error){
            setError("Error fetching voices");
        }

    };
    fetchVoices();
}, []);


const handleVoiceChange = (event) => {
    Voice_choice(event.target.value);
    sel_voice = event.target.value;
  };


if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
        Availale voices
        <select value={sel_voice} onChange={handleVoiceChange}>
        <option value="" disabled>Select a Male voice</option>
        {voices.Male.map((voice, index) => (
          <option key={index} value={voice}>{voice}</option>
        ))}
         <option value="" disabled>Select a female voice</option>
         {voices.Female.map((voice, index) => (
          <option key={index} value={voice}>{voice}</option>
        ))}

      </select> 

    </div>


  )
}

export default Voices