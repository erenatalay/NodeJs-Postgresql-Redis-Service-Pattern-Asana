-- DropForeignKey
ALTER TABLE "SubTask" DROP CONSTRAINT "SubTask_task_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assigned_to_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "SubTask" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "assigned_to" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
