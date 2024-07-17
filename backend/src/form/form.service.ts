import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FormService {

    constructor(private readonly prismaService: PrismaService) { }

    // async getAllForms() {
    //     const forms = await this.prismaService.form.findMany();
    //     return forms;
    // }

    // async createForm(form) {
    //     const readyForm = await this.prismaService.form.create({
    //         data: form
    //     });
    //     return readyForm;
    // }
}
