import React, { useRef, useState, useEffect } from "react";

const App = () => {
  const [currentRow, setCurrentRow] = useState(0);
  const [gameBoard, setGameBoard] = useState(Array(6).fill(null).map(() => Array(5).fill("")));
  const [gameStatus, setGameStatus] = useState("playing");
  const [targetWord, setTargetWord] = useState("");
  const [feedback, setFeedback] = useState(Array(6).fill(null).map(() => Array(7).fill(null)));
  const [showInstructions, setShowInstructions] = useState(false);

  const wordList = [
    "CRANE", "SLATE", "AUDIO", "ROAST", "TIGER", "PLANE", "HOUSE", "DREAM", 
    "LIGHT", "BEACH", "PARTY", "MONEY", "PLANT", "WORLD", "PHONE", "APPLE",
    "WATER", "CHAIR", "TABLE", "SMILE", "CLOUD", "HEART", "MAGIC", "OCEAN",
    "ROYAL", "BRAVE", "CLEAN", "DANCE", "FIELD", "GLASS", "HAPPY", "JUICE",
    "KNIFE", "LAUGH", "MOUSE", "NOISE", "QUIET", "RADIO", "STORM", "TRUST"
  ];

  const inputRefs = useRef(Array(6).fill(null).map(() => 
    Array(5).fill(null).map(() => React.createRef())
  ));

  useEffect(() => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWord(randomWord);
  }, []);

  const handleChange = (e, rowIndex, colIndex) => {
    if (gameStatus !== "playing" || rowIndex !== currentRow) return;

    let value = e.target.value.toUpperCase();
    
    if (!/^[A-Za-z]*$/.test(value)) return;
    
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newGameBoard = [...gameBoard];
    newGameBoard[rowIndex][colIndex] = value;
    setGameBoard(newGameBoard);

    if (value && colIndex < 4) {
      inputRefs.current[rowIndex][colIndex + 1].current.focus();
    }
  };
  const handleKeyDown = (e, rowIndex, colIndex) => {
    if (gameStatus !== "playing" || rowIndex !== currentRow) return;

    if (e.key === "Backspace") {
      e.preventDefault();
      const newGameBoard = [...gameBoard];
      
      if (newGameBoard[rowIndex][colIndex] === "" && colIndex > 0) {
        newGameBoard[rowIndex][colIndex - 1] = "";
        setGameBoard(newGameBoard);
        inputRefs.current[rowIndex][colIndex - 1].current.focus();
      } else {
        newGameBoard[rowIndex][colIndex] = "";
        setGameBoard(newGameBoard);
      }
    } else if (e.key === "Enter") {
      submitGuess();
    }
  };

  const submitGuess = () => {
    if (currentRow >= 6) return;
    
    const currentGuess = gameBoard[currentRow].join("");
    
    if (currentGuess.length !== 5) {
      alert("Please enter a 5-letter word!");
      return;
    }

    if (!wordList.includes(currentGuess) && !isValidWord(currentGuess)) {
      alert("Not a valid word!");
      return;
    }

    const newFeedback = [...feedback];
    const result = calculateFeedback(currentGuess, targetWord);
    
    newFeedback[currentRow] = result;
    setFeedback(newFeedback);

    if (currentGuess === targetWord) {
      setGameStatus("won");
      setTimeout(() => alert("Congratulations! You won! 🎉"), 100);
      return;
    }

    if (currentRow < 5) {
      setCurrentRow(currentRow + 1);
      setTimeout(() => {
        inputRefs.current[currentRow + 1][0].current.focus();
      }, 100);
    } else {
      setGameStatus("lost");
      setTimeout(() => alert(`Game Over! The word was: ${targetWord}`), 100);
    }
  };

  const isValidWord = (word) => {
    return wordList.includes(word);
  };

  const calculateFeedback = (guess, target) => {
    const result = Array(7).fill(0);
    const targetLetters = target.split("");
    const guessLetters = guess.split("");
    const used = Array(5).fill(false);
    
    let correctCount = 0;
    let wrongPositionCount = 0;

    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        correctCount++;
        used[i] = true;
        result[i + 2] = 2;
      }
    }

    for (let i = 0; i < 5; i++) {
      if (result[i + 2] !== 2) {
        for (let j = 0; j < 5; j++) {
          if (!used[j] && guessLetters[i] === targetLetters[j]) {
            wrongPositionCount++;
            used[j] = true;
            result[i + 2] = 1;
            break;
          }
        }
        if (result[i + 2] === 0) {
          result[i + 2] = 0;
        }
      }
    }

    result[0] = correctCount;
    result[1] = wrongPositionCount;
    
    return result;
  };

  const getCellStyle = (rowIndex, colIndex) => {
    if (feedback[rowIndex] && feedback[rowIndex][colIndex + 2] !== null) {
      const feedbackValue = feedback[rowIndex][colIndex + 2];
      if (feedbackValue === 2) {
        return { backgroundColor: "#4CAF50", borderColor: "#4CAF50", color: "white" };
      } else if (feedbackValue === 1) {
        return { backgroundColor: "#FF6F00", borderColor: "#FF6F00", color: "white" };
      } else {
        return { backgroundColor: "#666", borderColor: "#666", color: "white" };
      }
    }
    return {};
  };

  const resetGame = () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWord(randomWord);
    setCurrentRow(0);
    setGameBoard(Array(6).fill(null).map(() => Array(5).fill("")));
    setFeedback(Array(6).fill(null).map(() => Array(7).fill(null)));
    setGameStatus("playing");
    
    setTimeout(() => {
      inputRefs.current[0][0].current.focus();
    }, 100);
  };

  const getResponsiveStyles = () => {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    return {
      container: {
        padding: isMobile ? '10px' : '20px',
        maxWidth: '100vw',
        overflow: 'hidden'
      },
      title: {
        fontSize: '32px',
        textAlign: 'center',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '5px' : '10px'
      },
      buttonContainer: {
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: isMobile ? '10px' : '20px',
        padding: isMobile ? '0px' : '20px'
      },
      button: {
        padding: isMobile ? '12px 16px' : '10px 20px',
        fontSize: isMobile ? '14px' : '16px',
        minWidth: isMobile ? '140px' : 'auto',
        maxWidth: isMobile ? '250px' : 'auto'
      },
      gameBoard: {
        gap: isMobile ? '8px' : '10px',
        padding: isMobile ? '0 10px' : '0'
      },
      letterInput: {
        width: isMobile ? '40px' : '50px',
        height: isMobile ? '40px' : '50px',
        fontSize: isMobile ? '18px' : '22px'
      },
      feedbackCircle: {
        width: isMobile ? '30px' : '35px',
        height: isMobile ? '30px' : '35px',
        fontSize: isMobile ? '16px' : '20px'
      },
      instructions: {
        margin: isMobile ? '10px' : '20px auto',
        padding: isMobile ? '15px' : '20px',
        maxWidth: isMobile ? '95%' : '600px'
      },
      footer: {
        flexDirection: isMobile ? 'column' : 'row',
        fontSize: isMobile ? '12px' : '14px',
        gap: isMobile ? '5px' : '0',
        textAlign: 'center'
      }
    };
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = getResponsiveStyles();

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', padding: '10px 0px' }}>
        <h1 style={{ 
          display: 'flex', 
          alignItems: 'center', 
          ...styles.title
        }}>
          Welcome to Word Bee 
          <span className="bee-icon">🐝</span>
        </h1>
      </div>
      <hr style={{ borderColor: '#ffd900be'}} />

      <div style={{ 
        display: 'flex', 
        width: '100%', 
        justifyContent: 'center', 
        marginTop: '2rem', 
        ...styles.buttonContainer 
      }}>
        
        <button 
          onClick={resetGame}
          style={{...styles.button, backgroundColor: '#4CAF50'}}
        >
          New Game
        </button>
        <button 
          onClick={() => setShowInstructions(!showInstructions)}
          style={{...styles.button, backgroundColor: '#FF6F00'}}
        >
          How to Play?
        </button>
        <button 
          onClick={submitGuess} 
          disabled={currentRow >= 6 || gameStatus !== "playing"}
          style={{...styles.button, backgroundColor: '#4CAF50'}}
        >
          Submit Guess
        </button>
      </div>

      {showInstructions && (
        <div style={{ 
          backgroundColor: '#1a1a1a', 
          borderRadius: '10px',
          border: '1px solid #ffd900be',
          ...styles.instructions
        }}>
          <h3 style={{ color: '#ffd900be', marginBottom: '10px' }}>How to Play:</h3>
          <ul style={{ color: '#ffd900be', lineHeight: '1.5' }}>
            <li>Guess the 5-letter word in 6 tries</li>
            <li>Type letters and press Enter or click Submit Guess</li>
            <li>🟢 Green circle = correct letters in correct position</li>
            <li>🟠 Orange circle = correct letters in wrong position</li>
            <li>Numbers show how many of each type you got</li>
          </ul>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
        <header style={{ fontSize: windowWidth <= 768 ? '20px' : '26px', padding: '2px 10px' }}>Guess the Word!</header>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          marginTop: '2rem',
          ...styles.gameBoard
        }}>
          {gameBoard.map((row, rowIndex) => (
            <div key={rowIndex} className="container" style={{ 
              gap: windowWidth <= 768 ? '8px' : '10px',
              justifyContent: 'center'
            }}>
              {row.map((cell, colIndex) => (
                <input
                  key={colIndex}
                  type="text"
                  value={cell}
                  ref={inputRefs.current[rowIndex][colIndex]}
                  className="letter-input"
                  style={{
                    ...getCellStyle(rowIndex, colIndex),
                    ...styles.letterInput
                  }}
                  onChange={(e) => handleChange(e, rowIndex, colIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                  disabled={rowIndex !== currentRow || gameStatus !== "playing"}
                  maxLength="1"
                />
              ))}
              <div style={{ 
                borderRadius: '50%', 
                border: '1px solid #FF6F00', 
                color: '#FF6F00', 
                fontWeight: '600', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                ...styles.feedbackCircle
              }}>
                {feedback[rowIndex] ? feedback[rowIndex][1] : 0}
              </div>
              <div style={{ 
                borderRadius: '50%', 
                border: '1px solid #4CAF50', 
                color: '#4CAF50', 
                fontWeight: '600', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                ...styles.feedbackCircle
              }}>
                {feedback[rowIndex] ? feedback[rowIndex][0] : 0}
              </div>
            </div>
          ))}
        </div>
      </div>

      {gameStatus !== "playing" && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '20px',
          fontSize: windowWidth <= 768 ? '16px' : '18px',
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '0 20px'
        }}>
          {gameStatus === "won" ? (
            <span style={{ color: '#4CAF50' }}>🎉 You Won! 🎉</span>
          ) : (
            <span style={{ color: '#FF6F00' }}>
              Game Over! The word was: <span style={{ color: '#ffd900be' }}>{targetWord}</span>
            </span>
          )}
        </div>
      )}

      <hr style={{ borderColor: '#ffd900be', marginTop: '3rem'}} />
      <div style={{ 
        display: 'flex', 
        width: '100%', 
        justifyContent: 'center', 
        padding: '10px 20px',
        ...styles.footer
      }}>
        <p>Made with extreme hardwork and patience by{' '}
          <a href="https://github.com/deekshati" target="_blank" style={{ fontSize: windowWidth <= 768 ? '14px' : '18px' }}>
            DeekshaTiwari
          </a>{windowWidth <= 768 ? '' : ' & '}
          {windowWidth <= 768 && <br />}
          <a target="_blank" href="https://github.com/MrChepe09" style={{ fontSize: windowWidth <= 768 ? '14px' : '18px' }}>
            MrChepe09
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
