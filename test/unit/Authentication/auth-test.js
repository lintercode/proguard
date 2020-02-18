const test = require('tape')
const request = require("supertest");
const express = require("express");
const app = express();
const { Login } = require('../../../authentication/login/index')

app.use(express.urlencoded({ extended: false }));
app.use("/login", Login);

test("user can login", done => {
  request(app)
    .post('/login')
    .expect("Content-Type", '/application/x-www-form-urlencoded/')
    .expect({ username: 'eze', password: 'eze' })
    .expect(200, done)
    .end()
});
