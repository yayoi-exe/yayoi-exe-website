import React, { useState } from 'react';
import '../assets/styles/contactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [responseMessage, setResponseMessage] = useState('');
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
        setResponseMessage('');

        try {
            // TODO: 実送信用のエンドポイント（EmailJS / Formspree / 自前API 等）に差し替える。
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setResponseMessage('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setResponseMessage('Failed to send. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="warning">It is not working</div>
            <div>
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
                    <p className="response-message" role="status" aria-live="polite">
                        {responseMessage}
                    </p>
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
