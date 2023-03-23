-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reminders" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "caseid" INTEGER NOT NULL,
    "task" TEXT NOT NULL,
    "summery" TEXT NOT NULL,
    "due_date" TIMESTAMP(3),

    CONSTRAINT "Reminders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Reminders" ADD CONSTRAINT "Reminders_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
