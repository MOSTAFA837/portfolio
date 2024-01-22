"use server";

import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs";
import prismadb from "./prismadb";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) return redirectToSignIn();

  const mongoUser = await prismadb.user.findFirst({
    where: {
      clerkId: user.id,
    },
  });

  if (mongoUser) {
    return mongoUser;
  } else {
    const mongoUser = await prismadb.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
        firstName: user.firstName!,
        lastName: user.lastName!,
        photo: user.imageUrl,
      },
    });

    return mongoUser;
  }
};
