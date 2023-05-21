import { NextResponse } from 'next/server';
import { Role, User, addUser, listUsers } from '../../../../models/user';

export async function POST(request: Request) {
    const { phone, password } = await request.json();

    const users = (await listUsers()) as User[];
    const user = users.find(user => user.phone === phone);
    if (user) {
        return NextResponse.json({ error: 'phone_already_exists' }, { status: 400 });
    }

    const newUser = {
        name: 'Hung',
        phone,
        password,
        role: Role.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
    } as User;

    await addUser(newUser);

    return NextResponse.json({ success: true });
}
