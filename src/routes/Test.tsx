import React, { useState, useEffect } from 'react';
import './RuningCode.scss';


const codeLines = [
    "<span class='keyword'>function</span> <span class='function-name'>fetchData</span>() {",
    "  <span class='keyword'>return</span> <span class='function'>fetch</span>(<span class='string'>'https://api.example.com/data'</span>)",
    "    .<span class='method'>then</span>(<span class='parameter'>response</span> => <span class='parameter'>response</span>.<span class='property'>json</span>())",
    "    .<span class='method'>then</span>(<span class='parameter'>data</span> => {",
    "      <span class='function'>console</span>.<span class='method'>log</span>(<span class='parameter'>data</span>);",
    "    });",
    "}",
    "",
    "<span class='function-name'>fetchData</span>();"
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
                }, 50); // מהירות ההקלדה
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
            <code dangerouslySetInnerHTML={{ __html: displayedCode }} />
            <span className="cursor">|</span>
        </pre>
    );
};

export default RuningCode;



// RuningCode.scss
/* .code - typing - animation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100 %;
    height: 100 %;
    padding: 20px;
    color: black;
    background - color: transparent;
    font - family: 'Source Code Pro', monospace;
    font - size: 16px;
    overflow: hidden;

    & code {
        white - space: pre - wrap;
        line - height: 1.5;
        display: block;
        position: relative;
        animation: scroll 20s linear infinite;
    }

    & .cursor {
        display: inline - block;
        width: 1px;
        background - color: black;
        animation: blink 1s step - end infinite;
        position: absolute;
    }

    // סגנונות עבור הדגשת התחביר
    .keyword {
        color: #569CD6;
    }

    .function-name {
        color: #DCDCAA;
    }

    .function {
        color: #C586C0;
    }

    .string {
        color: #CE9178;
    }

    .parameter {
        color: #9CDCFE;
    }

    .property {
        color: #4EC9B0;
    }

    .method {
        color: #DCDCAA;
    }
}

// אנימציית גלילה
@keyframes scroll {
    0 % {
        transform: translateY(0);
    }

    100 % {
        transform: translateY(-10 %);
    }
}

// אנימציית הבהוב הסמן
@keyframes blink {

    from,
        to {
        background - color: transparent;
    }

    50 % {
        background- color: black;
}
} */