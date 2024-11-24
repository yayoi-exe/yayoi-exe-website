import React from "react";
import "../assets/styles/codeContent.css";

const IntroCodeContent = () => {
    return (
        <div className="code-content">
            <pre>
                <code>
                    <span className="comment"># Welcome to my portfolio!</span>
                    <br />
                    <span className="variable">name</span> = <span className="string">"</span><span className="string body">Taichi Shirakawa</span><span className="string">"</span>;
                    <br />
                    <span className="variable">role</span> = [<span className="string">"</span>
                    <span className="string body">Software Engineer</span><span className="string">"</span>, <span className="string">"</span>
                    <span className="string body">Master's Student</span><span className="string">"</span>];
                    <br />
                    <span className="variable">skills</span> = [<span className="string">"</span>
                    <span className="string body">Python</span><span className="string">"</span>, <span className="string">"</span>
                    <span className="string body">React.js</span><span className="string">"</span>, <span className="string">"</span>
                    <span className="string body">C#</span><span className="string">"</span>, <span className="string">"</span>
                    <span className="string body">Unity</span><span className="string">"</span>];
                    <br />
                    <br />
                    <span className="function">print</span>(<span className="string">"</span><span className="string body">Let's build something amazing together!</span><span className="string">"</span>);
                </code>
            </pre>
        </div >
    );
};

export default IntroCodeContent;