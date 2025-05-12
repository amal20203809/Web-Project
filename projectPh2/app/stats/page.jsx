'use client';
import { useEffect, useState } from 'react';

export default function StatsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/stats/dashboard')
      .then(res => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <p style={{ padding: '2rem', fontSize: '1.2rem' }}>Loading stats...</p>;

  const sectionStyle = {
    marginBottom: '2rem',
    padding: '1rem',
    borderRadius: '10px',
    backgroundColor: '#f0f4f8',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const headingStyle = {
    color: '#2c3e50',
    marginBottom: '0.5rem'
  };

  const listItemStyle = {
    color: '#34495e',
    lineHeight: '1.6'
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', color: '#1abc9c' }}>Student Management Dashboard</h1>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>1. Top 3 Courses by Enrollment</h2>
        <ul>
          {stats.topCourses.map(c => (
            <li key={c.name} style={listItemStyle}>
              <strong>{c.name}</strong>: {c._count.studentsEnrolled} students
            </li>
          ))}
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>2. User Count by Role</h2>
        <ul>
          {stats.roleCounts.map(r => (
            <li key={r.role} style={listItemStyle}>
              <strong>{r.role}</strong>: {r._count.role}
            </li>
          ))}
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>3. Student Count per Course Category</h2>
        <ul>
          {stats.categoryCounts.map(cat => (
            <li key={cat.category} style={listItemStyle}>
              <strong>{cat.category}</strong>: {cat.students} students
            </li>
          ))}
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>4. Courses per Instructor</h2>
        <ul>
          {stats.courseCountPerInstructor.map(i => (
            <li key={i.name} style={listItemStyle}>
              <strong>{i.name}</strong>: {i._count.expertise} courses
            </li>
          ))}
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>5. Top Students by Completed Courses</h2>
        <ul>
          {stats.topStudents.map(s => (
            <li key={s.name} style={listItemStyle}>
              <strong>{s.name}</strong>: {s._count.completedCourses} completed
            </li>
          ))}
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>6. Courses with No Enrollments</h2>
        <ul>
          {stats.emptyCourses.map(c => (
            <li key={c.name} style={listItemStyle}>
              <strong>{c.name}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>7. System Summary</h2>
        <p style={listItemStyle}>Total Courses: <strong>{stats.summary.totalCourses}</strong></p>
        <p style={listItemStyle}>Total Students: <strong>{stats.summary.totalStudents}</strong></p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>8. Failure Count per Course</h2>
        <ul>
          {stats.failureStats.map(f => (
            <li key={f.courseId} style={listItemStyle}>
              <strong>{f.courseId}</strong>: {f.fails} failures
            </li>
          ))}
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>9. Most Common Prerequisite Courses</h2>
        <ul>
          {stats.topPrereqs.map(p => (
            <li key={p.id} style={listItemStyle}>
              <strong>{p.id}</strong>: used {p.count} times
            </li>
          ))}
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>10. Students Who Completed the Most Courses</h2>
        <ul>
          {stats.topCompleters.map(s => (
            <li key={s.name} style={listItemStyle}>
              <strong>{s.name}</strong>: {s._count.completedCourses} courses
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
