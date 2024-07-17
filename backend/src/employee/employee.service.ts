import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {

    constructor(private readonly prismaService: PrismaService) { }

    async createEmployee(form) {
        const readyForm = await this.prismaService.employee.create({
            data: {
                first_name: form.firstName,
                last_name: form.lastName,
                email_address: form.email,
                mobile_number: form.mobileNumber,
                gender: form.gender,
                nationality: form.nationality,
                address: form.address,
                city: {
                    connect: { city_id: 1 } 
                },
                state: {
                    connect: { state_id: 1 }
                },
                zip_code: form.zipCode,
                user_name: "user",
                employee_type: {
                    connect: { employee_type_id: 1 }
                },
                department: {
                    connect: { department_id: 1 } 
                },
                designation: form.designation,
                working_days: {
                    connect: { working_days_id: 1 } 
                },
                joining_date: form.joining_date,
                office_location: {
                    connect: { office_location_id: 1 }
                },
                user_photo: form.userPhoto,
            },
        });
        return readyForm;
    }
}