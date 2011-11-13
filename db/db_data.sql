

	 



INSERT INTO faculty (description) VALUES ('Engineering and Computer Science');

INSERT INTO department(description,faculty) VALUES ('Computer Science and Software Engineering','1');

INSERT INTO program (description) VALUES ('BEng in Software Engineering');

INSERT INTO Schedule_type (description,abbreviation) VALUES ('Lecture','Lect');
INSERT INTO Schedule_type (description,abbreviation) VALUES ('Lab','Lab');
INSERT INTO Schedule_type (description,abbreviation) VALUES ('Tutorial','Tut');

INSERT INTO course_group (description,program) VALUES ('Core Courses','1');
INSERT INTO course_group (description,program) VALUES ('Options','1');
INSERT INTO course_group (description,program) VALUES ('Electives','1');
INSERT INTO course_group (description,program,course_group) VALUES ('Engineering Core','1','1');
INSERT INTO course_group (description,program,course_group) VALUES ('Software Engineering Core','1','1');
INSERT INTO course_group (description,program,course_group) VALUES ('Computer Science Group','1','1');
INSERT INTO course_group (description,program,course_group) VALUES ('Basic Science Courses','1','1');
INSERT INTO course_group (description,program,course_group) VALUES ('Computer Games (CG) Option','1','2');
INSERT INTO course_group (description,program,course_group) VALUES ('Web Services and Applications (WSA) Option','1','2');
INSERT INTO course_group (description,program,course_group) VALUES ('Real-Time, Embedded, and Avionics Software (REA) Option','1','2');


/** TO insert this you must have the courses info in the database **/
insert into group_has_course values(6,1)

