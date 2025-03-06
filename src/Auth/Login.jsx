import React, { useContext, useState } from 'react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from './useAuth';

const Login = () => {
  const { userLogin, setUser, googleSignin } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const googleClick = () => {
    googleSignin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        if(user?.email) {
          toast.success("Login successfull")
          navigate(location?.state ? location.state : "/");
        }
      });
  };

  const onSubmit = (data) => {
    const { email, password } = data;
    userLogin(email, password)
      .then(result => {
        const user = result.user;
        setUser(user);
        toast.success("Login successfull")
        navigate(location?.state ? location.state : "/");
      })
      .catch(err => {
        setError(err.code);
      });
  };

  return (
    <div className="w-11/12 mx-auto flex flex-col items-center justify-center mt-24">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 pt-8 shadow-2xl border-2 border-black mt-6">
      <h2 className="text-2xl text-center font-bold">Login form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            <label className="label mt-2">
              <a href="#" className="label-text-alt link link-hover">
              <Link to={`/registration`}> Don't have an account <span className='text-blue-600'>Register now!</span></Link>
              </a>
            </label>
          </div>

          {error && <p className="text-red-400 text-center">{error}</p>}

          <div className="form-control mt-6 flex justify-center">
            <button className="btn btn-soft btn-primary">Login</button>
          </div>
        </form>

        <div className="flex justify-center mb-4">
          <button onClick={googleClick} className="bg-blue-400 text-white font-bold px-3 rounded-md">
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;