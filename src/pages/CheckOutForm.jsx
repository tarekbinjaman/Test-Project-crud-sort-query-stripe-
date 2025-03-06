import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { use, useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Auth/useAuth';

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [clientsecret, setClientSecret] = useState('');
    const totalPrice = 12;
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth(); 

    useEffect(() => {
        if(totalPrice > 0)  {
            axiosSecure.post('/create-payment-intent', {price: totalPrice})
            .then(res => {
                console.log( 'Client secret',res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            }
            )
        }
    },[axiosSecure, totalPrice])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error) {
            console.log('error', error)
            setError(error.message)
        }
        else {
            console.log('Payment method', paymentMethod)
            setError('')
        }
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientsecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymus',
                        name: user?.displayName || 'anonymus'
                    }
                }
            }
        );

        if(confirmError) {
            console.log('ConfirmError', confirmError);
        }
        else {
            console.log('paymentIntent', paymentIntent)
            if(paymentIntent.status === 'succeeded') {
                console.log('Transection ID', paymentIntent.id);
                setTransactionId(paymentIntent.id)

                // saving payment data in the database

                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payments', payment);
                console.log('Payment saved', res.data);
                if(res.data?.insertedId) {
                    console.log('Hurray:', res.data?.insertedId)
                }
            }
        }

    }



    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientsecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );

};

export default CheckOutForm;