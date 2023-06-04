import { Attachment, AttachmentType } from '@prisma/client';
import prisma from '../libs/prismadb';

export type AttachmentInput = {
    name: string;
    type: AttachmentType;
    path: string;
};

export async function listAttachments() {
    const attachments = await prisma.attachment.findMany();
    return attachments;
}

export async function addAttachments(attachments: Attachment[]) {
    const newAttachments = await prisma.attachment.createMany({
        data: attachments,
    });
    return newAttachments;
}
