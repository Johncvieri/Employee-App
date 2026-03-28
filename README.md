## Berikut adalah informasi dari penyelesaian Test untuk bagian developer

1. Terdapat 2 branch dalam repository ini frontend dan backend

2. Untuk Jabatan tidak memiliki fitur apapun selain hanya menampilkan data, maka di halaman jabatan hanya menggunakan data yang sudah ada dalam database

master_karyawan=# INSERT INTO t1_position (code, name, is_delete) VALUES
master_karyawan-# ('TESTER', 'Tester', 0),
master_karyawan-# ('HELPDESK', 'Helpdesk', 0),
master_karyawan-# ('PROGRAMMER', 'Programmer', 0),
master_karyawan-# ('DEVOPS', 'DevOps Engineer', 0),
master_karyawan-# ('QA', 'Quality Assurance', 0),
master_karyawan-# ('PM', 'Project Manager', 0);
INSERT 0 6
master_karyawan=# select * from t1_position;
 id |    code    | is_delete |       name
----+------------+-----------+-------------------
  1 | TESTER     |         0 | Tester
  2 | HELPDESK   |         0 | Helpdesk
  3 | PROGRAMMER |         0 | Programmer
  4 | DEVOPS     |         0 | DevOps Engineer
  5 | QA         |         0 | Quality Assurance
  6 | PM         |         0 | Project Manager
(6 rows)

3. Untuk Front End menggunakan React dan Styling Tailwind

4. Untuk Backend menggunakan Springboot

5. Untuk lemparan data menggunakan REST API dengan penanganan pencegahan CORS menggunakan Authorisasi basic token yang berintegrasi dengan sisi security back end

6. Menggunakan JPARepository untuk integrasi CRUD dengan penerapan HQL jika ada pemindahan database