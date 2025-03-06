import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutForm from './CheckOutForm';

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_pK);
    return (
        <div>
            <h1 className='text-center mt-10 mb-10 text-2xl font-semibold'>This is a payment</h1>

            <Elements stripe={stripePromise}>
                <CheckOutForm></CheckOutForm>
            </Elements>

        </div>
    );
};

export default Payment;