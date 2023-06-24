import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { InvalidStatus, InvoiceNotFound, getInvoiceById, updateInvoice } from '@/models/invoice';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

/**
 * PATCH /api/invoice/:id
 * Update an invoice by id (only status)
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        }

        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'Missing id' }, { status: 400 });
        }
        const { status } = await request.json();
        if (!status) {
            return NextResponse.json({ message: 'Missing status' }, { status: 400 });
        }
        const invoice = await updateInvoice(id, status);
        return NextResponse.json({ message: 'success', data: invoice });
    } catch (error) {
        console.log('Error updating invoice', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid invoiceId' }, { status: 400 });
            }
        }

        if (error === InvalidStatus) {
            return NextResponse.json({ message: getErrorMessage(error) }, { status: 400 });
        }

        if (error === InvoiceNotFound) {
            return NextResponse.json({ message: getErrorMessage(error) }, { status: 400 });
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        console.log(id);
        const session = await getServerSession();
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        }
        if (!id) {
            return NextResponse.json({ message: 'Missing id' }, { status: 400 });
        }
        const invoice = await getInvoiceById(id);
        return NextResponse.json({ message: 'success', data: invoice });
    } catch (err) {
        console.log(err);
    }
}
