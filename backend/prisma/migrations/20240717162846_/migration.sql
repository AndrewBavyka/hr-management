-- CreateTable
CREATE TABLE "Employee" (
    "employee_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "mobile_number" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,
    "state_id" INTEGER NOT NULL,
    "zip_code" TEXT NOT NULL,
    "employee_type_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,
    "designation" TEXT NOT NULL,
    "working_days_id" INTEGER NOT NULL,
    "joining_date" TIMESTAMP(3) NOT NULL,
    "office_location_id" INTEGER NOT NULL,
    "user_photo" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "Documents" (
    "document_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "document_type" TEXT NOT NULL,
    "document_path" TEXT NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "AccountAccess" (
    "account_access_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "email_address" TEXT NOT NULL,
    "slack_id" TEXT NOT NULL,
    "skype_id" TEXT NOT NULL,
    "github_id" TEXT NOT NULL,

    CONSTRAINT "AccountAccess_pkey" PRIMARY KEY ("account_access_id")
);

-- CreateTable
CREATE TABLE "City" (
    "city_id" SERIAL NOT NULL,
    "city_name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "State" (
    "state_id" SERIAL NOT NULL,
    "state_name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("state_id")
);

-- CreateTable
CREATE TABLE "EmployeeType" (
    "employee_type_id" SERIAL NOT NULL,
    "type_name" TEXT NOT NULL,

    CONSTRAINT "EmployeeType_pkey" PRIMARY KEY ("employee_type_id")
);

-- CreateTable
CREATE TABLE "Department" (
    "department_id" SERIAL NOT NULL,
    "department_name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "WorkingDays" (
    "working_days_id" SERIAL NOT NULL,
    "days_per_week" INTEGER NOT NULL,

    CONSTRAINT "WorkingDays_pkey" PRIMARY KEY ("working_days_id")
);

-- CreateTable
CREATE TABLE "OfficeLocation" (
    "office_location_id" SERIAL NOT NULL,
    "location_name" TEXT NOT NULL,

    CONSTRAINT "OfficeLocation_pkey" PRIMARY KEY ("office_location_id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employee_type_id_fkey" FOREIGN KEY ("employee_type_id") REFERENCES "EmployeeType"("employee_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_working_days_id_fkey" FOREIGN KEY ("working_days_id") REFERENCES "WorkingDays"("working_days_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_office_location_id_fkey" FOREIGN KEY ("office_location_id") REFERENCES "OfficeLocation"("office_location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountAccess" ADD CONSTRAINT "AccountAccess_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
