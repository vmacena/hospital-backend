import { PrismaClient } from "@prisma/client";

export class UpdateAppointmentDateService{
    private prisma = new PrismaClient();

    async execute(appointmentId: number, newDate: string){
        if(!this.prisma.appointment.findUnique({where: {id: appointmentId}})){
            throw new Error("Appointment not found.");
        }
        const appointment = await this.prisma.appointment.update({
            where: {
                id: appointmentId
            },
            data: {
                date: newDate
            }
        });

        return appointment;
    }
}