const cors = require('cors');
const allowedOrigins = [
  'https://ams-nu-gold.vercel.app', // production frontend URL
  'http://localhost:5173', // for local development
];

const corsOrigins = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // ✅ Allow credentials if needed
});

module.exports = { corsOrigins };
