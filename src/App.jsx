import React, { useRef, useState } from "react";
import BeeIcon from "./assets/bee.png";


const App = () => {
  const [inputs, setInputs] = useState(["", "", "", "", ""]);

  // Refs for each input element
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  // Handle input change
  const handleChange = (e, index) => {
    let value = e.target.value;
    console.log('abc', value);
    // If the input already has a letter, replace it with the new value
    if (value.length > 1) {
      value = value.slice(1, 2); // Restrict to only one character
    }

    const newInputs = [...inputs];
    newInputs[index] = value;

    // Update the state with the new values
    setInputs(newInputs);

    // If a letter is typed, move focus to the next input
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };
  return (
    <div>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', padding: '10px 0px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center' }}>Welcome to Word Bee <img width={40} height={40} src={BeeIcon} alt="bee icon" /></h1>
      </div>
      <hr style={{ borderColor: '#ffd900be'}} />


      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '3rem' }}>
        <a>How to Play?</a> 
        <header>Guess</header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '2rem' }}>
          <div class="container">
            {inputs.map((input, index) => (
              <input
                key={index}
                type="text"
                value={input}
                ref={inputRefs[index]}
                className="letter-input"
                onChange={(e) => handleChange(e, index)}
              />
            ))}
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #FF6F00', color: '#FF6F00', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>0</div>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #4CAF50', color: '#4CAF50', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>0</div>
          </div>
          <div class="container">
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #FF6F00', color: '#FF6F00', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>0</div>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #4CAF50', color: '#4CAF50', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>0</div>
          </div>  
          <div class="container">
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #FF6F00', color: '#FF6F00', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>0</div>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #4CAF50', color: '#4CAF50', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>0</div>
          </div>  
          <div class="container">
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #FF6F00', color: '#FF6F00', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>0</div>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #4CAF50', color: '#4CAF50', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>0</div>
          </div>  
          <div class="container">
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #FF6F00', color: '#FF6F00', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>0</div>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #4CAF50', color: '#4CAF50', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>0</div>
          </div>  
          <div class="container">
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #FF6F00', color: '#FF6F00', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>0</div>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #4CAF50', color: '#4CAF50', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>0</div>
          </div>  
          <div class="container">
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <input type="text" class="letter-input" maxlength="1" />
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #FF6F00', color: '#FF6F00', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>0</div>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #4CAF50', color: '#4CAF50', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>0</div>
          </div>  
        </div>
        
       
      </div>
      <hr style={{ borderColor: '#ffd900be', marginTop: '3rem'}} />
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', padding: '10px 0px', fontSize: '14px' }}>
         <p>Made with extreme hardwork and patience by <a href="https://github.com/deekshati" target="_blank" style={{ fontSize: '18px' }}>DeekshaTiwari</a> & <a target="_blank" href="https://github.com/MrChepe09" style={{ fontSize: '18px' }}>MrChepe09</a></p>
        </div>
    </div>
  )
}

export default App;