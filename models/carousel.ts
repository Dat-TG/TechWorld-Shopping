import { Attachment, AttachmentType, Carousel } from '@prisma/client';
import prisma from '../libs/prismadb';
import { createAttachment, deleteAttachment } from './attachment';

export async function listCarousel(main?: boolean) {
    const res = await prisma.carousel.findMany({
        where: {
            main: { equals: main },
        },
        include: {
            image: true,
        },
    });
    return res;
}

export async function getCarousel(id: string) {
    const res = await prisma.carousel.findFirst({
        where: {
            id: id,
        },
    });
    return res;
}

export async function createCarousel(image: string, url: string, main: boolean) {
    const CarouselImage = await createAttachment(image, AttachmentType.IMAGE);
    const res = await prisma.carousel.create({
        data: {
            url: url,
            main: main,
            image: {
                connect: {
                    id: CarouselImage.id,
                },
            },
        },
    });
    return res;
}

export async function updateCarousel(id: string, image: string, url: string, main: boolean) {
    const carousel = await prisma.carousel.findUnique({
        where: {
            id: id,
        },
        include: {
            image: true,
        },
    });
    if (!carousel) {
        throw new Error('Carousel does not exist');
    }
    let carouselImage: Attachment | null = carousel.image;
    if (carouselImage?.path !== image) {
        if (carouselImage) {
            // delete old image
            deleteAttachment(carouselImage?.id);
        }
        // create new image
        carouselImage = await createAttachment(image, AttachmentType.IMAGE);
    }

    const newCarousel = await prisma.carousel.update({
        where: {
            id: id,
        },
        data: {
            url: url,
            main: main,
            image: {
                connect: {
                    id: carouselImage?.id,
                },
            },
        },
        include: {
            image: true,
        },
    });

    return newCarousel;
}

export async function deleteCarousel(id: string) {
    const res = await prisma.carousel.delete({
        where: {
            id: id,
        },
    });
    return res;
}

export type FullCarousel = Carousel & {
    image: Attachment | null;
};
