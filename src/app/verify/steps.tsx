"use client";

import {
    Shield01,
    CheckCircle,
    User01,
    CreditCard02,
    Camera01,
    Home02,
    FileCheck02,
    AlertTriangle,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { Select } from "@/components/base/select/select";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";
import type { KYCFormData, StepProps } from "./kyc-types";

// ─── Step 1: Introduction ────────────────────────────────────────────────────

export function StepIntroduction() {
    const items = [
        {
            icon: User01,
            title: "Personal Information",
            desc: "Basic details like your name, date of birth, and contact information.",
        },
        {
            icon: CreditCard02,
            title: "Identity Document",
            desc: "A valid government-issued ID (national ID, passport, or driving license).",
        },
        {
            icon: Camera01,
            title: "Selfie Verification",
            desc: "A live selfie to match against your identity document.",
        },
        {
            icon: Home02,
            title: "Proof of Address",
            desc: "A utility bill or bank statement showing your address (optional).",
        },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4 rounded-lg border border-secondary bg-secondary p-4">
                <FeaturedIcon icon={Shield01} size="md" color="brand" theme="light" />
                <div>
                    <h3 className="text-md font-semibold text-primary">Why do we need to verify your identity?</h3>
                    <p className="mt-1 text-sm text-tertiary">
                        Rwanda's financial regulations require us to verify the identity of all investors. This one-time process protects
                        you and other investors from fraud. Your documents are encrypted and stored securely.
                    </p>
                </div>
            </div>

            <div>
                <h3 className="mb-3 text-md font-semibold text-primary">What you'll need</h3>
                <div className="flex flex-col gap-3">
                    {items.map((item) => (
                        <div key={item.title} className="flex items-start gap-3 rounded-lg border border-secondary p-4">
                            <FeaturedIcon icon={item.icon} size="sm" color="brand" theme="light" />
                            <div>
                                <p className="text-sm font-semibold text-primary">{item.title}</p>
                                <p className="text-sm text-tertiary">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-lg bg-brand-section_subtle p-4">
                <p className="text-sm text-tertiary">
                    <strong className="text-secondary">Estimated time:</strong> 5–10 minutes. You can save your progress and return
                    later at any time using the "Save & Exit" button.
                </p>
            </div>
        </div>
    );
}

// ─── Step 2: Eligibility Check ───────────────────────────────────────────────

export function StepEligibility({ formData, updateForm }: StepProps) {
    const nationalityOptions = [
        { id: "Rwandan", label: "Rwandan" },
        { id: "Burundian", label: "Burundian" },
        { id: "Congolese", label: "Congolese" },
        { id: "Kenyan", label: "Kenyan" },
        { id: "Ugandan", label: "Ugandan" },
        { id: "Other", label: "Other" },
    ];

    return (
        <div className="flex flex-col gap-6">
            <p className="text-sm text-tertiary">
                Please confirm the following to ensure you're eligible to invest through Land Bank.
            </p>

            <Select
                label="Nationality"
                selectedKey={formData.nationality}
                onSelectionChange={(key) => updateForm({ nationality: key as string })}
                items={nationalityOptions}
                size="md"
                isRequired
            >
                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
            </Select>

            <div className="flex flex-col gap-4">
                <Checkbox
                    isSelected={formData.isRwandanResident}
                    onChange={(checked) => updateForm({ isRwandanResident: checked })}
                    size="md"
                >
                    <span className="text-sm font-medium text-secondary">
                        I am currently a resident of Rwanda or have a valid Rwandan address
                    </span>
                </Checkbox>

                <Checkbox
                    isSelected={formData.isOver18}
                    onChange={(checked) => updateForm({ isOver18: checked })}
                    size="md"
                >
                    <span className="text-sm font-medium text-secondary">I am 18 years of age or older</span>
                </Checkbox>
            </div>

            {(!formData.isOver18 || !formData.isRwandanResident) && (
                <div className="flex items-start gap-3 rounded-lg border border-error_subtle bg-error-primary p-4">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-fg-error-secondary" />
                    <p className="text-sm text-error-primary">
                        You must be at least 18 years old and a Rwandan resident to invest through Land Bank. If you believe this is an
                        error, please contact our support team.
                    </p>
                </div>
            )}
        </div>
    );
}

// ─── Step 3: Personal Information ────────────────────────────────────────────

export function StepPersonalInfo({ formData, updateForm }: StepProps) {
    return (
        <div className="flex flex-col gap-5">
            <p className="text-sm text-tertiary">Enter your personal details exactly as they appear on your identity document.</p>

            <div className="grid gap-4 sm:grid-cols-2">
                <Input
                    label="First Name"
                    placeholder="e.g. Jean"
                    value={formData.firstName}
                    onChange={(value) => updateForm({ firstName: value })}
                    isRequired
                    size="md"
                />
                <Input
                    label="Last Name"
                    placeholder="e.g. Mugabo"
                    value={formData.lastName}
                    onChange={(value) => updateForm({ lastName: value })}
                    isRequired
                    size="md"
                />
            </div>

            <Input
                label="Date of Birth"
                placeholder="DD/MM/YYYY"
                value={formData.dateOfBirth}
                onChange={(value) => updateForm({ dateOfBirth: value })}
                isRequired
                size="md"
            />

            <Input
                label="National ID Number"
                placeholder="1 1990 8 0012345 6 78"
                value={formData.nationalId}
                onChange={(value) => updateForm({ nationalId: value })}
                isRequired
                size="md"
                hint="16-digit Rwandan national ID number"
            />

            <Input
                label="Email Address"
                placeholder="jean.mugabo@email.com"
                value={formData.email}
                onChange={(value) => updateForm({ email: value })}
                isRequired
                size="md"
                type="email"
            />

            <Input
                label="Phone Number"
                placeholder="+250 78X XXX XXX"
                value={formData.phone}
                onChange={(value) => updateForm({ phone: value })}
                isRequired
                size="md"
                type="tel"
                hint="We'll send verification codes to this number"
            />
        </div>
    );
}

// ─── Step 4: Identity Document Upload ────────────────────────────────────────

export function StepIdentityDocument({ formData, updateForm }: StepProps) {
    return (
        <div className="flex flex-col gap-5">
            <p className="text-sm text-tertiary">
                Upload a clear photo of a valid government-issued identity document. Both sides are required for national ID cards.
            </p>

            <RadioGroup
                value={formData.documentType}
                onChange={(value) => updateForm({ documentType: value })}
                aria-label="Document type"
            >
                <RadioButton value="national-id" label="National ID Card" hint="Front and back required" />
                <RadioButton value="passport" label="Passport" hint="Photo page only" />
                <RadioButton value="driving-license" label="Driving License" hint="Front and back required" />
            </RadioGroup>

            <Input
                label="Document Number"
                placeholder={formData.documentType === "passport" ? "e.g. PC1234567" : "Same as National ID"}
                value={formData.documentNumber}
                onChange={(value) => updateForm({ documentNumber: value })}
                isRequired
                size="md"
            />

            <div>
                <label className="mb-1.5 block text-sm font-medium text-secondary">
                    Upload Document {formData.documentType === "national-id" ? "(Front)" : ""}
                </label>
                <FileUploadDropZone
                    accept="image/*,.pdf"
                    hint="SVG, PNG, JPG or PDF (max. 10MB)"
                    allowsMultiple={false}
                    maxSize={10 * 1024 * 1024}
                    onDropFiles={() => updateForm({ documentUploaded: true })}
                />
            </div>

            {formData.documentType !== "passport" && (
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-secondary">Upload Document (Back)</label>
                    <FileUploadDropZone
                        accept="image/*,.pdf"
                        hint="SVG, PNG, JPG or PDF (max. 10MB)"
                        allowsMultiple={false}
                        maxSize={10 * 1024 * 1024}
                        onDropFiles={() => {}}
                    />
                </div>
            )}

            {formData.documentUploaded && (
                <div className="flex items-center gap-2 rounded-lg border border-secondary bg-success-primary p-3">
                    <CheckCircle className="size-4 text-fg-success-secondary" />
                    <span className="text-sm font-medium text-success-primary">Document uploaded successfully</span>
                </div>
            )}
        </div>
    );
}

// ─── Step 5: Selfie Verification ─────────────────────────────────────────────

export function StepSelfie({ formData, updateForm }: StepProps) {
    return (
        <div className="flex flex-col gap-6">
            <p className="text-sm text-tertiary">
                Take a selfie to verify that you are the person shown in your identity document. Make sure your face is clearly visible
                and well-lit.
            </p>

            <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-secondary bg-secondary py-10">
                <div className="flex size-16 items-center justify-center rounded-full bg-brand-secondary">
                    <Camera01 className="size-7 text-fg-brand-primary" />
                </div>
                <div className="text-center">
                    <p className="text-md font-semibold text-primary">
                        {formData.selfieUploaded ? "Selfie captured" : "Take a selfie"}
                    </p>
                    <p className="mt-1 text-sm text-tertiary">
                        {formData.selfieUploaded
                            ? "Your selfie has been captured. You can retake it if needed."
                            : "Position your face within the frame and ensure good lighting."}
                    </p>
                </div>
                <Button
                    color={formData.selfieUploaded ? "secondary" : "primary"}
                    size="md"
                    iconLeading={Camera01}
                    onClick={() => updateForm({ selfieUploaded: true })}
                >
                    {formData.selfieUploaded ? "Retake Selfie" : "Open Camera"}
                </Button>
            </div>

            {formData.selfieUploaded && (
                <div className="flex items-center gap-2 rounded-lg border border-secondary bg-success-primary p-3">
                    <CheckCircle className="size-4 text-fg-success-secondary" />
                    <span className="text-sm font-medium text-success-primary">Selfie captured successfully</span>
                </div>
            )}

            <div className="rounded-lg bg-secondary p-4">
                <h4 className="text-sm font-semibold text-primary">Tips for a good selfie</h4>
                <ul className="mt-2 flex flex-col gap-1.5 text-sm text-tertiary">
                    <li>• Look directly at the camera</li>
                    <li>• Ensure even lighting — avoid shadows on your face</li>
                    <li>• Remove glasses, hats, or face coverings</li>
                    <li>• Keep a neutral expression</li>
                </ul>
            </div>
        </div>
    );
}

// ─── Step 6: Proof of Address (Optional) ─────────────────────────────────────

export function StepProofOfAddress({ formData, updateForm }: StepProps) {
    const docTypes = [
        { id: "utility-bill", label: "Utility Bill (electricity, water, internet)" },
        { id: "bank-statement", label: "Bank Statement" },
        { id: "tax-certificate", label: "Tax Certificate" },
        { id: "rental-agreement", label: "Rental Agreement" },
    ];

    if (formData.addressSkipped) {
        return (
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-3 rounded-xl border border-secondary bg-secondary py-10">
                    <FeaturedIcon icon={Home02} size="lg" color="gray" theme="light" />
                    <p className="text-md font-semibold text-primary">Proof of address skipped</p>
                    <p className="text-sm text-tertiary">You can always add this later from your account settings.</p>
                    <Button color="secondary" size="sm" onClick={() => updateForm({ addressSkipped: false })}>
                        Upload Address Proof Instead
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3 rounded-lg border border-secondary bg-secondary p-4">
                <FeaturedIcon icon={Home02} size="sm" color="brand" theme="light" />
                <div className="flex-1">
                    <p className="text-sm font-semibold text-primary">This step is optional</p>
                    <p className="text-sm text-tertiary">
                        Providing proof of address speeds up verification but isn't required. You can skip and add it later.
                    </p>
                </div>
                <Button color="tertiary" size="sm" onClick={() => updateForm({ addressSkipped: true })}>
                    Skip
                </Button>
            </div>

            <Select
                label="Document Type"
                placeholder="Select a document type"
                selectedKey={formData.addressDocType || undefined}
                onSelectionChange={(key) => updateForm({ addressDocType: key as string })}
                items={docTypes}
                size="md"
            >
                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
            </Select>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-secondary">Upload Document</label>
                <FileUploadDropZone
                    accept="image/*,.pdf"
                    hint="SVG, PNG, JPG or PDF (max. 10MB). Document must be less than 3 months old."
                    allowsMultiple={false}
                    maxSize={10 * 1024 * 1024}
                    onDropFiles={() => updateForm({ addressUploaded: true })}
                />
            </div>

            {formData.addressUploaded && (
                <div className="flex items-center gap-2 rounded-lg border border-secondary bg-success-primary p-3">
                    <CheckCircle className="size-4 text-fg-success-secondary" />
                    <span className="text-sm font-medium text-success-primary">Address document uploaded successfully</span>
                </div>
            )}
        </div>
    );
}

// ─── Step 7: Investor Declarations ───────────────────────────────────────────

export function StepDeclarations({ formData, updateForm }: StepProps) {
    return (
        <div className="flex flex-col gap-6">
            <p className="text-sm text-tertiary">
                Please read and confirm the following declarations before submitting your verification.
            </p>

            <div className="flex flex-col gap-4">
                <div className="rounded-lg border border-secondary p-4">
                    <Checkbox
                        isSelected={formData.acceptTerms}
                        onChange={(checked) => updateForm({ acceptTerms: checked })}
                        size="md"
                        label="Terms & Conditions"
                        hint="I have read and agree to Land Bank's Terms of Service and Privacy Policy. I understand that my personal data will be processed in accordance with applicable data protection laws."
                    />
                </div>

                <div className="rounded-lg border border-secondary p-4">
                    <Checkbox
                        isSelected={formData.acceptRisks}
                        onChange={(checked) => updateForm({ acceptRisks: checked })}
                        size="md"
                        label="Investment Risk Acknowledgement"
                        hint="I understand that land investments carry risks including, but not limited to, loss of capital, market volatility, and illiquidity. Past performance does not guarantee future results."
                    />
                </div>

                <div className="rounded-lg border border-secondary p-4">
                    <Checkbox
                        isSelected={formData.confirmAccuracy}
                        onChange={(checked) => updateForm({ confirmAccuracy: checked })}
                        size="md"
                        label="Accuracy of Information"
                        hint="I confirm that all information and documents provided in this application are true, accurate, and complete to the best of my knowledge. I understand that providing false information may result in rejection or account termination."
                    />
                </div>

                <div className="rounded-lg border border-secondary p-4">
                    <Checkbox
                        isSelected={formData.politicallyExposed}
                        onChange={(checked) => updateForm({ politicallyExposed: checked })}
                        size="md"
                        label="Politically Exposed Person (PEP)"
                        hint="I am, or have been in the past 12 months, a politically exposed person — a government official, senior executive of a state-owned enterprise, or a close family member or associate of such a person."
                    />
                </div>
            </div>

            {(!formData.acceptTerms || !formData.acceptRisks || !formData.confirmAccuracy) && (
                <div className="flex items-start gap-2 rounded-lg bg-secondary p-3">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-fg-warning-secondary" />
                    <p className="text-xs text-tertiary">
                        You must accept the Terms & Conditions, acknowledge investment risks, and confirm the accuracy of your
                        information to proceed.
                    </p>
                </div>
            )}
        </div>
    );
}

// ─── Step 8: Review & Submit ─────────────────────────────────────────────────

function ReviewField({ label, value, stepIndex, onEdit }: { label: string; value: string; stepIndex?: number; onEdit?: (index: number) => void }) {
    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <span className="text-xs text-tertiary">{label}</span>
                <p className="text-sm font-medium text-primary">{value || "—"}</p>
            </div>
            {onEdit && stepIndex !== undefined && (
                <Button color="link-color" size="xs" onClick={() => onEdit(stepIndex)}>
                    Edit
                </Button>
            )}
        </div>
    );
}

export function StepReview({ formData, onGoToStep }: { formData: KYCFormData; onGoToStep: (index: number) => void }) {
    return (
        <div className="flex flex-col gap-6">
            <p className="text-sm text-tertiary">
                Please review your information below. Click "Edit" to correct any details before submitting.
            </p>

            <div className="rounded-lg border border-secondary">
                <div className="border-b border-secondary bg-secondary px-4 py-2.5">
                    <h3 className="text-sm font-semibold text-primary">Eligibility</h3>
                </div>
                <div className="flex flex-col divide-y divide-secondary px-4">
                    <ReviewField label="Nationality" value={formData.nationality} stepIndex={1} onEdit={onGoToStep} />
                    <ReviewField label="Rwandan Resident" value={formData.isRwandanResident ? "Yes" : "No"} stepIndex={1} onEdit={onGoToStep} />
                    <ReviewField label="Over 18" value={formData.isOver18 ? "Yes" : "No"} stepIndex={1} onEdit={onGoToStep} />
                </div>
            </div>

            <div className="rounded-lg border border-secondary">
                <div className="border-b border-secondary bg-secondary px-4 py-2.5">
                    <h3 className="text-sm font-semibold text-primary">Personal Information</h3>
                </div>
                <div className="flex flex-col divide-y divide-secondary px-4">
                    <ReviewField label="Full Name" value={`${formData.firstName} ${formData.lastName}`} stepIndex={2} onEdit={onGoToStep} />
                    <ReviewField label="Date of Birth" value={formData.dateOfBirth} stepIndex={2} onEdit={onGoToStep} />
                    <ReviewField label="National ID" value={formData.nationalId} stepIndex={2} onEdit={onGoToStep} />
                    <ReviewField label="Email" value={formData.email} stepIndex={2} onEdit={onGoToStep} />
                    <ReviewField label="Phone" value={formData.phone} stepIndex={2} onEdit={onGoToStep} />
                </div>
            </div>

            <div className="rounded-lg border border-secondary">
                <div className="border-b border-secondary bg-secondary px-4 py-2.5">
                    <h3 className="text-sm font-semibold text-primary">Identity Document</h3>
                </div>
                <div className="flex flex-col divide-y divide-secondary px-4">
                    <ReviewField
                        label="Document Type"
                        value={
                            formData.documentType === "national-id"
                                ? "National ID Card"
                                : formData.documentType === "passport"
                                  ? "Passport"
                                  : "Driving License"
                        }
                        stepIndex={3}
                        onEdit={onGoToStep}
                    />
                    <ReviewField label="Document Number" value={formData.documentNumber} stepIndex={3} onEdit={onGoToStep} />
                    <ReviewField label="Document Upload" value={formData.documentUploaded ? "Uploaded" : "Not uploaded"} stepIndex={3} onEdit={onGoToStep} />
                </div>
            </div>

            <div className="rounded-lg border border-secondary">
                <div className="border-b border-secondary bg-secondary px-4 py-2.5">
                    <h3 className="text-sm font-semibold text-primary">Selfie & Address</h3>
                </div>
                <div className="flex flex-col divide-y divide-secondary px-4">
                    <ReviewField label="Selfie" value={formData.selfieUploaded ? "Captured" : "Not captured"} stepIndex={4} onEdit={onGoToStep} />
                    <ReviewField
                        label="Proof of Address"
                        value={formData.addressSkipped ? "Skipped" : formData.addressUploaded ? "Uploaded" : "Not uploaded"}
                        stepIndex={5}
                        onEdit={onGoToStep}
                    />
                </div>
            </div>

            <div className="rounded-lg border border-secondary">
                <div className="border-b border-secondary bg-secondary px-4 py-2.5">
                    <h3 className="text-sm font-semibold text-primary">Declarations</h3>
                </div>
                <div className="flex flex-col divide-y divide-secondary px-4">
                    <ReviewField label="Terms & Conditions" value={formData.acceptTerms ? "Accepted" : "Not accepted"} stepIndex={6} onEdit={onGoToStep} />
                    <ReviewField label="Risk Acknowledgement" value={formData.acceptRisks ? "Accepted" : "Not accepted"} stepIndex={6} onEdit={onGoToStep} />
                    <ReviewField label="Information Accuracy" value={formData.confirmAccuracy ? "Confirmed" : "Not confirmed"} stepIndex={6} onEdit={onGoToStep} />
                    <ReviewField label="Politically Exposed Person" value={formData.politicallyExposed ? "Yes" : "No"} stepIndex={6} onEdit={onGoToStep} />
                </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-brand bg-brand-section_subtle p-4">
                <FileCheck02 className="mt-0.5 size-5 shrink-0 text-fg-brand-primary" />
                <div>
                    <p className="text-sm font-semibold text-primary">Ready to submit</p>
                    <p className="text-sm text-tertiary">
                        Once submitted, our team will review your verification within 1–2 business days. You'll receive an email and
                        in-app notification with the result.
                    </p>
                </div>
            </div>
        </div>
    );
}
