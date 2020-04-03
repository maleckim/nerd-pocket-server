INSERT INTO pocket_users (user_name, password)
VALUES
('Test', 'Test'),
('Matthew', 'Mattyjay18');

INSERT INTO user_notecards (user_id, subject, question, answer)
VALUES
(1, 'Physics', 'What is the equation for terminal velocity','v = the square root of ((2*m*g)/(p*A*C))'),
(1, 'Biology', 'What is natural selection', 'The weak die'),
(1, 'Physiology', 'What is the input/output of the sodium potassium pump','3 sodium out 2 potassium in'),
(1, 'Test', 'Test', 'Test');

INSERT INTO user_notes (user_id, subject, topic, content)
VALUES
(1, 'Physics', 'Equations', 'e=mc^2'),
(1, 'Biology', 'Virus', 'single stranded mRNA'),
(1, 'Computer Science', 'Memory', 'The number of bytes occupied by each floating-point data type is 
implementation-defined..'),
(1, 'Biology', 'Test', 'Test');

INSERT INTO user_deadlines (user_id, deadline, task)
VALUES
(1, '09 Apr 2020', 'Finish App');



