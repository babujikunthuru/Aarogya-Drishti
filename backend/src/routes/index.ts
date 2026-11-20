import { Router } from 'express';
import authRoutes from './auth.routes.js';
import screeningRoutes from './screening.routes.js';
import appointmentRoutes from './appointment.routes.js';
import prescriptionRoutes from './prescription.routes.js';
import adminRoutes from './admin.routes.js';
import searchRoutes from './search.routes.js';
import uploadRoutes from './upload.routes.js';
import ttsRoutes from './tts.routes.js';
import aarohiRoutes from './aarohi.routes.js';
import histopathologyRoutes from './histopathology.routes.js';
import { getPatientHistory } from '../controllers/prescription.controller.js';
import { get11MandalsHospitals, createHospital } from '../controllers/admin.controller.js';
import { getPatientHistopathology, updatePatientHistopathology } from '../controllers/histopathology.controller.js';

const apiV1Router = Router();

apiV1Router.use('/auth', authRoutes);
apiV1Router.use('/screenings', screeningRoutes);
apiV1Router.use('/appointments', appointmentRoutes);
apiV1Router.use('/prescriptions', prescriptionRoutes);
apiV1Router.use('/admin', adminRoutes);
apiV1Router.use('/search', searchRoutes);
apiV1Router.use('/upload', uploadRoutes);
apiV1Router.use('/tts', ttsRoutes);
apiV1Router.use('/aarohi', aarohiRoutes);
apiV1Router.use('/histopathology', histopathologyRoutes);

// Direct top-level REST aliases as requested in specification
apiV1Router.get('/history/:patientId', getPatientHistory);
apiV1Router.get('/hospitals', get11MandalsHospitals);
apiV1Router.post('/hospitals', createHospital);
apiV1Router.get('/patients/:id/histopathology', getPatientHistopathology);
apiV1Router.put('/patients/:id/histopathology', updatePatientHistopathology);

export default apiV1Router;

