'use client';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUserInfoStore } from '@/store/userInfoStore';
import { getStudents } from '@/features/api/team/student';

export function Table1({ data }) {
  if (!data || data.length === 0) return <p>No data available.</p>;

  const headers = Object.keys(data[0]);

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {headers.map((key) => (
            <th
              key={key}
              style={{
                border: '1px solid #ccc',
                padding: '8px',
                backgroundColor: '#f0f0f0',
              }}
            >
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {headers.map((key) => (
              <td
                key={key}
                style={{ border: '1px solid #ccc', padding: '8px' }}
              >
                {row[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const sampleData = [
  { name: 'Alice', age: 25, job: 'Engineer', city: 'New York' },
  { name: 'Bob', age: 30, job: 'Designer', city: 'San Francisco' },
  { name: 'Charlie', age: 22, job: 'Developer', city: 'Chicago' },
  { name: 'Diana', age: 35, job: 'Manager', city: 'Seattle' },
  { name: 'Ethan', age: 28, job: 'Analyst', city: 'Boston' },
];

export default function TablePage() {
  const { userInfo } = useUserInfoStore();

  const { data: students } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudents(),
  });

  useEffect(() => {
    console.log(students);
  }, [students]);

  // const [users, setUsers] = useState([]);
  //   // 목록 불러오기
  // const fetchStudents = () => {
  //   fetch('http://localhost:4002/users')
  //     .then(res => res.json())
  //     .then(data => setUsers(data));
  // };

  // useEffect(() => {
  //   fetchStudents();
  // }, []);

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      fetch('http://localhost:4002/users').then((res) => res.json()),
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>People Table</h1>
      <p>{userInfo.name}</p>
      {users && <Table1 data={users} />}
    </div>
  );
}
