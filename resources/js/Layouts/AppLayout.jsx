import { Link, usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { auth, flash } = usePage().props;

    return (
        <div className="min-h-screen bg-[#FAFAF8] text-[#1F2328]">
            <header className="flex h-[60px] items-center gap-6 border-b border-[#E4E2DD] bg-white px-8">
                <Link href={route('dashboard')} className="mr-auto flex flex-col leading-tight text-[#B3261E]">
                    <span className="text-lg font-bold">Blood-Donation</span>
                    <span className="text-xs font-medium text-[#5B6068]">Donate blood, save lives</span>
                </Link>
                <Link href={route('dashboard')} className="text-sm hover:text-[#B3261E]">
                    Dashboard
                </Link>
                <Link href={route('profile.edit')} className="text-sm hover:text-[#B3261E]">
                    Profile
                </Link>
                <Link href={route('logout')} method="post" as="button" className="text-sm hover:text-[#B3261E]">
                    Logout
                </Link>
            </header>
            <main className="mx-auto max-w-[1100px] p-8">
                {flash?.error && (
                    <div role="alert" className="mb-4 rounded-lg bg-[#FBE4E2] px-4 py-3 text-sm text-[#8C1D18]">
                        {flash.error}
                    </div>
                )}
                <p className="mb-1 text-sm text-[#5B6068]">Signed in as {auth.user.email}</p>
                {children}
            </main>
        </div>
    );
}
