import React from 'react';

const About = () => {
    return (
        <section id="about" className="relative py-20 bg-gradient-to-b from-black to-purple-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                        About Me
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Profile Image */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                            <div className="relative aspect-square rounded-lg overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600"></div>
                            </div>
                        </div>
                        
                        {/* Content */}
                        <div className="space-y-6 text-gray-200">
                            <p className="text-xl leading-relaxed">
                                Hi, I'm a computer engineer with a passion for technology and innovation. 
                                I like to build things and explore new ideas.
                            </p>
                            
                            {/* Skills */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-semibold text-pink-400">Skills</h3>
                                <div className="flex flex-wrap gap-3">
                                    {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS'].map((skill) => (
                                        <span key={skill} className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Background Elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black/50 to-black"></div>
                </div>
            </div>
        </section>
    );
};

export default About; 