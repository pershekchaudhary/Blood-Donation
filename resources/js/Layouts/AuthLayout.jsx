import { Link, usePage } from '@inertiajs/react';

export default function AuthLayout({ children }) {
    const { flash } = usePage().props;

    return (
        <div className="min-h-screen bg-[#FAFAF8] text-[#1F2328]">
            <header className="flex h-[60px] items-center border-b border-[#E4E2DD] bg-white px-8">
                <Link href="/" className="flex flex-col leading-tight text-[#B3261E]">
                    <span className="text-lg font-bold">Blood-Donation</span>
                    <span className="text-xs font-medium text-[#5B6068]">Donate blood, save lives</span>
                </Link>
            </header>
            <main className="mx-auto my-12 w-full max-w-[420px] px-4">
                {flash?.error && (
                    <div role="alert" className="mb-4 rounded-lg bg-[#FBE4E2] px-4 py-3 text-sm text-[#8C1D18]">
                        {flash.error}
                    </div>
                )}
                <div className="rounded-[10px] border border-[#E4E2DD] bg-white p-5">{children}</div>
            </main>
        </div>
    );
}
