'use client';
import { useEffect, useState } from 'react';

export default function Time() {
    const [time, setTime] = useState('');
    useEffect(() => {
        const x = new Date();
        setTime(x.toLocaleString());
    }, []);
    return <div className='font-normal'>{time}</div>;
}
