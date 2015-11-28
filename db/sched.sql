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
user_name varchar(255) NOT NULL,
first_name varchar(255),
last_name varchar(255),
email varchar(255),
PRIMARY KEY (user_id)
);

CREATE TABLE appointment
(
appointment_id int NOT NULL AUTO_INCREMENT,
user_id int NOT NULL,
appointment_time date NOT NULL,
appointment_place varchar(255),
PRIMARY KEY (appointment_id)
);

CREATE TABLE admin
(
admin_id int NOT NULL AUTO_INCREMENT,
user_id int NOT NULL,
business_open time NOT NULL,
business_close time NOT NULL,
appointment_place varchar(255),
PRIMARY KEY (admin_id)
);

CREATE TABLE admin_hours
(
admin_hours_id int NOT NULL AUTO_INCREMENT,
admin_id int NOT NULL,
start_time time NOT NULL,
end_time time NOT NULL,
unavailable boolean,
day_of_week varchar(8),
PRIMARY KEY (admin_hours_id)
);