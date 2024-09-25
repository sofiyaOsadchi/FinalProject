import React, { useState, useEffect } from 'react';
import './RuningCode.scss';


const codeLines = [
    "function greet() {",
    "  console.log('Hello, World!');",
    "}",
    "",
    "greet();"
];

const RuningCode = () => {
    const [displayedCode, setDisplayedCode] = useState('');
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        if (lineIndex < codeLines.length) {
            if (charIndex <= codeLines[lineIndex].length) {
                const timeout = setTimeout(() => {
                    setDisplayedCode(prev => prev + codeLines[lineIndex][charIndex] || '\n');
                    setCharIndex(charIndex + 1);
                }, 80); // מהירות ההקלדה
                return () => clearTimeout(timeout);
            } else {
                setCharIndex(0);
                setLineIndex(lineIndex + 1);
                setDisplayedCode(prev => prev + '\n');
            }
        } else {
            // לאחר סיום ההקלדה, להתחיל לגלול
            const timeout = setTimeout(() => {
                setDisplayedCode('');
                setLineIndex(0);
                setCharIndex(0);
            }, 3000); // זמן המתנה לפני התחלה מחדש
            return () => clearTimeout(timeout);
        }
    }, [charIndex, lineIndex]);

    return (
        <pre className="code-typing-animation">
            <code>{displayedCode}</code>
        </pre>
    );
};

export default RuningCode;
