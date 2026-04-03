import db from '../database/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';

const generateToken = (id, role) => {
    const secret = process.env.JWT_SECRET || 'pochampally_secret_key_fallback';
    return jwt.sign({ id, role }, secret, {
        expiresIn: '30d',
    });
};

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await db('users').where({ email }).first();

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const usersList = await db('users').insert({
            name: name || email.split('@')[0],
            email,
            password: hashedPassword,
            role: role === 'ADMIN' ? 'ADMIN' : 'USER',
            is_verified: true
        }).returning('*');

        const user = Array.isArray(usersList) ? usersList[0] : usersList;

        if (user) {
            res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id, user.role),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('REGISTRATION ERROR:', error);
        res.status(500).json({ message: 'Server registration error', error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db('users').where({ email }).first();

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id, user.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('LOGIN ERROR DETAILS:', error);
        res.status(500).json({ 
            message: 'Server login error', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await db('users').where({ id: req.user.id }).select('id', 'name', 'email', 'role').first();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await db('users').select('id', 'name', 'email', 'role', 'created_at').orderBy('created_at', 'desc');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        const [updatedUser] = await db('users')
            .where({ id })
            .update({ name, email, role })
            .returning(['id', 'name', 'email', 'role', 'created_at']);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await db('users').where({ id }).del();
        if (!deletedRows) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const verifySignup = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        const record = await db('otps').where({ email, type: 'SIGNUP' }).orderBy('created_at', 'desc').first();
        
        if (!record) return res.status(400).json({ message: 'OTP not found or expired.' });

        if (record.attempts >= 3) {
            return res.status(400).json({ message: 'Max attempts reached. Please register again or request new OTP.' });
        }

        if (new Date() > new Date(record.expires_at)) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        if (record.otp_code !== otp.toString()) {
            await db('otps').where({ id: record.id }).increment('attempts', 1);
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        await db('users').where({ email }).update({ is_verified: true });
        await db('otps').where({ id: record.id }).del();

        const user = await db('users').where({ email }).first();

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id, user.role),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const verifyLogin = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        const record = await db('otps').where({ email, type: 'LOGIN' }).orderBy('created_at', 'desc').first();
        
        if (!record) return res.status(400).json({ message: 'Please try logging in again. OTP not found.' });

        if (record.attempts >= 3) {
            return res.status(400).json({ message: 'Max attempts reached. Please login again to request new OTP.' });
        }

        if (new Date() > new Date(record.expires_at)) {
            return res.status(400).json({ message: 'OTP has expired. Please login again.' });
        }

        // Allow master OTP (123456) for owner while email service is being fixed
        const isMasterOtp = (email === 'abrar@gmail.com' && otp === '123456');

        if (!isMasterOtp && record.otp_code !== otp.toString()) {
            await db('otps').where({ id: record.id }).increment('attempts', 1);
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        if (record) {
            await db('otps').where({ id: record.id }).del();
        }

        const user = await db('users').where({ email }).first();

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id, user.role),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const resendOtp = async (req, res) => {
    try {
        const { email, type } = req.body;
        const user = await db('users').where({ email }).first();

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        await db('otps').where({ email, type: type || 'LOGIN' }).del();

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60000);

        await db('otps').insert({
            email: user.email,
            otp_code: otpCode,
            type: type || 'LOGIN',
            expires_at: expiresAt
        });

        const subject = type === 'SIGNUP' ? 'Pochampally Ikkat - Resent Verification OTP' : 'Pochampally Ikkat - Resent Login OTP';
        
        sendEmail({
            email: user.email,
            subject: subject,
            html: `<h3>Your requested OTP</h3>
                   <p>Your new OTP is: <strong>${otpCode}</strong></p>
                   <p>This OTP is valid for 5 minutes. Do not share this with anyone.</p>`
        });

        res.json({ message: 'A new OTP has been sent to your email.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
