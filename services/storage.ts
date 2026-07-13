import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export const storageService = {
  async uploadProfilePicture(userId: string, fileUri: string): Promise<string> {
    const filename = `profile_pictures/${userId}_${Date.now()}`;
    const storageRef = ref(storage, filename);

    // Convert URI to blob
    const response = await fetch(fileUri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);
    return getDownloadURL(storageRef);
  },

  async uploadMedicalRecord(patientId: string, fileUri: string, recordType: string): Promise<string> {
    const filename = `medical_records/${patientId}/${recordType}_${Date.now()}`;
    const storageRef = ref(storage, filename);

    const response = await fetch(fileUri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);
    return getDownloadURL(storageRef);
  },

  async uploadProfessionalDocument(
    professionalId: string,
    fileUri: string,
    documentType: string
  ): Promise<string> {
    const filename = `professional_documents/${professionalId}/${documentType}_${Date.now()}`;
    const storageRef = ref(storage, filename);

    const response = await fetch(fileUri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);
    return getDownloadURL(storageRef);
  },

  async uploadPrescription(bookingId: string, fileUri: string): Promise<string> {
    const filename = `prescriptions/${bookingId}_${Date.now()}`;
    const storageRef = ref(storage, filename);

    const response = await fetch(fileUri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);
    return getDownloadURL(storageRef);
  },

  async deleteFile(fileUrl: string) {
    try {
      const fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  },
};

export default storageService;
