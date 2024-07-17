import { Body, Controller, Get, Post } from '@nestjs/common';
import { FormService } from './form.service';

@Controller('form')
export class FormController {

    constructor (private readonly formService: FormService) {};

    // @Get('getAll')
    // getAllForms() {
    //     return this.formService.getAllForms();
    // }

    // @Post('create')
    // createForm(@Body() form) {
    //     return this.formService.createForm(form);
    // }
}
