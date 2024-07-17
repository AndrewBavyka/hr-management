import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {

    constructor(private readonly employeeService: EmployeeService) {}
    
    @Post('personal-info')
    createForm(@Body() form) {
        return this.employeeService.createEmployee(form);
    }
}
