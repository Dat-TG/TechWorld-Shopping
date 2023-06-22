import { deleteCarousel, getCarousel, updateCarousel } from '@/models/carousel';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

export async function GET({ params }: { params: { id: string } }) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'Missing id' }, { status: 400 });
        }

        const carousel = await getCarousel(id);
        if (!carousel) {
            return NextResponse.json({ message: 'Carousel not found' }, { status: 400 });
        }
        return NextResponse.json({ message: 'success', data: carousel });
    } catch (error) {
        console.log('Error getting carousel', getErrorMessage(error));

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid carousel id' }, { status: 400 });
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

export async function PATCH(
    request: Request,
    {
        params,
    }: {
        params: { id: string };
    },
) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'Missing id' }, { status: 400 });
        }
        const { url, main, attachments } = await request.json();
        if (!url || !attachments) {
            return NextResponse.json(
                {
                    message: 'Missing url or attachments',
                },
                { status: 400 },
            );
        }
        const ok = main ? true : false;
        const carousel = await updateCarousel(id, attachments, url, ok);
        return NextResponse.json({ message: 'success', data: carousel });
    } catch (error) {
        console.log('Error updating carousel', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return NextResponse.json({ message: 'Carousel already exists' }, { status: 400 });
            }
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid carousel' }, { status: 400 });
            }
        }

        if (error === Error('Carousel not found')) {
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'Missing id' }, { status: 400 });
        }
        const carousel = await deleteCarousel(id);
        return NextResponse.json({ message: 'success', data: carousel });
    } catch (error) {
        console.log('Error deleting carousel', getErrorMessage(error));

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid carousel id' }, { status: 400 });
            }
            if (error.code === 'P2025') {
                return NextResponse.json({ message: 'Carousel not found' }, { status: 400 });
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
