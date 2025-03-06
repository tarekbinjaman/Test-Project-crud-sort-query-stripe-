import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../Auth/useAuth';

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {user} = useAuth();
    const onsubmit = (data) => {
        const xData = {
            ...data,
            email: user?.email,
            status: 'Bronze'
        }
        console.log(xData)
    }
    return (
        <div>
            <h1>This is form</h1>
            <form onSubmit={handleSubmit(onsubmit)}>
                <input
                    {...register("name", { required: "Name (-_-) is required" })}
                    className='border p-2 w-full'
                    placeholder='Enter your name'
                />
                {errors.name && <p className='text-rose-500'>{errors.name.message}</p>}
                <input {...register('lastName', { required: true })} />
                {errors.lastName && <p>Last name is required.</p>}
                <input type="submit" className='border p-2 w-full' />
            </form>
        </div>
    );
};

export default Form;