import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { currentUser } from "@/lib/queries";

const f = createUploadthing();

const auth = async () => {
  const user = await currentUser();
  return user;
};

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
      acl: "public-read",
    },
  })
    .middleware(async () => {
      const user = await auth();
      if (!user?.username) throw new UploadThingError("Unauthorized");
      return { slug: user.username, userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file =>", file);
      console.log("Upload complete for userId:", metadata.userId);

      return {
        siteSlug: metadata.slug,
        userId: metadata.userId,
        fileUrl: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
