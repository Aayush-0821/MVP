import React from "react";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-16 px-6 mt-auto">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h3 className="text-xl font-bold">MVP</h3>
                        <p className="text-gray-400 text-sm">Master encryption through interactive challenges.</p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <div className="space-y-2">
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                                Courses
                            </a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                                Pricing
                            </a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                                Gift MVP
                            </a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                                Help
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <div className="space-y-2">
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                                About us
                            </a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                                Careers
                            </a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                                Educators
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                            >
                                <img src={facebook} alt="Facebook" className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                            >
                                <img src={instagram} alt="Instagram" className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                            >
                                <img src={twitter} alt="Twitter" className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                            >
                                <img src={linkedin} alt="LinkedIn" className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <div className="flex flex-wrap gap-6">
                        <a href="#" className="hover:text-white transition-colors">
                            Terms of service
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            Privacy policy
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            California privacy
                        </a>
                    </div>
                    <div>© 2025 MVP Worldwide, Inc.</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
