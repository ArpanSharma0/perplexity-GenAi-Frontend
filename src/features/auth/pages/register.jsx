import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../hook/useAuth';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const { handleRegister } = useAuth();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleRegister(formData);
            setSuccessMessage("Registration successful! Please check your email to verify your account before logging in.");
            setFormData({ username: '', email: '', password: '' });
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4 relative overflow-hidden">
            {/* Top Navigation */}
            <nav className="absolute top-0 left-0 right-0 z-50 flex justify-center p-6">
                <div className="flex bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-full p-1.5 shadow-xl">
                    <NavLink 
                        to="/login" 
                        className={({ isActive }) => 
                            `px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'bg-[#31b8c6] text-black shadow-[0_0_15px_rgba(49,184,198,0.4)]' : 'text-zinc-400 hover:text-white'}`
                        }
                    >
                        Login
                    </NavLink>
                    <NavLink 
                        to="/register" 
                        className={({ isActive }) => 
                            `px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'bg-[#31b8c6] text-black shadow-[0_0_15px_rgba(49,184,198,0.4)]' : 'text-zinc-400 hover:text-white'}`
                        }
                    >
                        Register
                    </NavLink>
                </div>
            </nav>

            {/* Background Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#31b8c6]/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#31b8c6]/5 blur-[120px] rounded-full"></div>

            <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl shadow-2xl relative z-10">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-[#31b8c6] to-[#1c7d8a] bg-clip-text text-transparent">
                        Create Account
                    </h1>
                    <p className="text-zinc-400">Join our premium community today</p>
                </div>

                {successMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-[#31b8c6]/10 border border-[#31b8c6]/20 text-[#31b8c6] text-sm text-center">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2 px-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="johndoe"
                            className="w-full bg-zinc-900/80 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#31b8c6]/50 focus:border-[#31b8c6]/50 transition-all duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2 px-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            className="w-full bg-zinc-900/80 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#31b8c6]/50 focus:border-[#31b8c6]/50 transition-all duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2 px-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full bg-zinc-900/80 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#31b8c6]/50 focus:border-[#31b8c6]/50 transition-all duration-200"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-zinc-400 px-1">
                        <input type="checkbox" className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-[#31b8c6] focus:ring-[#31b8c6]/50" required />
                        <span>I agree to the <a href="#" className="text-[#31b8c6] hover:underline">Terms</a> and <a href="#" className="text-[#31b8c6] hover:underline">Privacy Policy</a></span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#31b8c6] to-[#1c7d8a] hover:from-[#40c7d5] hover:to-[#258c97] text-white font-semibold py-3.5 rounded-xl shadow-[0_0_20px_rgba(49,184,198,0.2)] hover:shadow-[0_0_25px_rgba(49,184,198,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
                    <p className="text-zinc-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#31b8c6] hover:text-[#40c7d5] font-semibold transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;