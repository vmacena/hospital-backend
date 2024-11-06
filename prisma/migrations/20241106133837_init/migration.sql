-- CreateTable
CREATE TABLE "AccessLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "level" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "record" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "accessLevelId" INTEGER NOT NULL,
    CONSTRAINT "admin_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "admin_accessLevelId_fkey" FOREIGN KEY ("accessLevelId") REFERENCES "AccessLevel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "doctor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "crm" TEXT NOT NULL,
    "nameDoctor" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "accessLevelId" INTEGER NOT NULL,
    CONSTRAINT "doctor_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "doctor_accessLevelId_fkey" FOREIGN KEY ("accessLevelId") REFERENCES "AccessLevel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "susNumber" BIGINT NOT NULL,
    "namePatient" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "accessLevelId" INTEGER NOT NULL,
    CONSTRAINT "patient_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "patient_accessLevelId_fkey" FOREIGN KEY ("accessLevelId") REFERENCES "AccessLevel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "logAccess" (
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

-- CreateTable
CREATE TABLE "appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "exam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "result" TEXT,
    CONSTRAINT "exam_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "exam_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessLevel_level_key" ON "AccessLevel"("level");

-- CreateIndex
CREATE UNIQUE INDEX "admin_record_key" ON "admin"("record");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_crm_key" ON "doctor"("crm");

-- CreateIndex
CREATE UNIQUE INDEX "patient_susNumber_key" ON "patient"("susNumber");

-- CreateIndex
CREATE UNIQUE INDEX "patient_email_key" ON "patient"("email");
