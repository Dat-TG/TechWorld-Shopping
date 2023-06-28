import { listNotification } from '@/models/invoice';
import { getErrorMessage } from '@/utils/helper';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        }

        const notifications = await listNotification(session.user.id);
        return NextResponse.json({ message: 'success', data: notifications });
    } catch (error) {
        console.log('Error getting all notifications', getErrorMessage(error));

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}
