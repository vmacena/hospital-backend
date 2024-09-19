import { PrismaClient } from "@prisma/client";

export class CancelAppointmentService{
    private prisma = new PrismaClient();

    async execute(appointmentId: number){
        if(!this.prisma.appointment.findUnique({where: {id: appointmentId}})){
            throw new Error("Appointment not found.");
        }

        const appointment = await this.prisma.appointment.delete({
            where: {
                id: appointmentId
            },
        });

        return appointment;
    }
}