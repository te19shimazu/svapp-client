CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(255),
    role VARCHAR(100)
);

CREATE TABLE AttendanceRecords (
    record_id INT PRIMARY KEY,
    user_id INT,
    date DATE,
    time_in TIME,
    time_out TIME,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE WorkTimeManagement (
    record_id INT PRIMARY KEY,
    user_id INT,
    date DATE,
    worked_hours DECIMAL(5, 2),
    overtime_hours DECIMAL(5, 2),
    break_time DECIMAL(5, 2),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE INDEX idx_user_id ON Users(user_id);

CREATE INDEX idx_worktime_user_id ON WorkTimeManagement(user_id);
CREATE INDEX idx_worktime_date ON WorkTimeManagement(date);