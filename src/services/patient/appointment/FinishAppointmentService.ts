import { PrismaClient } from "@prisma/client";

export class FinishAppointmentService{
    private prisma = new PrismaClient();

    async execute(appointmentId: number){
        if(!this.prisma.appointment.findUnique({where: {id: appointmentId}})){
            throw new Error("Appointment not found.");
        }
        
        const appointment = await this.prisma.appointment.update({
            where: {
                id: appointmentId
            },
            data: {	
                status: "Finished"
            }
        });

        return appointment;
    }
}