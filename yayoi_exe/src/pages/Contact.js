import React from "react";
import CodeFrameWindow from "../components/CodeFrameWindow";
import ContactForm from "../components/ContactForm";
import "../assets/styles/contact.css";

const Contact = () => {
    return (
        <div className="contact-page">
            <CodeFrameWindow title="Contact Terminal">
                <div className="contact-container">
                    <div className="contact-links">
                        <p className="terminal-command">Available Commands:</p>
                        <ul className="link-list">
                            <li>
                                <span className="link-command email">email:</span>
                                <span>t.shirakawa@kmd.keio.ac.jp</span>
                            </li>
                            <li>
                                <span className="link-command github">github:</span>
                                <a
                                    href="https://github.com/yayoi-exe"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link"
                                >
                                    https://github.com/yayoi-exe
                                </a>
                            </li>
                            <li>
                                <span className="link-command qiita">qiita:</span>
                                <a
                                    href="https://qiita.com/yayoi-exe"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link"
                                >
                                    https://qiita.com/yayoi-exe
                                </a>
                            </li>
                        </ul>
                    </div>
                    <ContactForm />
                </div>
            </CodeFrameWindow>
        </div>
    );
};

export default Contact;
