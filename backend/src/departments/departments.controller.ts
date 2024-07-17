import { Body, Controller, Get, Post } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
    constructor(private readonly formService: DepartmentsService) { };


    @Post('new-department')
    createForm(@Body() form) {
        return this.formService.createDepartment(form);
    }

    @Get('all-departments')
    getAllForms() {
        return this.formService.getAllDepartments();
    }
}
