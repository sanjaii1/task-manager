import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { validateEmail, validatePassword } from "../../utils/validation";

export default function Login() {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});


  const validate = () => {
    let tempErrors = {};
    const emailError = validateEmail(email);
    if (emailError) tempErrors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) tempErrors.password = passwordError;

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await handleLogin(email, password);
      navigate("/");
    } catch (err) {
      setErrors({ form: "Failed to login. Please check your credentials." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back</h2>
        {errors.form && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
            {errors.form}
          </div>
        )}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'}`}
              placeholder="Enter your email" 
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value);
                if (errors.email) setErrors({...errors, email: null});
              }} 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'}`}
              placeholder="Enter your password" 
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value);
                if (errors.password) setErrors({...errors, password: null});
              }} 
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <button className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg">
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition duration-200">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
