# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#     * Rearrange models' order
#     * Make sure each model has one field with primary_key=True
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin.py sqlcustom [appname]'
# into your database.

from django.db import models



class Faculty(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=135)
    class Meta:
        db_table = u'faculty'
class Department(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=135)
    faculty = models.ForeignKey(Faculty, db_column='faculty')
    class Meta:
        db_table = u'department'
class Program(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=135, blank=True)
    class Meta:
        db_table = u'program'

class CourseGroup(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=180)
    program = models.ForeignKey(Program, db_column='program')
    course_group = models.ForeignKey('self', null=True, db_column='course_group', blank=True)
    class Meta:
        db_table = u'course_group'
class Course(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=300, blank=True)
    number = models.CharField(max_length=255)
    description = models.CharField(max_length=3600, blank=True)
    department = models.ForeignKey(Department, null=True, db_column='department', blank=True)
    groups=models.ManyToManyField(CourseGroup,through='GroupHasCourse')
    class Meta:
        db_table = u'course'

class AdjacencyList(models.Model):
    id=models.IntegerField(primary_key=True)
    course = models.ForeignKey(Course, db_column='course',related_name='adjacency_list_set')
    adj_course = models.ForeignKey(Course, db_column='adjacent_course',related_name='adjacency_list')
    class Meta:
        db_table = u'adjacency_list'






class GroupHasCourse(models.Model):
    course_group = models.ForeignKey(CourseGroup, db_column='course_group')
    course = models.ForeignKey(Course, db_column='course')
    class Meta:
        db_table = u'group_has_course'

class PrerequisiteGroup(models.Model):
    course = models.ForeignKey(Course, db_column='course',related_name='prerequiste_group_set')
    prerequisite = models.ForeignKey(Course, db_column='prerequisite',related_name='prereq_set')
    prerequisite_group = models.IntegerField(primary_key=True)
    concurrent = models.IntegerField()
    class Meta:
        db_table = u'prerequisite_group'

class ScheduleType(models.Model):
    id = models.IntegerField(primary_key=True)
    description = models.CharField(max_length=30)
    abbreviation = models.CharField(max_length=12)
    class Meta:
        db_table = u'schedule_type'

class Schedule(models.Model):
    id = models.IntegerField(primary_key=True)
    term = models.IntegerField()
    professor = models.CharField(max_length=360, blank=True)
    course = models.ForeignKey(Course, db_column='course')
    location = models.CharField(max_length=42)
    begin = models.TextField() # This field type is a guess.
    end = models.TextField() # This field type is a guess.
    days = models.CharField(max_length=120)
    schedule_type = models.ForeignKey(ScheduleType, db_column='schedule_type')
    class Meta:
        db_table = u'schedule'


class Student(models.Model):
    id = models.IntegerField(primary_key=True)
    student_id = models.CharField(max_length=135)
    name = models.CharField(max_length=135)
    family_name = models.CharField(max_length=135)
    password = models.CharField(max_length=135)
    status = models.IntegerField()
    courses=models.ManyToManyField(Course,through='StudentHasCourse')
    class Meta:
        db_table = u'student'

class StudentHasCourse(models.Model):
    student = models.ForeignKey(Student, db_column='student')
    course = models.ForeignKey(Course, db_column='course')
    class Meta:
        db_table = u'student_has_course'

