import React, { useState } from 'react';
import { Button } from './Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-stone-200 dark:from-slate-800 dark:via-gray-900 dark:to-stone-900 text-gray-800 dark:text-gray-200 py-6 sm:py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400">
            Contact Us
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Get in touch with our team for support, feedback, or collaboration opportunities.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
              Send us a Message
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 rounded-md">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-md">
                There was an error sending your message. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <option value="">Select a subject</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="bug-report">Bug Report</option>
                  <option value="feature-request">Feature Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Support Hours
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday: 10:00 AM - 4:00 PM EST<br />
                  Sunday: Closed
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Response Time
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We typically respond to inquiries within 24 hours during business days.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Common Topics
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Technical support and troubleshooting</li>
                  <li>• Feature requests and suggestions</li>
                  <li>• API integration assistance</li>
                  <li>• Pricing and subscription questions</li>
                  <li>• Partnership and collaboration opportunities</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                <h4 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-300">
                  Need Immediate Help?
                </h4>
                <p className="text-purple-600 dark:text-purple-400 mb-3">
                  Check our documentation or FAQ section for quick answers to common questions.
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 