import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { validateEmail, validatePassword, validateRequired } from "../../utils/validation";
import API from "../../services/api";

export default function Register() {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });
  
  const [errors, setErrors] = useState({});
  const [adminExists, setAdminExists] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data } = await API.get("/auth/check-admin");
        setAdminExists(data.exists);
      } catch (error) {
        console.error("Failed to check admin status");
      }
    };
    checkAdmin();
  }, []);

  const validate = () => {
    let tempErrors = {};
    
    const nameError = validateRequired(form.name, "Name");
    if (nameError) tempErrors.name = nameError;

    const emailError = validateEmail(form.email);
    if (emailError) tempErrors.email = emailError;

    const passwordError = validatePassword(form.password);
    if (passwordError) tempErrors.password = passwordError;

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await handleRegister(form);
      navigate("/login");
    } catch (err) {
      setErrors({ form: "Failed to register. Please try again." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Create Account</h2>
        
        {errors.form && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
            {errors.form}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              name="name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'}`}
              placeholder="Enter your full name" 
              value={form.name}
              onChange={handleChange} 
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              name="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'}`}
              placeholder="Enter your email" 
              value={form.email}
              onChange={handleChange} 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'}`}
              placeholder="Create a password" 
              value={form.password}
              onChange={handleChange} 
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select 
              name="role"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
              value={form.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin" disabled={adminExists}>
                Admin {adminExists ? "(Already Exists)" : ""}
              </option>
            </select>
          </div>

          <button className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg mt-2">
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition duration-200">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
