'use client';

import React, { createContext, useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import { MyCart } from '@/models/product';

interface ContextProps {
    user?: any;
    myCart?: MyCart;
    setMyCart?: any;
    updateMyCart?: () => Promise<void>;
}

const GlobalContext = createContext<ContextProps>({
    
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const session = useSession();
    const [myCart, setMyCart] = useState<MyCart>();
    const [user, setUser] = useState<any>();

    React.useEffect(() => {
        if (session.status == 'authenticated') {
            setUser(session?.data?.user);
            updateMyCart();
        }
    }, [session.data?.user]);

    async function updateMyCart() {
        try {
            const res = await fetch('/api/user/cart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            setMyCart(data?.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                user: user,
                myCart: myCart,
                setMyCart: setMyCart,
                updateMyCart: updateMyCart,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
