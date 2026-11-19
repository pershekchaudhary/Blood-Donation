import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import StatCard from '@/Components/StatCard';

export default function Dashboard() {
    const { user } = usePage().props.auth;

    return (
        <AppLayout>
            <Head title="Admin dashboard" />
            <h1 className="mb-5 text-[26px] font-bold">Admin dashboard</h1>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                <StatCard label="Signed in as" value={user.name} />
                <StatCard label="Role" value="Admin" />
            </div>
        </AppLayout>
    );
}
