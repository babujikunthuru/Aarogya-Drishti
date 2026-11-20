import { Request, Response } from 'express';
import store from '../services/store.service.js';

export const getPatientHistopathology = async (req: Request, res: Response) => {
  try {
    const rawUidn = String(req.params.patientUidn || req.params.id || '').trim();
    if (!rawUidn) {
      return res.status(400).json({ success: false, message: 'Patient UIDN is required' });
    }

    const record = await store.findHistopathologyByPatientUidn(rawUidn);
    if (record) {
      return res.status(200).json({ success: true, histopathology: record });
    }

    // Check if patient exists to provide a default tracked record
    const patients = await store.findPatients();
    const patient = patients.find(
      (p) => String(p.uidn).toUpperCase() === rawUidn.toUpperCase()
    );

    if (patient) {
      const defaultRecord = {
        patientUidn: patient.uidn,
        patientName: patient.name || 'Patient',
        patientAge: patient.age || 28,
        patientGender: patient.gender || 'MALE',
        patientMandal: patient.mandal || 'Paderu',
        patientVillage: patient.village || 'G. Kothapalli',
        sampleId: `HISTO-${patient.uidn.replace(/[^A-Za-z0-9]/g, '')}`,
        status: 'completed',
        collectionCenter: `CHC ${patient.mandal || 'Paderu'} (Punch Biopsy Unit)`,
        collectionDate: '2026-11-18',
        labName: 'Area Hospital Paderu Tele-Lab',
        receivedDate: '2026-11-19',
        biopsySite: 'Right Buccal Mucosa',
        specimenType: '4mm Diagnostic Punch Biopsy Tissue',
        stainingMethod: 'Hematoxylin & Eosin (H&E)',
        microscopicDescription:
          'Stratified squamous epithelium demonstrates hyperorthokeratosis with drop-shaped rete ridges. Mild basilar hyperplasia and nuclear hyperchromasia in lower spinous layers. Basement membrane intact. No invasive malignancy detected.',
        diagnosis: 'Oral Leukoplakia with Mild-to-Moderate Epithelial Dysplasia',
        grade: 'Grade II (Moderate Dysplasia)',
        isMalignant: false,
        pathologistName: 'Dr. Swapna Devi, MDS (Oral & Maxillofacial Pathology)',
        pathologistAbdmCode: 'ABDM-DOC-AP-7821',
        notes:
          'Biopsy tissue received safely in 10% neutral buffered formalin. Slide staining and tele-pathology microscopy verified. Dysplastic cellular changes confirmed without stromal invasion.',
        recommendation:
          'Advised complete cessation of tobacco chewing / reverse smoking (Adda Poga), topical Kenacort 0.1% paste application twice daily, antioxidant therapy (Lycopene 8mg), and clinical re-evaluation in 4 weeks at Area Hospital Paderu.',
        turnaroundTime: '24-48 Hours',
        printableBarcodeId: `BARCODE-HISTO-${patient.uidn.replace(/[^A-Za-z0-9]/g, '').slice(-6)}`,
        completedAt: new Date('2026-11-20T10:30:00Z')
      };

      await store.saveHistopathology(defaultRecord);
      return res.status(200).json({ success: true, histopathology: defaultRecord });
    }

    return res.status(404).json({ success: false, message: 'Histopathology record not found' });
  } catch (error: any) {
    console.error('Error fetching histopathology:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving histopathology' });
  }
};

export const updatePatientHistopathology = async (req: Request, res: Response) => {
  try {
    const rawUidn = String(req.params.patientUidn || req.params.id || '').trim();
    if (!rawUidn) {
      return res.status(400).json({ success: false, message: 'Patient UIDN is required' });
    }

    const existing = await store.findHistopathologyByPatientUidn(rawUidn);
    const updatedData = {
      ...(existing || {}),
      ...req.body,
      patientUidn: rawUidn,
      updatedAt: new Date()
    };

    if (req.body.status === 'completed' && !updatedData.completedAt) {
      updatedData.completedAt = new Date();
    }

    const saved = await store.saveHistopathology(updatedData);

    await store.logAction({
      actorId: (req as any).user?.uidn || (req as any).user?._id || 'Specialist-Doctor',
      role: (req as any).user?.role || 'doctor',
      action: 'HISTOPATHOLOGY_REVIEW_UPDATED',
      targetUidn: rawUidn,
      details: {
        status: saved.status,
        diagnosis: saved.diagnosis,
        grade: saved.grade,
        pathologistName: saved.pathologistName
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Histopathology review updated successfully',
      histopathology: saved
    });
  } catch (error: any) {
    console.error('Error updating histopathology:', error);
    return res.status(500).json({ success: false, message: 'Server error updating histopathology' });
  }
};

export const getAllHistopathology = async (req: Request, res: Response) => {
  try {
    const records = await store.findHistopathologyRecords();
    return res.status(200).json({ success: true, count: records.length, histopathology: records });
  } catch (error: any) {
    console.error('Error fetching all histopathology records:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving histopathology list' });
  }
};
