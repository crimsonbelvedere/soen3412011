INSERT INTO faculty (id,name) VALUES ('0','Engineering and Computer Science');

INSERT INTO department(id,name,faculty) VALUES ('0','Computer Science and Software Engineering','0');

INSERT INTO program (id,name) VALUES ('0','BEng in Software Engineering');

INSERT INTO Schedule_type (id, description, abbreviation) VALUES ('0', 'Lecture', 'Lect');
INSERT INTO Schedule_type (id, description, abbreviation) VALUES ('1', 'Lab', 'Lab');
INSERT INTO Schedule_type (id, description, abbreviation) VALUES ('2', 'Tutorial', 'Tut');

INSERT INTO course_group (id,name,program) VALUES ('0','Core Courses','0');
INSERT INTO course_group (id,name,program) VALUES ('1','Options','0');
INSERT INTO course_group (id,name,program) VALUES ('2','Electives','0');
INSERT INTO course_group (id,name,program,course_group) VALUES ('3','Engineering Core','0','0');
INSERT INTO course_group (id,name,program,course_group) VALUES ('4','Software Engineering Core','0','0');
INSERT INTO course_group (id,name,program,course_group) VALUES ('5','Computer Science Group','0','0');
INSERT INTO course_group (id,name,program,course_group) VALUES ('6','Basic Science Courses','0','0');
INSERT INTO course_group (id,name,program,course_group) VALUES ('7','Computer Games (CG) Option','0','1');
INSERT INTO course_group (id,name,program,course_group) VALUES ('8','Web Services and Applications (WSA) Option','0','1');
INSERT INTO course_group (id,name,program,course_group) VALUES ('9','Real-Time, Embedded, and Avionics Software (REA) Option','0','1');

