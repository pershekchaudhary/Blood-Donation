import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import Field, { inputCls, PrimaryButton } from '@/Components/Field';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <AuthLayout>
            <Head title="Login" />
            <h1 className="mb-2 text-[26px] font-bold">Login</h1>

            {status && <div className="mb-2 text-sm font-medium text-green-700">{status}</div>}

            <form onSubmit={submit}>
                <Field label="Email" id="email" error={errors.email}>
                    <input id="email" type="email" autoComplete="username" autoFocus className={inputCls}
                        value={data.email} onChange={(e) => setData('email', e.target.value)} />
                </Field>

                <Field label="Password" id="password" error={errors.password}>
                    <input id="password" type="password" autoComplete="current-password" className={inputCls}
                        value={data.password} onChange={(e) => setData('password', e.target.value)} />
                </Field>

                <div className="mt-3 flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)} />
                        Remember me
                    </label>
                    {canResetPassword && (
                        <Link href={route('password.request')} className="text-[#B3261E] hover:underline">
                            Forgot password?
                        </Link>
                    )}
                </div>

                <PrimaryButton type="submit" disabled={processing}>Login</PrimaryButton>
            </form>

            <p className="mt-4 text-[13px] text-[#5B6068]">
                New here?{' '}
                <Link href={route('register')} className="font-semibold text-[#B3261E] hover:underline">
                    Create an account
                </Link>
            </p>
        </AuthLayout>
    );
}
