import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Middleware to enable request body json parser
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

// Not found page
app.use((req: Request, res: Response) => {
    res.status(404).send('Page not found!');
});

// Server start
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});