import { connect } from 'mongoose'

export const dbConnect = async () => {
    try {
        const uri = process.env.DATABASE_URI;
        if (!uri) {
            throw new Error('DATABASE_URI is not defined');
        }
        await connect(uri, {
            dbName: process.env.DATABASE_NAME
        });
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        } else {
            console.log('An unknown error occurred');
        }
    }
}