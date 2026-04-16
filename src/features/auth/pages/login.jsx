import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../hook/useAuth';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';



const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login submitted:', formData);
        await handleLogin(formData);
        navigate("/");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if(!loading && user) {
        return <Navigate to="/" />
    }   

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
                        Welcome Back
                    </h1>
                    <p className="text-zinc-400">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-[#31b8c6] focus:ring-[#31b8c6]/50" />
                            <span className="text-zinc-400">Remember me</span>
                        </label>
                        <a href="#" className="text-[#31b8c6] hover:text-[#40c7d5] font-medium transition-colors">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#31b8c6] to-[#1c7d8a] hover:from-[#40c7d5] hover:to-[#258c97] text-white font-semibold py-3.5 rounded-xl shadow-[0_0_20px_rgba(49,184,198,0.2)] hover:shadow-[0_0_25px_rgba(49,184,198,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
                    <p className="text-zinc-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-[#31b8c6] hover:text-[#40c7d5] font-semibold transition-colors">
                            Register now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
