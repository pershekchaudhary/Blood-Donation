import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import Field, { inputCls, PrimaryButton } from '@/Components/Field';

export default function Register({ bloodGroups }) {
    const { data, setData, post, processing, errors, reset, transform } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        role: 'donor',
        blood_group: 'O+',
        city: '',
    });

    // Only donors send a blood group.
    transform((d) => ({ ...d, blood_group: d.role === 'donor' ? d.blood_group : '' }));

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    const text = (name, label, type = 'text', extra = {}) => (
        <Field label={label} id={name} error={errors[name]}>
            <input id={name} name={name} type={type} className={inputCls} value={data[name]}
                onChange={(e) => setData(name, e.target.value)} required {...extra} />
        </Field>
    );

    return (
        <AuthLayout>
            <Head title="Sign up" />
            <h1 className="mb-2 text-[26px] font-bold">Create account</h1>

            <form onSubmit={submit}>
                {text('name', 'Full name', 'text', { autoComplete: 'name', autoFocus: true })}
                {text('email', 'Email', 'email', { autoComplete: 'username' })}
                {text('phone', 'Phone', 'tel', { autoComplete: 'tel' })}
                {text('password', 'Password', 'password', { autoComplete: 'new-password' })}
                {text('password_confirmation', 'Confirm password', 'password', { autoComplete: 'new-password' })}

                <Field label="I am a" id="role" error={errors.role}>
                    <select id="role" className={inputCls} value={data.role}
                        onChange={(e) => setData('role', e.target.value)}>
                        <option value="donor">Donor</option>
                        <option value="requester">Requester (patient / family)</option>
                        <option value="hospital">Hospital</option>
                    </select>
                </Field>

                {data.role === 'donor' && (
                    <Field label="Blood group" id="blood_group" error={errors.blood_group}>
                        <select id="blood_group" className={inputCls} value={data.blood_group}
                            onChange={(e) => setData('blood_group', e.target.value)}>
                            {bloodGroups.map((g) => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </Field>
                )}

                {text('city', 'City')}

                <PrimaryButton type="submit" disabled={processing}>Sign up</PrimaryButton>
            </form>

            <p className="mt-4 text-[13px] text-[#5B6068]">
                Already have an account?{' '}
                <Link href={route('login')} className="font-semibold text-[#B3261E] hover:underline">
                    Login
                </Link>
            </p>
        </AuthLayout>
    );
}
