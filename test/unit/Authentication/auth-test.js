const test = require('tape')
const request = require('supertest')
const express = require('express')
const app = express()
const { logIn, logOut } = require('../../../authentication/index')

app.use(express.urlencoded({ extended: false }))
app.use('/login', logIn)

test('user can login', done => {
  request(app)
    .post('/login')
    .type('form')
    .send({ username: 'username', password: 'password' })
    .expect('Content-Type', '/application/x-www-form-urlencoded/')
    .expect({ username: 'eze', password: 'eze' })
    .expect(200, done)
    .end(function (err, res) { done() })
})
