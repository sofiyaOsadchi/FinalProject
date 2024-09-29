import React, { useState, useEffect } from 'react';
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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const typingSpeed = 50; // מהירות ההקלדה בין תווים
    const linePause = 5 ; // פאוזה בין שורות

    const currentLine = currentIndex < codeLines.length ? codeLines[currentIndex] : '';

    useEffect(() => {
        if (currentIndex < codeLines.length) {
            const timeout = setTimeout(() => {
                if (displayedText.length < currentLine.length) {
                    setDisplayedText(currentLine.slice(0, displayedText.length + 1));
                } else {
                    setTimeout(() => { // פאוזה בין שורות
                        setCurrentIndex(currentIndex + 1);
                        setDisplayedText('');
                    }, linePause);
                }
            }, typingSpeed);

            return () => clearTimeout(timeout);
        } else {
            // לולאה – הפעלה מחדש לאחר סיום ההקלדה של כל הקווים
            const resetTimeout = setTimeout(() => {
                setCurrentIndex(0);
                setDisplayedText('');
            }, 2000); // זמן הפסקה בין לופים

            return () => clearTimeout(resetTimeout);
        }
    }, [currentIndex, displayedText, currentLine, typingSpeed, linePause]);

    return (
        <div className="code-container">
            {codeLines.slice(0, currentIndex).map((line, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
            ))}
            <div dangerouslySetInnerHTML={{ __html: displayedText }} />
        </div>
    );
};

export default RuningCode;