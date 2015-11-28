-- TODO: Foreign Keys (will add later once all agree on a design)

-- create user and password
CREATE USER 'howtote5_php'@'localhost' IDENTIFIED BY 'password';

-- create database named sched
create database howtote5_sched;
use howtote5_sched;

GRANT SELECT, CREATE, INSERT, DELETE, UPDATE, ALTER ON sched.* TO 'howtote5_php'@'localhost';

CREATE TABLE user
(
user_id int NOT NULL AUTO_INCREMENT,
name varchar(255) NOT NULL,
email varchar(255),
phone varchar(20),
PRIMARY KEY (user_id)
);

CREATE TABLE appointment
(
appointment_id int NOT NULL AUTO_INCREMENT,
day date NOT NULL,
appointment_time time NOT NULL,
location varchar(255),
user_id int NOT NULL,
PRIMARY KEY (appointment_id)
);

CREATE TABLE availability
(
availability_id int NOT NULL AUTO_INCREMENT,
start_time time NOT NULL,
end_time time NOT NULL,
day_of_week varchar(8),
unavailable boolean,
PRIMARY KEY (availability_id)
);