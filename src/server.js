import app from './app.js';
import config from './config/Config.js';
import database from './config/Database.js';

const startServer = async () => {
    await database.connect();

    const PORT = config.get('PORT');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
