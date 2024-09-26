import React, { useState, useEffect, useRef } from 'react';
import './RuningCode.scss';

const codeLines = [
    "<span class='keyword'>async function</span> <span class='function-name'>fetchData</span>() {",
    "  <span class='keyword'>try</span> {",
    "    <span class='keyword'>const</span> <span class='parameter'>response</span> = <span class='keyword'>await</span> <span class='function'>fetch</span>(<span class='string'>'https://api.example.com/data'</span>);",
    "    <span class='keyword'>const</span> <span class='parameter'>data</span> = <span class='keyword'>await</span> <span class='parameter'>response</span>.<span class='property'>json</span>();",
    "    <span class='function'>console</span>.<span class='method'>log</span>(<span class='parameter'>data</span>);",
    "  } <span class='keyword'>catch</span> (<span class='parameter'>error</span>) {",
    "    <span class='function'>console</span>.<span class='method'>error</span>(<span class='parameter'>error</span>);",
    "  }",
    "}",
    "",
    "<span class='function-name'>fetchData</span>();"
];

const RuningCode = () => {
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const codeRef = useRef(null);
    const displayedCode = useRef('');

    useEffect(() => {
        let currentLine = codeLines[lineIndex];

        if (lineIndex < codeLines.length) {
            if (charIndex <= currentLine.length) {
                const timeout = setTimeout(() => {
                    const newChar = currentLine[charIndex];
                    displayedCode.current += newChar;

                    // עדכון ה-innerHTML של אלמנט ה-code ישירות
                    if (codeRef.current) {
                        codeRef.current.innerHTML = displayedCode.current + '<span class="cursor"></span>';
                    }

                    setCharIndex(charIndex + 1);
                }, 35); // מהירות הקלדה

                return () => clearTimeout(timeout);
            } else {
                setCharIndex(0);
                setLineIndex(lineIndex + 1);
                displayedCode.current += '<br/>';
            }
        } else {
            
            const timeout = setTimeout(() => {
              displayedCode.current = '';
              setLineIndex(0);
              setCharIndex(0);
              if (codeRef.current) {
                codeRef.current.innerHTML = '';
              }
            }, 5000); // זמן המתנה לפני התחלה מחדש
      
            return () => clearTimeout(timeout);
            
        }
    }, [charIndex, lineIndex]);

    return (
        <pre className="code-typing-animation">
            <code ref={codeRef}></code>
        </pre>
    );
};

export default RuningCode;
