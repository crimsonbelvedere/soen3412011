SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

CREATE SCHEMA IF NOT EXISTS `soen341` DEFAULT CHARACTER SET utf8 ;
USE `soen341` ;

-- -----------------------------------------------------
-- Table `soen341`.`Faculty`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soen341`.`Faculty` ;

CREATE  TABLE IF NOT EXISTS `soen341`.`Faculty` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `description` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soen341`.`Department`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soen341`.`Department` ;

CREATE  TABLE IF NOT EXISTS `soen341`.`Department` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `description` VARCHAR(45) NOT NULL ,
  `faculty` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Department_Faculty1` (`faculty` ASC) ,
  CONSTRAINT `fk_Department_Faculty1`
    FOREIGN KEY (`faculty` )
    REFERENCES `soen341`.`Faculty` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soen341`.`Course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soen341`.`Course` ;

CREATE  TABLE IF NOT EXISTS `soen341`.`Course` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `title` VARCHAR(100) NULL ,
  `number` VARCHAR(200) NOT NULL ,
  `description` VARCHAR(1200) NULL ,
  `department` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_CourseType_Department1` (`department` ASC) ,
  CONSTRAINT `fk_CourseType_Department1`
    FOREIGN KEY (`department` )
    REFERENCES `soen341`.`Department` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soen341`.`Schedule_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soen341`.`Schedule_type` ;

CREATE  TABLE IF NOT EXISTS `soen341`.`Schedule_type` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `description` VARCHAR(10) NOT NULL ,
  `abbreviation` VARCHAR(4) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soen341`.`Schedule`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soen341`.`Schedule` ;

CREATE  TABLE IF NOT EXISTS `soen341`.`Schedule` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `term` INT NOT NULL ,
  `professor` VARCHAR(120) NULL ,
  `course` INT NOT NULL ,
  `location` VARCHAR(14) NOT NULL ,
  `begins` TIME NOT NULL ,
  `ends` TIME NOT NULL ,
  `days` VARCHAR(40) NOT NULL ,
  `schedule_type` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Section_Course1` (`course` ASC) ,
  INDEX `fk_Schedule_ScheduleType1` (`schedule_type` ASC) ,
  CONSTRAINT `fk_Section_Course1`
    FOREIGN KEY (`course` )
    REFERENCES `soen341`.`Course` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Schedule_ScheduleType1`
    FOREIGN KEY (`schedule_type` )
    REFERENCES `soen341`.`Schedule_type` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soen341`.`Prerequisite_group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soen341`.`Prerequisite_group` ;

CREATE  TABLE IF NOT EXISTS `soen341`.`Prerequisite_group` (
  `course` INT NOT NULL ,
  `prerequisite` INT NOT NULL ,
  `prerequisite_group` INT NOT NULL ,
  `concurrent` TINYINT(1)  NOT NULL ,
  INDEX `fk_Course_has_Prerequisites_Course1` (`course` ASC) ,
  INDEX `fk_Course_has_Prerequisites_Course2` (`prerequisite` ASC) ,
  PRIMARY KEY (`prerequisite_group`, `prerequisite`, `course`) ,
  CONSTRAINT `fk_Course_has_Prerequisites_Course1`
    FOREIGN KEY (`course` )
    REFERENCES `soen341`.`Course` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Course_has_Prerequisites_Course2`
    FOREIGN KEY (`prerequisite` )
    REFERENCES `soen341`.`Course` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soen341`.`Program`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soen341`.`Program` ;

CREATE  TABLE IF NOT EXISTS `soen341`.`Program` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `description` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soen341`.`Course_group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soen341`.`Course_group` ;

CREATE  TABLE IF NOT EXISTS `soen341`.`Course_group` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `description` VARCHAR(60) NOT NULL ,
  `program` INT NOT NULL ,
  `course_group` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Group_Program1` (`program` ASC) ,
  INDEX `fk_Course_group_Course_group1` (`course_group` ASC) ,
  CONSTRAINT `fk_Group_Program1`
    FOREIGN KEY (`program` )
    REFERENCES `soen341`.`Program` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Course_group_Course_group1`
    FOREIGN KEY (`course_group` )
    REFERENCES `soen341`.`Course_group` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soen341`.`Student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soen341`.`Student` ;

CREATE  TABLE IF NOT EXISTS `soen341`.`Student` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `student_id` VARCHAR(45) NOT NULL ,
  `first_name` VARCHAR(45) NOT NULL ,
  `last_name` VARCHAR(45) NOT NULL ,
  `password` VARCHAR(45) NOT NULL ,
  `status` TINYINT(1)  NOT NULL ,
  `program` INT NOT NULL ,
  `program_option` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Student_Program1` (`program` ASC) ,
  INDEX `fk_Student_Course_group1` (`program_option` ASC) ,
  CONSTRAINT `fk_Student_Program1`
    FOREIGN KEY (`program` )
    REFERENCES `soen341`.`Program` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Student_Course_group1`
    FOREIGN KEY (`program_option` )
    REFERENCES `soen341`.`Course_group` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soen341`.`Adjacency_list`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soen341`.`Adjacency_list` ;

CREATE  TABLE IF NOT EXISTS `soen341`.`Adjacency_list` (
  `course` INT NOT NULL ,
  `adjacent_course` INT NOT NULL ,
  INDEX `fk_AdjacencyList_Course1` (`course` ASC) ,
  INDEX `fk_AdjacencyList_Course2` (`adjacent_course` ASC) ,
  PRIMARY KEY (`course`, `adjacent_course`) ,
  CONSTRAINT `fk_AdjacencyList_Course1`
    FOREIGN KEY (`course` )
    REFERENCES `soen341`.`Course` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_AdjacencyList_Course2`
    FOREIGN KEY (`adjacent_course` )
    REFERENCES `soen341`.`Course` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soen341`.`Group_has_course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soen341`.`Group_has_course` ;

CREATE  TABLE IF NOT EXISTS `soen341`.`Group_has_course` (
  `course_group` INT NOT NULL ,
  `course` INT NOT NULL ,
  PRIMARY KEY (`course_group`, `course`) ,
  INDEX `fk_Group_has_Course_Course1` (`course` ASC) ,
  INDEX `fk_Group_has_Course_Group1` (`course_group` ASC) ,
  CONSTRAINT `fk_Group_has_Course_Group1`
    FOREIGN KEY (`course_group` )
    REFERENCES `soen341`.`Course_group` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Group_has_Course_Course1`
    FOREIGN KEY (`course` )
    REFERENCES `soen341`.`Course` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soen341`.`Student_has_course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soen341`.`Student_has_course` ;

CREATE  TABLE IF NOT EXISTS `soen341`.`Student_has_course` (
  `student` INT NOT NULL ,
  `course` INT NOT NULL ,
  PRIMARY KEY (`student`, `course`) ,
  INDEX `fk_Student_has_Course_Course1` (`course` ASC) ,
  INDEX `fk_Student_has_Course_Student1` (`student` ASC) ,
  CONSTRAINT `fk_Student_has_Course_Student1`
    FOREIGN KEY (`student` )
    REFERENCES `soen341`.`Student` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Student_has_Course_Course1`
    FOREIGN KEY (`course` )
    REFERENCES `soen341`.`Course` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
