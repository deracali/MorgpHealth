import WebSocket from 'ws';

let doctorWSS;

export const initializeWebSocket = (server) => {
  // Correctly access the Server class from the default import
  doctorWSS = new WebSocket.Server({ server });

  doctorWSS.on('connection', (ws) => {
    console.log('WebSocket connected for doctor updates.');

    ws.on('close', () => console.log('WebSocket disconnected.'));
  });
};

export const broadcastDoctorUpdate = (data) => {
  if (doctorWSS) {
    doctorWSS.clients.forEach((client) => {
      // Check if the client is open before sending data
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
};
