import React, { useState } from "react";
import "../assets/styles/contactForm.css";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [responseMessage, setResponseMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));
        setResponseMessage("Message sent successfully!");
        setIsSubmitting(false);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="terminal-container">
            <div style={{ color: "red", fontSize: "150%" }}>It is not working</div>
            <div className="terminal-header">
                <div className="window-buttons">
                    <span className="red"></span>
                    <span className="yellow"></span>
                    <span className="green"></span>
                </div>
                <span className="terminal-title">Contact Terminal</span>
            </div>
            <div className="terminal-body">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your email"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your message"
                            rows="3"
                            required
                        />
                    </div>
                    {responseMessage && (
                        <p className="response-message">{responseMessage}</p>
                    )}
                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send"}
                    </button>
                </form>
            </div>
        </div >
    );
};

export default ContactForm;