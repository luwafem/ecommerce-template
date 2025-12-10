// netlify/functions/verify-payment.js

const fetch = require('node-fetch');

// IMPORTANT: Set your Paystack SECRET KEY as an environment variable in Netlify
// Key name: PAYSTACK_SECRET_KEY (Value: sk_live_...)
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const API_URL = 'https://api.paystack.co/transaction/verify/';

exports.handler = async (event, context) => {
    // 1. Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    try {
        const { reference, amount } = JSON.parse(event.body);

        if (!reference || !amount) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing reference or amount.' }),
            };
        }
        
        // 2. Query Paystack API securely using the reference
        const response = await fetch(`${API_URL}${reference}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const paystackData = await response.json();
        
        // Check if Paystack API call failed
        if (!paystackData.status) {
             return {
                statusCode: 500,
                body: JSON.stringify({ success: false, message: 'Paystack verification failed.' }),
            };
        }

        const data = paystackData.data;

        // 3. CRITICAL SECURITY CHECK: Verify status and amount
        const isSuccessful = data.status === 'success';
        
        // Paystack amount is in kobo, your passed amount is in NGN.
        // Convert your expected NGN amount to kobo for comparison.
        const expectedAmountInKobo = Math.round(parseFloat(amount) * 100); 

        // Check if the verified amount matches the expected amount
        const isAmountMatch = data.amount === expectedAmountInKobo; 

        if (isSuccessful && isAmountMatch) {
            // SUCCESS: Payment is verified and amount is correct.
            console.log(`Transaction ${reference} verified successfully.`);
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, message: 'Payment verified successfully.' }),
            };
        } else {
            // FAILURE: Either status is not 'success' or amount doesn't match
            console.error(`Verification Failed for ${reference}. Status: ${data.status}, Expected: ${expectedAmountInKobo}, Received: ${data.amount}`);
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: 'Payment verification mismatch or failure.' }),
            };
        }

    } catch (error) {
        console.error('Server error during verification:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: `Server error: ${error.message}` }),
        };
    }
};