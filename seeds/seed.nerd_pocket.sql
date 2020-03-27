INSERT INTO pocket_users (user_name, password)
VALUES
('Admin', 'Admin1'),
('Matthew', 'Mattyjay18');

INSERT INTO user_notecards (user_id, subject, question, answer)
VALUES
(2, 'Physics', 'What is the equation for terminal velocity','v = the square root of ((2*m*g)/(p*A*C))'),
(2, 'Biology', 'What is natural selection', 'The weak die'),
(1, 'Test', 'Test', 'Test');

INSERT INTO user_notes (user_id, subject, topic, content)
VALUES
(2, 'Physics', 'Equations', 'e=mc^2'),
(2, 'Biology', 'Virus', 'single stranded mRNA'),
(2, 'Biology', 'Test', 'Test');



