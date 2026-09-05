"use client";

import { Mail01, Lock01, ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Checkbox } from "@/components/base/checkbox/checkbox";

export const LoginScreen = () => {
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
                        <h1 className="mt-4 text-display-sm font-semibold text-primary">Welcome back</h1>
                        <p className="mt-2 text-md text-tertiary">Log in to your Land Bank investor account.</p>
                    </div>

                    <div className="flex flex-col gap-5">
                        <Input
                            label="Email"
                            placeholder="you@example.com"
                            type="email"
                            icon={Mail01}
                        />

                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            icon={Lock01}
                        />

                        <div className="flex items-center justify-between">
                            <Checkbox label="Remember me" size="sm" />
                            <Button href="/forgot-password" color="link-color" size="sm">
                                Forgot password?
                            </Button>
                        </div>

                        <Button href="/portfolio" color="primary" size="lg" iconTrailing={ArrowRight} className="w-full">
                            Log in
                        </Button>

                        <div className="relative my-1">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-secondary" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-secondary px-3 text-tertiary">or</span>
                            </div>
                        </div>

                        <Button href="/login/phone" color="secondary" size="lg" className="w-full">
                            Log in with phone number
                        </Button>
                    </div>

                    <p className="mt-8 text-center text-sm text-tertiary">
                        Don&apos;t have an account?{" "}
                        <Button href="/signup" color="link-color" size="sm">
                            Sign up
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    );
};
