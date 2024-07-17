import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { FormModule } from './form/form.module';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [PrismaModule, FormModule, DepartmentsModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
