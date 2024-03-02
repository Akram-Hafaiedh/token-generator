import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import cors from 'cors';
// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from app')
})
app.post('/generate-token',  (req: Request, res: Response, next: NextFunction) => {

    try {
        const payload = {
            data: req.body.data
        }
        const secret = process.env.SECRET || 'secret';
        const options = {
            expiresIn: '1h'
        }

        const token =  jwt.sign(payload, secret, options);

        res.status(200).json({ "status": "success", "message": `Token generated from ${payload.data}`, "token": token });
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            res.status(401).json({ "status": "error", "message": error.message });
        } else if (error instanceof TokenExpiredError) {
            res.status(401).json({ "status": "error", "message": error.message });
        } else {
            next(error);
        }
    }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ "status": "error", "message": err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

