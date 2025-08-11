const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

// MongoDB connection with advanced options and event listeners
mongoose.connect('mongodb://localhost:27017/auth-system', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected!');
});
mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected!');
});

const app = express();

// Security and performance middlewares
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

app.use(helmet()); // Adds security headers
app.use(morgan('dev')); // Logs HTTP requests
app.use(cors()); // Enables CORS

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/Assets', express.static(path.join(__dirname, 'Assets')));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});
const User = mongoose.model('User', UserSchema);

// Sign Up Route
app.get('/', (req, res) => {
    res.render('index',  { cookies: req.cookies });
console.log( req.cookies.token)
});

app.get('/template', (req, res) => {
    res.render('option');

});
app.get('/resume1', (req, res) => {
    res.render('resume');

});
app.get('/resume2', (req, res) => {
    res.render('resume2');

});
app.get('/auth', (req, res) => {
    res.render('auth');

});
app.get('/logout', (req, res) => {
    res.clearCookie('token');

    res.redirect('/')

})
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name)
    console.log(email)
    console.log(password)

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true })
        res.redirect('/')
        console.log("sign")

    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
});


// Sign In Route
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true })
    console.log("login")
    res.redirect('/')

});

// Server listening
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
