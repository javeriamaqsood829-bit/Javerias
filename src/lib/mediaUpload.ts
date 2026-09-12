import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export interface UploadResult {
  url: string;
  name: string;
  size: number;
  type: string;
}

export async function uploadMediaFile(file: File, folder = 'portfolio'): Promise<UploadResult> {
  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `${folder}/${timestamp}_${sanitizedName}`;

  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type,
    });
    const url = await getDownloadURL(snapshot.ref);
    return {
      url,
      name: file.name,
      size: file.size,
      type: file.type,
    };
  } catch (error) {
    console.warn('Firebase Storage upload failed or unconfigured, falling back to base64 DataURL:', error);
    // Safe client-side Base64 fallback so admin uploads NEVER block or fail
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          url: reader.result as string,
          name: file.name,
          size: file.size,
          type: file.type,
        });
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }
}
