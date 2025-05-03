import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CheckIn = () => {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setShowPaymentSuccess(true);
      // Store booking details in localStorage
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      bookings.push({
        id: Date.now().toString(),
        venueId,
        ...formData,
        status: 'confirmed',
        paymentDetails: {
          amount: 50000,
          transactionId: Math.random().toString(36).substring(7),
          status: 'success'
        }
      });
      localStorage.setItem('bookings', JSON.stringify(bookings));
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/');
        toast.success('Booking confirmed successfully!');
      }, 2000);
    }, 1500);
  };

  if (showPaymentSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-green-500 mb-4">Payment Successful</h2>
          <p>Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {step === 1 ? (
        <>
          <h1 className="text-3xl font-bold mb-8">Enter Your Details</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full border rounded-md p-2"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full border rounded-md p-2"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full border rounded-md p-2"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Date
              </label>
              <input
                type="date"
                name="date"
                required
                className="w-full border rounded-md p-2"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                name="guests"
                required
                className="w-full border rounded-md p-2"
                value={formData.guests}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600"
            >
              Proceed to Payment
            </button>
          </form>
        </>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Venue Booking</span>
              <span>₹50,000</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹9,000</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total Amount</span>
              <span>₹59,000</span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold mb-4">Select Payment Method</h3>
            <div className="space-y-2">
              <button
                onClick={handlePayment}
                className="w-full bg-gray-100 p-4 rounded-md text-left hover:bg-gray-200"
              >
                Credit / Debit Card
              </button>
              <button
                onClick={handlePayment}
                className="w-full bg-gray-100 p-4 rounded-md text-left hover:bg-gray-200"
              >
                UPI
              </button>
              <button
                onClick={handlePayment}
                className="w-full bg-gray-100 p-4 rounded-md text-left hover:bg-gray-200"
              >
                Net Banking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckIn;