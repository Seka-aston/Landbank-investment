import { cx } from "@/utils/cx";

export const LandBankLogoMark = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cx("shrink-0", className)}
    >
        {/* Yellow stripes (top) */}
        <path
            d="M8 6c0-1 .6-1.8 1.5-2l16-3.5c1.2-.3 2.3.6 2.3 1.8v2c0 1-.6 1.8-1.5 2L10.3 10c-1.2.3-2.3-.6-2.3-1.8V6Z"
            fill="#F5C341"
        />
        <path
            d="M5 14c0-1 .6-1.8 1.5-2l16-3.5c1.2-.3 2.3.6 2.3 1.8v2c0 1-.6 1.8-1.5 2L7.3 18c-1.2.3-2.3-.6-2.3-1.8V14Z"
            fill="#F5C341"
        />
        {/* Green stripes (bottom) */}
        <path
            d="M2 22c0-1 .6-1.8 1.5-2l16-3.5c1.2-.3 2.3.6 2.3 1.8v2c0 1-.6 1.8-1.5 2L4.3 26c-1.2.3-2.3-.6-2.3-1.8V22Z"
            fill="#0F9846"
        />
        <path
            d="M5 30c0-1 .6-1.8 1.5-2l16-3.5c1.2-.3 2.3.6 2.3 1.8v2c0 1-.6 1.8-1.5 2L7.3 34c-1.2.3-2.3-.6-2.3-1.8V30Z"
            fill="#0F9846"
        />
    </svg>
);

export const LandBankLogoFull = ({ className }: { className?: string }) => (
    <div className={cx("flex items-center gap-2", className)}>
        <LandBankLogoMark className="size-8" />
        <span className="text-xl font-bold tracking-tight text-[#0F9846]">
            LandBank
        </span>
    </div>
);

export const LandBankLogoStaff = ({ className }: { className?: string }) => (
    <div className={cx("flex items-center gap-2.5", className)}>
        <LandBankLogoMark className="size-8" />
        <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight tracking-tight text-[#0F9846]">
                LandBank
            </span>
            <span className="text-[11px] font-medium leading-tight text-tertiary">
                Staff Portal
            </span>
        </div>
    </div>
);
