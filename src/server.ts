// import { server } from './app';
import dotenv from 'dotenv';

dotenv.config({path:'/.env'})

import { server } from "./app";

// const PORT = process.envprocess.env.PORT;
const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});