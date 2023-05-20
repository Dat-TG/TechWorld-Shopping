'use client';
import { signIn } from 'next-auth/react';
import { FormEventHandler, useState } from 'react';

export default function Login() {
    const [userInfo, setUserInfo] = useState({ phone: '', password: '' });
    const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
        // validate your userinfo
        e.preventDefault();

        const res = await signIn('credentials', {
            phone: userInfo.phone,
            password: userInfo.password,
        });

        console.log(res);
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
                <input type='submit' value='Login' />
            </form>
        </div>
    );
}
