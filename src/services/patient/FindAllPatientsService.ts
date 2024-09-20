import { PrismaClient } from "@prisma/client";
import { convertBigIntToString } from "../../services/log/utils";

const prisma = new PrismaClient();

class FindAllPatientsService {
    async execute() {
        try {
            const patients = await prisma.patient.findMany({
                include: {
                    accessLevel: true,
                },
            });

            const serializedPatients = convertBigIntToString(patients);

            return serializedPatients;
        } catch (error) {
            throw new Error(`Erro ao buscar pacientes: ${(error as Error).message}`);
        }
    }
}

export { FindAllPatientsService };