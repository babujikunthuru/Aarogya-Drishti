import { Router } from 'express';
import {
  get11MandalsHospitals,
  createHospital,
  createDoctor,
  getAllDoctors,
  updateDoctor,
  getPrescriptionsAudit,
  createAshaWorker,
  getAllAshaWorkers,
  updateAshaWorker,
  deleteAshaWorker
} from '../controllers/admin.controller.js';

const router = Router();

router.get('/11-mandals-hospitals', get11MandalsHospitals);
router.get('/hospitals', get11MandalsHospitals);
router.post('/hospitals', createHospital);
router.get('/prescriptions-audit', getPrescriptionsAudit);
router.post('/doctors/create', createDoctor);
router.get('/doctors', getAllDoctors);
router.put('/doctors/:uidn', updateDoctor);

// ASHA Worker Administration
router.post('/asha-workers/create', createAshaWorker);
router.post('/asha-workers', createAshaWorker);
router.get('/asha-workers', getAllAshaWorkers);
router.put('/asha-workers/:uidn', updateAshaWorker);
router.delete('/asha-workers/:uidn', deleteAshaWorker);

export default router;

