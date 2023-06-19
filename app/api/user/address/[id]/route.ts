import { getErrorMessage } from '@/utils/helper';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { deleteAddress, updateAddress } from '@/models/address';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

/**
 * PATCH /api/user/address/:id
 * Create a new address for current user
 */
export async function PATCH(
    request: Request,
    {
        params,
    }: {
        params: { id: string };
    },
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        }
        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'Missing addressId' }, { status: 400 });
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

        const addressData = await updateAddress(session.user.id, id, name, phone, area, address);

        return NextResponse.json({
            message: 'success',
            data: addressData,
        });
    } catch (error) {
        console.log('Error updating address', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid addressId' }, { status: 400 });
            }
            if (error.code === 'P2025') {
                return NextResponse.json({ message: 'Address not found' }, { status: 400 });
            }
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}

/**
 * DELETE /api/user/address/:id
 * Delete an address of current user
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        }

        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'Missing addressId' }, { status: 400 });
        }
        const addressData = await deleteAddress(session.user.id, id);

        return NextResponse.json({
            message: 'success',
            data: addressData,
        });
    } catch (error) {
        console.log('Error deleting address', getErrorMessage(error));

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid addressId' }, { status: 400 });
            }
            if (error.code === 'P2017') {
                return NextResponse.json({ message: 'Address not found' }, { status: 400 });
            }
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}
