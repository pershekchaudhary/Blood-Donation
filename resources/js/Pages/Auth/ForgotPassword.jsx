import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import Field, { inputCls, PrimaryButton } from '@/Components/Field';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <AuthLayout>
            <Head title="Forgot password" />
            <h1 className="mb-2 text-[26px] font-bold">Forgot password</h1>
            <p className="text-sm text-[#5B6068]">
                Enter your email and we will send you a link to choose a new password.
            </p>

            {status && <div className="mt-3 text-sm font-medium text-green-700">{status}</div>}

            <form onSubmit={submit}>
                <Field label="Email" id="email" error={errors.email}>
                    <input id="email" type="email" autoFocus className={inputCls} value={data.email}
                        onChange={(e) => setData('email', e.target.value)} />
                </Field>
                <PrimaryButton type="submit" disabled={processing}>Send reset link</PrimaryButton>
            </form>

            <p className="mt-4 text-[13px]">
                <Link href={route('login')} className="font-semibold text-[#B3261E] hover:underline">
                    Back to login
                </Link>
            </p>
        </AuthLayout>
    );
}
