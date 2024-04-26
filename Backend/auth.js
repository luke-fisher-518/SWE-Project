const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');

const PBKDF2_ITERATIONS = 10000

const generateHash = (password, salt) => {
    return pbkdf2.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 128).toString();
}

const hashPassword = (password) => {
    const salt = crypto.randomBytes(128).toString('base64');
    const hash = generateHash(password, salt);

    return { salt, hash };
};

const validatePasswordHash = (password, passwordAttempt) => {
    const { hash, salt } = password;

    return hash === generateHash(passwordAttempt, salt);
};