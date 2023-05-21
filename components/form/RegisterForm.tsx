'use client';
import { FormEventHandler, useState } from 'react';

export default function RegisterForm() {
    const [userInfo, setUserInfo] = useState({ phone: '', password: '' });
    const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
        // validate your userinfo
        e.preventDefault();

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: userInfo.phone,
                password: userInfo.password,
            }),
        });

        console.log(await res.json());
    };
    return (
        <div className='sign-in-form'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input
                    value={userInfo.phone}
                    onChange={({ target }) => setUserInfo({ ...userInfo, phone: target.value })}
                    type='phone'
                    placeholder='123'
                />
                <input
                    value={userInfo.password}
                    onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
                    type='password'
                    placeholder='********'
                />
                <input type='submit' value='Register' />
            </form>
        </div>
    );
}
