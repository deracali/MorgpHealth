import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function VideoCall() {
    const { appointmentId } = useParams();
    const [meetingStart, setMeetingStart] = useState(null);
    const [meetingEnd, setMeetingEnd] = useState(null);
    const [meetingDuration, setMeetingDuration] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure you have the backend URL

    useEffect(() => {
        const loadJitsiScript = () => {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = "https://meet.jit.si/external_api.js";
                script.async = true;
                script.onload = resolve;
                document.body.appendChild(script);
            });
        };

        loadJitsiScript().then(() => {
            if (typeof window.JitsiMeetExternalAPI !== 'undefined') {
                const domain = "meet.jit.si";
                const options = {
                    roomName: `Appointment_${appointmentId}`,
                    parentNode: document.getElementById("jitsi-container"),
                    width: "100%",
                    height: "100%",
                };
                const api = new window.JitsiMeetExternalAPI(domain, options);

                api.addListener("participantJoined", () => {
                    if (!meetingStart) {
                        setMeetingStart(new Date());
                    }
                });

                api.addListener("participantLeft", () => {
                    const participants = api.getParticipantsInfo();
                    if (participants.length === 0 && meetingStart) {
                        const end = new Date();
                        setMeetingEnd(end);
                        const duration = Math.round((end - meetingStart) / 1000);  // Duration in seconds
                        setMeetingDuration(duration);
                        updateAppointmentDuration(duration);
                    }
                });

                return () => {
                    api.dispose();
                };
            } else {
                console.error("Jitsi Meet API script not loaded.");
            }
        });
    }, [appointmentId, meetingStart]);

    const updateAppointmentDuration = async (duration) => {
        try {
            const response = await axios.put(`${backendUrl}/update-appointment/${appointmentId}`, {
                meetingDuration: duration,
            });
            console.log('Appointment updated:', response.data);
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white w-full max-w-4xl h-[80vh] p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Video Call for Appointment {appointmentId}
                </h2>
                
                {/* Video call container */}
                <div id="jitsi-container" className="w-full h-full"></div>

                {meetingDuration !== null && (
                    <p className="text-center text-lg mt-4">
                        Meeting Duration: {meetingDuration} seconds
                    </p>
                )}
            </div>
        </div>
    );
}
