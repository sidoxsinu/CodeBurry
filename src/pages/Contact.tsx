import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, MapPinIcon, PhoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We\'ll get back to you soon. 🌱');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      detail: 'hello@codeburry.com',
      description: 'Send us an email and we\'ll respond within 24 hours'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Live Chat',
      detail: 'Available 9 AM - 6 PM EST',
      description: 'Chat with our support team for instant help'
    },
    {
      icon: MapPinIcon,
      title: 'Visit Us',
      detail: 'Kochi, Kerala, India',
      description: 'Our headquarters in the heart of tech innovation'
    },
    {
      icon: PhoneIcon,
      title: 'Call Us',
      detail: '+91 8848859106',
      description: 'Speak directly with our team'
    }
  ];

  const faqs = [
    {
      question: 'How does the gamification work?',
      answer: 'You earn water drops by completing lessons and challenges. Use these drops to water your virtual plant, which grows into a tree that gets planted in your garden!'
    },
    {
      question: 'Is CodeBurry free to use?',
      answer: 'Yes! CodeBurry offers a comprehensive free tier with access to all core learning materials and gamification features.'
    },
    {
      question: 'What programming languages can I learn?',
      answer: 'Currently, we offer courses in Python, Java, Web Development (HTML, CSS, JavaScript), and Data Structures & Algorithms.'
    },
    {
      question: 'Can I track my learning progress?',
      answer: 'Absolutely! Your dashboard shows detailed progress tracking, including lessons completed, water drops earned, and your position on the leaderboard.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Have questions about CodeBurry? Want to share feedback or need support? 
              We'd love to hear from you! Our community is here to help you grow.
            </p>
            <div className="text-4xl">🌱💬🤝</div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-green-600 font-medium mb-2">{info.detail}</p>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Tell us more about your question or feedback..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                  >
                    Send Message 🚀
                  </button>
                </form>
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Links */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 mt-6 text-white text-center">
                <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
                <p className="text-green-100 mb-4">
                  Connect with fellow learners and stay updated with the latest features!
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors">
                    Discord
                  </a>
                  <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors">
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Response Promise */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Commitment to You</h3>
            <p className="text-gray-600">
              We typically respond to all inquiries within 24 hours. For urgent technical issues, 
              our support team aims to respond within 4 hours during business days.
            </p>
            <div className="text-2xl mt-4">⚡💚🌱</div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;