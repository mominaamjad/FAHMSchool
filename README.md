# FAHM School System

## Overview
The FAHM School System is designed to streamline and manage the various functions of a school, including administration, teacher, and student activities. The system encompasses functionalities for managing classes, subjects, student registrations, fee statuses, examination marks, and more.

## Actors Involved
1. **Student**
2. **Teacher**
3. **Admin**

## Classes & Subjects Information
Classes range from Nursery to Class 8th. Each class has specific subjects as follows:

| Class      | Subjects                                                                                        |
|------------|-------------------------------------------------------------------------------------------------|
| Nursery    | English, Urdu, Math, Nazra-e-Quran                                                              |
| Prep       | English, Urdu, Math, Nazra-e-Quran, General Knowledge                                           |
| Class 1    | English, Urdu, Math, General Knowledge, Islamyat                                                |
| Class 2-3  | English, Urdu, Math, General Knowledge, Islamyat, Computer (Part 1, Part 2)                     |
| Class 4-5  | English, Urdu, Math, General Knowledge, Social Study, Islamyat, Computer (Part 1, Part 2)       |
| Class 6-8  | English, Urdu, Math, General Knowledge, Social Study, Islamyat, Computer (Part 1, Part 2), Quran|

## Marks Distribution
- **First and Midterm Examinations**:
  - Each subject: 50 marks
  - Computer Science Part 1: 35 marks
  - Computer Science Part 2: 15 marks

- **Final Term Examination**:
  - Each subject: 100 marks
  - Computer Science Part 1: 70 marks
  - Computer Science Part 2: 30 marks

## Admin Portal Functionality
- Single account for admin (Email and Password)
- **Class Management**:
  - Assign or remove a class to/from a teacher
- **Student Account Management**:
  - Create, view, edit, and delete student records
  - Information required: Registration Number, Date of Admission/Registration, Name, Date of Birth, Gender, Father's Details, Admission Class, Email & Password, Remarks
- **Fee Status Management**:
  - Insert, view, update, and delete fee status records
  - Information required: Registration, Student Name, Amount Due, Amount Paid, Payable Amount, Payment Date, Late Fees, Remarks
- **Report Management**:
  - View student age record report
  - View overall result sheet report
- **Timetable Management**:
  - Upload and remove the annual timetable (image format)
- **Syllabus Management**:
  - Upload and remove the syllabus for all classes (image format)
- **Report Download**:
  - Download reports in PDF format

## Teacher’s Portal Functionality
- Each teacher has individual login credentials (Email and Password)
- Assigned to a specific class by admin
- **Marks Management**:
  - View, search, insert, update, and delete marks for First, Midterm, and Final examinations
  - CRUD operations limited to their assigned class

## Student’s Portal Functionality
- Individual login credentials (Registration No and Password)
- **Marks Viewing**:
  - View marks for all subjects in First, Midterm, and Final examinations
  - View past academic records
- **Fee Status Viewing**:
  - View fee status (Paid/Unpaid) with payment dates and history
- **Timetable and Syllabus Viewing**:
  - View class timetable
  - View class syllabus

## Technologies Used
1. **React Native CLI**
2. **Firebase**
3. **Third-party packages**

## Getting Started
### Prerequisites
- Node.js
- React Native CLI
- Firebase account

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/mominaamjad/FAHMSchool.git
   ```
2. Install dependencies:
   ```sh
   cd fahmschool
   npm install
   ```
3. Set up Firebase:
   - Create a Firebase project and configure it with app.
   - Download the `google-services.json` file and place it in `android/app/`.

4. Start the development server:
   ```sh
   npm run android
   ```

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

## License
This project is licensed under the MIT License.
