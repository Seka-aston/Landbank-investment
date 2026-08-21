export interface KYCFormData {
    nationality: string;
    isRwandanResident: boolean;
    isOver18: boolean;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    nationalId: string;
    documentType: string;
    documentNumber: string;
    documentUploaded: boolean;
    selfieUploaded: boolean;
    addressDocType: string;
    addressUploaded: boolean;
    addressSkipped: boolean;
    acceptTerms: boolean;
    acceptRisks: boolean;
    confirmAccuracy: boolean;
    politicallyExposed: boolean;
}

export interface StepProps {
    formData: KYCFormData;
    updateForm: (updates: Partial<KYCFormData>) => void;
}
