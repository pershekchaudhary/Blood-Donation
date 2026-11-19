export const inputCls =
    'w-full rounded-lg border border-[#9AA0A6] bg-white px-3 py-[11px] text-base text-[#1F2328] focus:border-[#B3261E] focus:outline-none focus:ring-2 focus:ring-[#B3261E]/30';

export default function Field({ label, id, error, children }) {
    return (
        <div className="mt-3">
            <label htmlFor={id} className="mb-1 block text-[13px] font-semibold">
                {label}
            </label>
            {children}
            {error && (
                <p role="alert" className="mt-1 text-sm text-[#B3261E]">
                    {error}
                </p>
            )}
        </div>
    );
}

export function PrimaryButton({ children, ...props }) {
    return (
        <button
            {...props}
            className="mt-5 min-h-[44px] w-full rounded-lg bg-[#B3261E] px-4 font-semibold text-white hover:bg-[#9c2019] disabled:opacity-60"
        >
            {children}
        </button>
    );
}
