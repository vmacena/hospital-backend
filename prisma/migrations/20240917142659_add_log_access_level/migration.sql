/*
  Warnings:

  - Added the required column `accessLevel` to the `logAccess` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_logAccess" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adminId" INTEGER,
    "doctorId" INTEGER,
    "patientId" INTEGER,
    "userType" TEXT NOT NULL,
    "accessLevel" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "logAccess_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "logAccess_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "logAccess_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_logAccess" ("adminId", "doctorId", "id", "patientId", "timestamp", "userType") SELECT "adminId", "doctorId", "id", "patientId", "timestamp", "userType" FROM "logAccess";
DROP TABLE "logAccess";
ALTER TABLE "new_logAccess" RENAME TO "logAccess";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
