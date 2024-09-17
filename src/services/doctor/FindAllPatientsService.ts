import { PrismaClient } from "@prisma/client";

class FindAllPatientsService {

    private prisma = new PrismaClient();

    async execute(crm: string){
        const existingDoctor = await this.prisma.doctor.findUnique({
            where: {
              crm
            },
            include: {
                appointments: true
            }
          });
      
          if (!existingDoctor) {
            throw new Error("Doctor with this crm does not exist.");
          }
        
        const patients = existingDoctor.appointments
        .map(appointment => this.prisma.patient.findUnique({where: {id: appointment.patientId}}))
        .filter((value, index, self) => self.indexOf(value) === index)

        return patients;
    } 

}

export { FindAllPatientsService }