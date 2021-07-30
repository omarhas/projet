import express from 'express'
import bodyParser from 'body-parser'
import connectDB from './config/db.js'
import { NotFound, errorHandler } from './middleware/errorMiddleware.js'
import user from './routes/user.js'
import cars from './routes/cars.js'
import expenses from './routes/expenses.js'
import agency from './routes/agency.js'
import contract from './routes/contract.js'
import calendar from './routes/calendar.js'

const app = express();

app.use(bodyParser.json())

//connect DataBase
connectDB();

//Init Middleware 
app.use(express.json({ extended: false }));


//Define routes
app.use('/api/users', user);
app.use('/api/cars', cars);
app.use('/api/expenses', expenses);
app.use('/api/agency', agency)
app.use('/api/contrat', contract)
app.use('/api/calendrier', calendar)

app.use(NotFound)
app.use(errorHandler)

const port = 5000;

app.listen(port, () => console.log(`server started on port ${port}`));