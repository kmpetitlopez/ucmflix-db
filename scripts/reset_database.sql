DROP DATABASE IF EXISTS ucmflix_test;
CREATE DATABASE ucmflix_test DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_bin;
GRANT ALL PRIVILEGES ON ucmflix_test.* To 'ucmflix_test'@'%' IDENTIFIED BY 'ucmflix_test';

