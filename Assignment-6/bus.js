
const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/TransportDB');
    console.log('MongoDB connected');

    const busSchema = new mongoose.Schema({
        busNo: String,
        route: String,
        totalSeats: Number,
        availableSeats: Number
    });

    const Bus = mongoose.model('Bus', busSchema);

    await Bus.deleteMany({});

    await Bus.insertMany([
        { busNo: 'B101', route: 'Vizag to Vijayawada', totalSeats: 40, availableSeats: 25 },
        { busNo: 'B102', route: 'Vizag to Hyderabad', totalSeats: 45, availableSeats: 18 },
        { busNo: 'B103', route: 'Vizag to Chennai', totalSeats: 35, availableSeats: 30 }
    ]);
    console.log('Three buses inserted');

    const buses = await Bus.find({ availableSeats: { $gt: 20 } });
    console.log('Buses with more than 20 available seats:', buses);

    await Bus.updateOne(
        { busNo: 'B102' },
        { $set: { availableSeats: 15 } }
    );
    console.log('B102 updated');

    await Bus.deleteOne({ busNo: 'B103' });
    console.log('B103 deleted');

    const finalBuses = await Bus.find();
    console.log('Final bus records:', finalBuses);

    await mongoose.disconnect();
}

main().catch(console.error);
