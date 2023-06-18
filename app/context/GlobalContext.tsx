'use client';

import React, { createContext, useContext, useState } from 'react';
import { useSession } from 'next-auth/react';

interface ContextProps {
    user: any;
    myCart: any;
    setMyCart: React.Dispatch<React.SetStateAction<any>>;
    updateMyCart: () => Promise<void>;
}

const GlobalContext = createContext<ContextProps>({
    // user: {
    //     id: '',
    //     name: null,
    //     email: null,
    //     phone: '',
    //     password: '',
    //     role: 'ADMIN',
    //     imageId: '',
    //     address: ,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     verificationToken: [],
    //     emailVerified: null,
    //     phoneVerified: null,
    //     cartId: '',
    // },
    user: null,
    myCart: null,
    // myCart: {
    //     cartId: null,
    //     Product: {
    //         brandId: null,
    //         categoryId: null,
    //         createdAt: new Date(),
    //         description: null,
    //         id: '',
    //         name: '',
    //         price: 0,
    //         quantity: 0,
    //         sale: 0,
    //         slug: '',
    //         sold: 0,
    //         updatedAt: new Date(),
    //         attachments: [],
    //         category: null,
    //     },
    //     id: '',
    //     productId: null,
    //     quantity: 0,
    // },
    updateMyCart: async function () {
        return;
    },
    setMyCart: function (): void {
        return;
    },
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const session = useSession();
    const [myCart, setMyCart] = useState();
    const [user, setUser] = React.useState<any>();
    
    React.useEffect(() => {
        if (session.status == 'authenticated') {
            setUser(session.data?.user);
            if (session.data?.user != null) updateMyCart();
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
