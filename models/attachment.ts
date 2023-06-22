/* eslint-disable camelcase */
import { Attachment, AttachmentType } from '@prisma/client';
import prisma from '../libs/prismadb';
import cloudinary from '@/libs/cloudinary';

export type AttachmentInput = {
    name: string;
    type: AttachmentType;
    path: string;
};

export const AttachmentNotFound = new Error('Attachment not found');

export async function listAttachments() {
    const attachments = await prisma.attachment.findMany();
    return attachments;
}

export async function createAttachment(data: string, type: AttachmentType) {
    const res = await cloudinary.v2.uploader.upload(data, {
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    const attachment = await prisma.attachment.create({
        data: {
            name: res.public_id,
            type: type,
            path: res.secure_url,
        },
    });

    return attachment;
}

export async function deleteAttachment(id: string) {
    const attachment = await prisma.attachment.delete({
        where: {
            id: id,
        },
    });

    cloudinary.v2.uploader.destroy(attachment.name);

    return attachment;
}

export async function createAttachments(attachments: string[]) {
    return await Promise.all(
        attachments.map(attachment => {
            return createAttachment(attachment, AttachmentType.IMAGE);
        }),
    );
}

export async function deleteAttachments(attachments: Attachment[]) {
    return await Promise.all(
        attachments.map(attachment => {
            return deleteAttachment(attachment.id);
        }),
    );
}
