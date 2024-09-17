import { PrismaClient } from "@prisma/client";
import { convertBigIntToString } from "../log/utils";

class FindAllPatientsService {

    private prisma = new PrismaClient();

    async execute(crm: string){
        const existingDoctor = await this.prisma.doctor.findUnique({
            where: {
              crm
            },
            include: {
                appointments: true,
                exams: true
            }
          });
      
          if (!existingDoctor) {
            throw new Error("Doctor with this crm does not exist.");
          }
        
        const patientsByAppointmentPromises = existingDoctor.appointments.map(appointment =>
          this.prisma.patient.findUnique({ where: { id: appointment.patientId } })
        );

        const patientsByExamPromises = existingDoctor.exams.map(exam =>
          this.prisma.patient.findUnique({ where: { id: exam.patientId } })
        );

        const patientsByAppointment = await Promise.all(patientsByAppointmentPromises);
        const patientsByExam = await Promise.all(patientsByExamPromises);

        const allPatients = [...patientsByAppointment, ...patientsByExam];
        const uniquePatients = allPatients.filter((patient, index, self) =>
          patient && self.findIndex(p => p?.id === patient.id) === index
        );

        var serializedPatients = convertBigIntToString(uniquePatients);

        console.log(serializedPatients);
        return serializedPatients;
    } 

}

export { FindAllPatientsService }