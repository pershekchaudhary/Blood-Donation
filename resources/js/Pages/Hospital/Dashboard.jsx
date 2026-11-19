import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import StatCard from '@/Components/StatCard';

export default function Dashboard() {
    const { user } = usePage().props.auth;

    return (
        <AppLayout>
            <Head title="Hospital dashboard" />
            <h1 className="mb-5 text-[26px] font-bold">Welcome, {user.name}</h1>
            {!user.is_verified && (
                <div role="status" className="mb-5 rounded-lg bg-[#FFF1D6] px-4 py-3 text-sm text-[#7A4B00]">
                    Your hospital account is waiting for admin verification.
                </div>
            )}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                <StatCard label="City" value={user.city} />
                <StatCard label="Account" value={user.is_verified ? 'Verified' : 'Pending'} />
            </div>
        </AppLayout>
    );
}
