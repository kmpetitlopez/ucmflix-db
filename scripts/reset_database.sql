DROP DATABASE IF EXISTS ucmflix;
CREATE DATABASE ucmflix DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_bin;
DROP user 'ucmflix'@'%';
flush privileges;
CREATE USER 'ucmflix'@'%' IDENTIFIED BY 'ucmflix';
GRANT ALL PRIVILEGES ON ucmflix.* TO 'ucmflix'@'%' WITH GRANT OPTION;