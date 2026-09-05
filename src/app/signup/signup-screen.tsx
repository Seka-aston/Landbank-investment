"use client";

import { useState } from "react";
import { User01, Mail01, Lock01, Phone, ArrowRight, ArrowLeft, Check } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { cx } from "@/utils/cx";

type Step = "details" | "verify-phone" | "done";

export const SignupScreen = () => {
    const [step, setStep] = useState<Step>("details");

    if (step === "verify-phone") {
        return (
            <div className="flex min-h-dvh flex-col bg-secondary">
                <div className="flex flex-1 items-center justify-center px-4 py-12">
                    <div className="w-full max-w-sm">
                        <div className="mb-8 text-center">
                            <a href="/" className="mb-6 inline-flex items-center gap-2">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-brand-solid">
                                    <span className="text-md font-bold text-white">LB</span>
                                </div>
                            </a>
                            <h1 className="mt-4 text-display-sm font-semibold text-primary">Verify your phone</h1>
                            <p className="mt-2 text-md text-tertiary">
                                We&apos;ve sent a 6-digit code to +250 788 000 000.
                            </p>
                        </div>

                        <div className="flex flex-col gap-5">
                            <Input
                                label="Verification code"
                                placeholder="Enter 6-digit code"
                                size="lg"
                            />

                            <Button color="primary" size="lg" iconTrailing={ArrowRight} onClick={() => setStep("done")} className="w-full">
                                Verify &amp; Continue
                            </Button>

                            <div className="flex items-center justify-between">
                                <Button color="link-gray" size="sm" iconLeading={ArrowLeft} onClick={() => setStep("details")}>
                                    Back
                                </Button>
                                <Button color="link-color" size="sm">
                                    Resend code
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (step === "done") {
        return (
            <div className="flex min-h-dvh flex-col bg-secondary">
                <div className="flex flex-1 items-center justify-center px-4 py-12">
                    <div className="w-full max-w-sm text-center">
                        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-success-secondary">
                            <Check className="size-6 text-fg-success-primary" />
                        </div>
                        <h1 className="text-display-sm font-semibold text-primary">Account created!</h1>
                        <p className="mt-2 text-md text-tertiary">
                            Your Land Bank account is ready. Next, verify your identity to start investing.
                        </p>

                        <div className="mt-8 flex flex-col gap-3">
                            <Button href="/verify" color="primary" size="lg" iconTrailing={ArrowRight} className="w-full">
                                Verify Identity (KYC)
                            </Button>
                            <Button href="/opportunities" color="secondary" size="lg" className="w-full">
                                Browse Opportunities First
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-dvh flex-col bg-secondary">
            <div className="flex flex-1 items-center justify-center px-4 py-12">
                <div className="w-full max-w-sm">
                    <div className="mb-8 text-center">
                        <a href="/" className="mb-6 inline-flex items-center gap-2">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-brand-solid">
                                <span className="text-md font-bold text-white">LB</span>
                            </div>
                        </a>
                        <h1 className="mt-4 text-display-sm font-semibold text-primary">Create your account</h1>
                        <p className="mt-2 text-md text-tertiary">
                            Join thousands of investors building wealth through Rwandan land.
                        </p>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="flex gap-3">
                            <Input
                                label="First name"
                                placeholder="Jean"
                                icon={User01}
                            />
                            <Input
                                label="Last name"
                                placeholder="Mugabo"
                            />
                        </div>

                        <Input
                            label="Email"
                            placeholder="you@example.com"
                            type="email"
                            icon={Mail01}
                        />

                        <Input
                            label="Phone number"
                            placeholder="+250 788 000 000"
                            type="tel"
                            icon={Phone}
                        />

                        <Input
                            label="Password"
                            placeholder="Create a password"
                            type="password"
                            icon={Lock01}
                            hint="Must be at least 8 characters"
                        />

                        <Checkbox
                            size="sm"
                            label="I agree to the Terms of Service and Privacy Policy"
                        />

                        <Button color="primary" size="lg" iconTrailing={ArrowRight} onClick={() => setStep("verify-phone")} className="w-full">
                            Create account
                        </Button>
                    </div>

                    <p className="mt-8 text-center text-sm text-tertiary">
                        Already have an account?{" "}
                        <Button href="/login" color="link-color" size="sm">
                            Log in
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    );
};
