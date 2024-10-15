import React from 'react';
import '../../styles/withdrawal.css'; // Ensure this file has the relevant styles
import CardImg from '../../assets/card_img.png'


const Withdrawal = () => {
    return (
        <div className="container">
            <form action="">
                <div className="row">
                    {/* Billing Address Section */}
                    <div className="col">
                        <h3 className="title">Billing Address</h3>

                        <div className="inputBox">
                            <span>Full Name:</span>
                            <input type="text" placeholder="John Deo" />
                        </div>

                        <div className="inputBox">
                            <span>Email:</span>
                            <input type="email" placeholder="example@example.com" />
                        </div>

                        <div className="inputBox">
                            <span>Address:</span>
                            <input type="text" placeholder="Room - Street - Locality" />
                        </div>

                        <div className="inputBox">
                            <span>City:</span>
                            <input type="text" placeholder="Mumbai" />
                        </div>

                        <div className="flex">
                            <div className="inputBox">
                                <span>State:</span>
                                <input type="text" placeholder="India" />
                            </div>

                            <div className="inputBox">
                                <span>Zip Code:</span>
                                <input type="text" placeholder="123 456" />
                            </div>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="col">
                        <h3 className="title">Payment</h3>

                        <div className="inputBox">
                            <span>Cards Accepted:</span>
                            <img src={CardImg} alt="Accepted Cards" />
                        </div>

                        <div className="inputBox">
                            <span>Bank Name:</span>
                            <input type="text" placeholder="Mr. John Deo" />
                        </div>

                        <div className="inputBox">
                            <span>Account Number:</span>
                            <input type="number" placeholder="1111-2222-3333-4444" />
                        </div>

                        <div className="inputBox">
                            <span>Exp Month:</span>
                            <input type="text" placeholder="January" />
                        </div>

                        <div className="flex">
                            <div className="inputBox">
                                <span>Exp Year:</span>
                                <input type="number" placeholder="2022" />
                            </div>

                            <div className="inputBox">
                                <span>CVV:</span>
                                <input type="text" placeholder="1234" />
                            </div>
                        </div>
                    </div>
                </div>

                <input type="submit" value="Proceed to Checkout" className="submit-btn" />
            </form>
        </div>
    );
};

export default Withdrawal;
