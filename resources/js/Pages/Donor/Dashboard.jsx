import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import StatCard from '@/Components/StatCard';

export default function Dashboard() {
    const { user } = usePage().props.auth;

    return (
        <AppLayout>
            <Head title="Donor dashboard" />
            <h1 className="mb-5 text-[26px] font-bold">Welcome back, {user.name}</h1>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                <StatCard label="Blood group" value={user.blood_group} />
                <StatCard label="City" value={user.city} />
                <StatCard label="Availability" value={user.is_available ? 'Available' : 'Busy'} />
            </div>
        </AppLayout>
    );
}
