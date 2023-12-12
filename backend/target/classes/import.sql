-- the password hash is generated by BCrypt Calculator Generator(https://www.dailycred.com/article/bcrypt-calculator)
INSERT INTO USERS (id, username, password, first_name, last_name, email, enabled, last_password_reset_date, avatar) VALUES (1, 'bruno.baumann@blind-jogging.ch', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Bruno', 'Baumann', 'bruno.baumann@blind-jogging.ch', true, '2017-10-01 21:58:58.508-07', 'assets/images/avatars/brian-hughes.jpg');
INSERT INTO USERS (id, username, password, first_name, last_name, email, enabled, last_password_reset_date, avatar) VALUES (2, 'justin.bauer@blind-jogging.ch', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Justin', 'Bauer', 'justin.bauer@blind-jogging.ch', true, '2017-10-01 18:57:58.508-07', 'assets/images/avatars/justin-bauer.JPEG');

INSERT INTO AUTHORITY (id, name) VALUES (1, 'ROLE_USER');
INSERT INTO AUTHORITY (id, name) VALUES (2, 'ROLE_ADMIN');

INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (1, 1);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (2, 1);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (2, 2);
