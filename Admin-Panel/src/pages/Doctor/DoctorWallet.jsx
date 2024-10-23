import React, { useEffect, useState } from 'react';
import '../../styles/doctorWallet.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'; // Import format from date-fns

const Wallet = () => {
    const [profileData, setProfileData] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const { id } = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/profile/${id}`);
            if (data.success) {
                setProfileData(data.profileData);
            } else {
                // Handle the error as needed
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/appointments/${id}`);
            if (data.success) {
                setAppointments(data.appointments); // No need to reverse here
            } else {
                // Handle the error as needed
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);

    useEffect(() => {
        getAppointments(); 
    }, []); 

    const navigate = useNavigate();
    return (
        <div className="container-box">
            <header className="header">
                <h1>My Wallet</h1>
                <div className="balance">
                    <h2>Balance: $<span id="balance">{profileData.balance}</span></h2>
                </div>
            </header>

            <section className="transactions">
                <h2>Recent Transactions</h2>
                <ul>
                    {appointments.map((item, index) => {
                        const dateValue = new Date(item.createdAt);
                        const formattedDate = isNaN(dateValue.getTime())
                            ? 'Invalid date' 
                            : format(dateValue, 'yyyy-MM-dd HH:mm:ss');

                        // Calculate 35% of the amount and subtract from the original amount
                        const discountedAmount = (item.amount - (item.amount * 0.35)).toFixed(2); // Assuming item.amount contains the original amount

                        return (
                            <li key={index}>
                                <span className="date">{formattedDate}</span>
                                <span className="description">Payment Received</span>
                                <span className="amount green">+$ {discountedAmount}</span>
                            </li>
                        );
                    })}
                </ul>
            </section>

            <footer className="footer">
                <button onClick={() => navigate(`/withdrawal/${id}`)} className="button">Withdraw</button>
            </footer>
        </div>
    );
};

export default Wallet;
