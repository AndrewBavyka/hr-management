import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentsService {

    constructor(private readonly prismaService: PrismaService) { }

    async createDepartment(form) {
        const readyForm = await this.prismaService.department.create({
            data: {
                department_name: form.nameDepartment
            }
        });
        return readyForm;
    }

    async getAllDepartments() {
        const allData = await this.prismaService.department.findMany();
        return allData;
    }
    
}
