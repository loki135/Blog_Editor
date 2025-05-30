import { useEffect, useRef } from 'react';
import { BlogFormData } from '../types';
import { api } from '../services/api';

interface AutosaveProps {
  formData: BlogFormData;
  onSave: () => void;
  delay?: number;
}

export const useAutosave = ({ formData, onSave, delay = 5000 }: AutosaveProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const previousFormData = useRef<string>('');

  // Function to handle the autosave
  const handleAutosave = async () => {
    const currentFormData = JSON.stringify(formData);
    
    // Only save if there are changes and the form is not empty
    if (
      currentFormData !== previousFormData.current && 
      formData.title.trim() !== '' && 
      formData.content.trim() !== ''
    ) {
      try {
        await api.saveDraft(formData);
        previousFormData.current = currentFormData;
        onSave();
      } catch (error) {
        console.error('Autosave failed:', error);
      }
    }
  };

  useEffect(() => {
    // Clear the previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer
    timerRef.current = setTimeout(handleAutosave, delay);

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [formData, delay]);
};