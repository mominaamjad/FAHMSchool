import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_MEASUREMENT_ID,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
} from '@env';
import { initializeApp } from 'firebase/app';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    where,
    writeBatch
} from 'firebase/firestore';
import Teacher from '../models/teacher';
import Class from '../models/class';

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const loginTeacher = async (loginData) => {
    try {
        console.log(loginData.email);
        console.log(loginData.password);

        const teacherQuery = query(
            collection(db, 'teachers'),
            where('email', '==', loginData.email),
            where('password', '==', loginData.password)
        );
        const querySnapshot = await getDocs(teacherQuery);

        if (querySnapshot.empty) {
            throw new Error('Invalid email or password if wala eror');
        }

        const teacherDoc = querySnapshot.docs[0];
        const teacherData = teacherDoc.data();

        return new Teacher(
            teacherData.teacherName,
            teacherData.phoneNo,
            teacherData.address,
            teacherData.classRef,
            teacherData.email,
            teacherData.password,
        );
    } catch (error) {
        console.error('Error during login: cath error', error);
        throw error;
    }
};

export const viewSubjects = async (teacher) => {
    try {
        console.log(teacher.teacherName);
        console.log(teacher.classRef);

        const classQuery = query(
            collection(db, 'classes'),
            where('__name__', '==', teacher.classRef),
        );
        const querySnapshot = await getDocs(classQuery);

        if (querySnapshot.empty) {
            throw new Error('Invalid reuqest (querySnapshot empty)');
        }

        const classDoc = querySnapshot.docs[0];
        const classData = classDoc.data();

        const assignedClass = new Class(
            classData.assigned,
            classData.className,
            classData.subjects,
            classData.teacherId,
            classData.syllabus,
        );
        console.log("assignedClass", assignedClass.subjects);
        return assignedClass.subjects;
    } catch (error) {
        console.error('Error retrieving class data', error.message);
        throw error;
    }
};

export const fetchClassStudents = async (subject, classRef) => {
    try {
        console.log("class:", classRef);

        const studentQuery = query(
            collection(db, 'students'),
            where('currentClass', '==', classRef),
        );
        // console.log(classQuery);
        const studentSnapshot = await getDocs(studentQuery);
        console.log("studentSnapshot",studentSnapshot);

        if (studentSnapshot.empty) {
            // throw new Error('Invalid reuqest (querySnapshot empty)');
        }

        const studentList = studentSnapshot.docs.map(studentDoc => ({
            name: studentDoc.data().studentName,
            regNo: studentDoc.data().regNo,
        }));

        const marksQuery = query(
            collection(db, 'marks'),
            where('subjectRef', '==', subject.subjectId),
        );

        const marksSnapshot = await getDocs(marksQuery);
        console.log(marksSnapshot.docs);

        if (marksSnapshot.empty) {
            // console.warn('No marks found for the specified subject.');
        }

        const marksList = marksSnapshot.docs.map(markDoc => ({
            regNo: markDoc.data().studentRef,
            finals: markDoc.data().finals,
            firstTerm: markDoc.data().firstTerm,
            mids: markDoc.data().mids,
        }));

        const studentListWithMarks = studentList.map(student => {
            const studentMarks = marksList.find(mark => mark.regNo === student.regNo);
            console.log(studentMarks)
            return {
                // if there is no student ka marks record for this subject, just load zeros
                ...student,
                finals: studentMarks?.finals || "0",
                firstTerm: studentMarks?.firstTerm || "0",
                mids: studentMarks?.mids || "0",
            };
        });
        console.log("studentList:", studentListWithMarks);
        return studentListWithMarks;
    } catch (error) {
        // console.error('Error viewing All Student: ', error);
        // throw error;
    }
}

export const editMarks = async (students, subject) => {
    try {
        const batch = writeBatch(db);
        
        for (let i = 0; i < students.length; i++) {
            const marksQuery = query(
                collection(db, 'marks'),
                where('studentRef', '==', students[i].regNo),
                where('subjectRef', '==', subject.subjectId)
            );

            const marksSnapshot = await getDocs(marksQuery);

            const finals = parseInt(students[i].finals, 10);
            const firstTerm = parseInt(students[i].firstTerm, 10);
            const mids = parseInt(students[i].mids, 10);

            const result = ((firstTerm / subject.firstMid) * 25) + ((mids / subject.firstMid) * 25) + ((finals / subject.final) * 50);

            const newData = {
                studentRef: students[i].regNo,
                subjectRef: subject.subjectId,
                finals: students[i].finals,
                firstTerm: students[i].firstTerm,
                mids: students[i].mids,
                result: isNaN(result) ? '0' : result,
                year: new Date().getFullYear().toString()
            };
            console.log(newData);

            if (marksSnapshot.empty) {
                // Make new document for that subject
                const newDocRef = doc(collection(db, 'marks'));
                console.log(newData);
                batch.set(newDocRef, newData);
            } else {
                // Update existing documents
                marksSnapshot.forEach(doc => {
                    console.log(newData);
                    batch.update(doc.ref, newData);
                });
            }
        }

        await batch.commit();
        console.log('Marks updated successfully');
    } catch (error) {
        console.error('Error updating marks: ', error);
        throw error;
    }
};



// export const editMidMarks =()=>{
//     try {
//     } catch (error) {
//       console.error('Error viewing All Student: ', error);
//       throw error;
//     }
// }

// export const editFinalMarks =()=>{
//     try {
//     } catch (error) {
//       console.error('Error viewing All Student: ', error);
//       throw error;
//     }
// }

// export const deleteFirstTermMarks = ()=>{
//     try {
//     } catch (error) {
//       console.error('Error viewing All Student: ', error);
//       throw error;
//     }
// }

// export const deleteMidMarks =()=>{
//     try {
//     } catch (error) {
//       console.error('Error viewing All Student: ', error);
//       throw error;
//     }
// }

// export const deleteFinalMarks =()=>{
//     try {
//     } catch (error) {
//       console.error('Error viewing All Student: ', error);
//       throw error;
//     }
// }