import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import Field, { inputCls, PrimaryButton } from '@/Components/Field';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Reset password" />
            <h1 className="mb-2 text-[26px] font-bold">Choose a new password</h1>

            <form onSubmit={submit}>
                <Field label="Email" id="email" error={errors.email}>
                    <input id="email" type="email" autoComplete="username" className={inputCls} value={data.email}
                        onChange={(e) => setData('email', e.target.value)} />
                </Field>
                <Field label="New password" id="password" error={errors.password}>
                    <input id="password" type="password" autoComplete="new-password" autoFocus className={inputCls}
                        value={data.password} onChange={(e) => setData('password', e.target.value)} />
                </Field>
                <Field label="Confirm password" id="password_confirmation" error={errors.password_confirmation}>
                    <input id="password_confirmation" type="password" autoComplete="new-password" className={inputCls}
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)} />
                </Field>
                <PrimaryButton type="submit" disabled={processing}>Reset password</PrimaryButton>
            </form>
        </AuthLayout>
    );
}
