import { PrismaClient } from "@prisma/client";

export class CreateAppointmentService{
    private prisma = new PrismaClient();
    
    public async execute(crm: string, susNumber: bigint, datetime: string){
                const doctor = await this.prisma.doctor.findFirst({
            where: {
                crm: crm
            }
        });

        if(!doctor){
            throw new Error('Doctor not found');
        }

        const patient = await this.prisma.patient.findFirst({
            where: {
                susNumber: susNumber
            }
        });

        if(!patient){
            throw new Error('Patient not found');
        }

        const appointment = await this.prisma.appointment.create({
            data: {
                date: new Date(datetime),
                patientId: patient.id,
                doctorId: doctor.id,
                status: "Created"
            }
        });

        return appointment;
    }
}
