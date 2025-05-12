-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "instructorId" TEXT,
    CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CompletedCourses_Student" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CompletedCourses_Student_A_fkey" FOREIGN KEY ("A") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CompletedCourses_Student_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StudentCourses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_StudentCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StudentCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CoursePrerequisites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CoursePrerequisites_A_fkey" FOREIGN KEY ("A") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CoursePrerequisites_B_fkey" FOREIGN KEY ("B") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_CompletedCourses_Student_AB_unique" ON "_CompletedCourses_Student"("A", "B");

-- CreateIndex
CREATE INDEX "_CompletedCourses_Student_B_index" ON "_CompletedCourses_Student"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentCourses_AB_unique" ON "_StudentCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentCourses_B_index" ON "_StudentCourses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CoursePrerequisites_AB_unique" ON "_CoursePrerequisites"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursePrerequisites_B_index" ON "_CoursePrerequisites"("B");
