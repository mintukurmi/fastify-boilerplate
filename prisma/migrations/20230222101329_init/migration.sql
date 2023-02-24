-- CreateTable
CREATE TABLE "Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "post" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "author" INTEGER NOT NULL
);
