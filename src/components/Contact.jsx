import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="relative py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                    Get In Touch
                </h2>
                
                <div className="relative max-w-2xl mx-auto">
                    {/* Form Background Gradient */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25"></div>
                    
                    {/* Form Content */}
                    <form className="relative space-y-6 p-8 bg-black/40 backdrop-blur-xl rounded-lg">
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium text-gray-200 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                                placeholder="Your Name"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-200 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                                placeholder="your.email@example.com"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="message" className="block text-lg font-medium text-gray-200 mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                required
                                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                                placeholder="Your Message"
                            ></textarea>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black/50 to-black"></div>
            </div>
        </section>
    );
};

export default Contact; 