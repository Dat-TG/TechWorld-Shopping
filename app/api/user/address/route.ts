import { getErrorMessage } from '@/utils/helper';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { createAddress, listAddresses } from '@/models/address';

/**
 * GET /api/user/address
 * Get all addresses of current user
 */
export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        }

        const addresses = await listAddresses(session.user.id);

        return NextResponse.json({
            message: 'success',
            data: addresses,
        });
    } catch (error: any) {
        console.log('Error getting addresses of user', getErrorMessage(error));

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}

/**
 * POST /api/user/address
 * Create a new address for current user
 */
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        }

        const { name, phone, area, address } = await request.json();
        if (!name || !phone || !area || !address) {
            return NextResponse.json(
                {
                    message: 'Missing name, phone, area or address',
                },
                { status: 400 },
            );
        }

        const addressData = await createAddress(session.user.id, name, phone, area, address);

        return NextResponse.json({
            message: 'success',
            data: addressData,
        });
    } catch (error: any) {
        console.log('Error creating address', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}
