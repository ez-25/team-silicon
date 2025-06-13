// student 의 crud 를 만든다.
import { get, post, put, patch, deleteFetch } from '@/features/api/team/coreTeam';


export const getStudents = () => get('/students');

export const createStudent = (student) => post(
    '/students',
    {
        body: JSON.stringify(student)
    }
);

export const deleteStudent = (id) => deleteFetch(`/students/${id}`);
