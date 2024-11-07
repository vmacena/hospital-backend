-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "record" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "picture_url" TEXT NOT NULL DEFAULT '',
    "accessLevelId" INTEGER NOT NULL,
    CONSTRAINT "admin_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "admin_accessLevelId_fkey" FOREIGN KEY ("accessLevelId") REFERENCES "AccessLevel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_admin" ("accessLevelId", "addressId", "id", "record") SELECT "accessLevelId", "addressId", "id", "record" FROM "admin";
DROP TABLE "admin";
ALTER TABLE "new_admin" RENAME TO "admin";
CREATE UNIQUE INDEX "admin_record_key" ON "admin"("record");
CREATE TABLE "new_doctor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "crm" TEXT NOT NULL,
    "nameDoctor" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "picture_url" TEXT NOT NULL DEFAULT '',
    "accessLevelId" INTEGER NOT NULL,
    CONSTRAINT "doctor_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "doctor_accessLevelId_fkey" FOREIGN KEY ("accessLevelId") REFERENCES "AccessLevel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_doctor" ("accessLevelId", "addressId", "crm", "id", "nameDoctor", "specialty") SELECT "accessLevelId", "addressId", "crm", "id", "nameDoctor", "specialty" FROM "doctor";
DROP TABLE "doctor";
ALTER TABLE "new_doctor" RENAME TO "doctor";
CREATE UNIQUE INDEX "doctor_crm_key" ON "doctor"("crm");
CREATE TABLE "new_patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "susNumber" BIGINT NOT NULL,
    "namePatient" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "picture_url" TEXT NOT NULL DEFAULT '',
    "accessLevelId" INTEGER NOT NULL,
    CONSTRAINT "patient_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "patient_accessLevelId_fkey" FOREIGN KEY ("accessLevelId") REFERENCES "AccessLevel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_patient" ("accessLevelId", "addressId", "email", "id", "namePatient", "susNumber") SELECT "accessLevelId", "addressId", "email", "id", "namePatient", "susNumber" FROM "patient";
DROP TABLE "patient";
ALTER TABLE "new_patient" RENAME TO "patient";
CREATE UNIQUE INDEX "patient_susNumber_key" ON "patient"("susNumber");
CREATE UNIQUE INDEX "patient_email_key" ON "patient"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
