import { Router } from 'express';
import {
  getPatientHistopathology,
  updatePatientHistopathology,
  getAllHistopathology
} from '../controllers/histopathology.controller.js';

const router = Router();

router.get('/', getAllHistopathology);
router.get('/:patientUidn', getPatientHistopathology);
router.put('/:patientUidn', updatePatientHistopathology);

export default router;
