/*
  Warnings:

  - You are about to drop the column `time` on the `appointment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_appointment" ("date", "doctorId", "id", "patientId", "status") SELECT "date", "doctorId", "id", "patientId", "status" FROM "appointment";
DROP TABLE "appointment";
ALTER TABLE "new_appointment" RENAME TO "appointment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
