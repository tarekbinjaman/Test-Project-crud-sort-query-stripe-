import React, { useContext, useState } from 'react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from './useAuth';

const Registraion = () => {
  const { userRegister, setUser, updateUser, googleSignin, user } = useAuth();
  const [passwordErrors, setPasswordErrors] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const googleClick = () => {
    googleSignin()
    .then((result) => {
      const user = result.user;
      setUser(user);
      const userData = {name: user.displayName, email: user.email, badge: "Bronze", subscription_status: null, userType: "regular" }
      fetch('https://assignment-12-server-red-eight.vercel.app/userList', {
        method: 'post',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify(userData)
      })
      .then(res => res.json())
      .then(data =>{
        // console.log(userData)
        // console.log(data)
      })
        toast.success("Google Registration successfull")
        navigate(location?.state ? location.state : "/");
      });
  };

  const onSubmit = (data) => {
    const { name, email, url, password } = data;
    const errors = [];

    // Password validation
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must have at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must have at least one lowercase letter.");
    }
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    }

    userRegister(email, password)
      .then(result => {
        const user = result.user;
        // console.log(user)
        setUser(user);
        updateUser(user, { displayName: name, photoURL: url });
        const userData = {name: name, email: email, badge: "Bronze", subscription_status: null, userType: "regular", photo: url, number_of_meal_added: 0 }
        fetch('https://assignment-12-server-red-eight.vercel.app/userList', {
          method: 'post',
          headers: {'content-type' : 'application/json'},
          body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data =>{
          // console.log(userData)
          // console.log(data)
        })
                toast.success("Registration successfull")
        
        navigate(location?.state ? location.state : "/");
      });
  };

  return (
    <div className="w-11/12 mx-auto flex flex-col items-center justify-center mt-14">
      <h2 className="text-2xl font-bold">Registration form</h2>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border-2 border-black mt-6">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              {...register('name', { required: 'Name is required' })}
              className="input input-bordered"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">PhotoUrl</span>
            </label>
            <input
              type="url"
              placeholder="www.photo.com"
              {...register('url', { required: 'Photo URL is required' })}
              className="input input-bordered"
            />
            {errors.url && <p className="text-red-500">{errors.url.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              {...register('email', { required: 'Email is required' })}
              className="input input-bordered"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              {...register('password', { required: 'Password is required' })}
              className="input input-bordered"
            />
            {passwordErrors.map((error, index) => (
              <p key={index} className="text-red-500">{error}</p>
            ))}
            <label className="label mt-2">
              <a href="#" className="label-text-alt link link-hover">
              <Link to={`/login`}>Already have an account? <span className='text-blue-600'>Login now!</span></Link>
              </a>
            </label>
          </div>

          <div className="form-control mt-6 flex justify-center">
            <button className="btn btn-primary">Register now</button>
          </div>
        </form>

        <div className="flex justify-center mb-4">
          <button onClick={googleClick} className="bg-blue-400 border-2 border-black text-white font-bold px-3 rounded-md">
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registraion;