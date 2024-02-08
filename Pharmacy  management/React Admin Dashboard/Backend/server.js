const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Types.ObjectId;



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Add-Medicine', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

const medicineSchema = new mongoose.Schema({
  pharmacyId:{type:String,required:true},
  medicineName: { type: String, required: true },
  genericName: { type: String, required: true },
  suppliersName: { type: String, required: true },
  date: { type: Date },
  expireDate: { type: Date, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Medicine = mongoose.model('Medicine', medicineSchema);

// Route to fetch all medicines with optional filter
app.get('/api/medicine', async (req, res) => {
  try {
    let filter = {};
    if (req.query.filter) {
      filter = JSON.parse(req.query.filter);
    }
    
    const medicines = await Medicine.find(filter);
    res.json({ success: true, medicines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to add a new medicine
app.post('/api/medicine/add', async (req, res) => {
  console.log(req.body.pharmacyId);
  try {
    const {
      pharmacyId,
      medicineName,
      genericName,
      suppliersName,
      date,
      expireDate,
      quantity,
      price,
    } = req.body;

    const medicine = new Medicine({
      pharmacyId,
      medicineName,
      genericName,
      suppliersName,
      date,
      expireDate,
      quantity,
      price,
    });

    await medicine.save();
    res.json({ success: true, message: 'Medicine added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to update a medicine
app.put('/api/medicine/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMedicine = await Medicine.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, medicine: updatedMedicine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to delete a medicine
app.delete('/api/medicine/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Medicine.findByIdAndDelete(id);
    res.json({ success: true, message: 'Medicine deleted successfully' });
  } catch (error) {
    console.error(error);

    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});









app.get('/api/medicine/search/:name', async (req, res) => {
  try {
    const { name } = req.params;

    // Using a case-insensitive regular expression for the search
    const medicines = await Medicine.find({ medicineName: { $regex: new RegExp(name, 'i') } });

    if (medicines.length === 0) {
      res.json({ success: true, message: 'No medicines found with the given name' });
    } else {
      res.json({ success: true, medicines });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error searching for medicines' });
  }
});



// supplier  server  
const supplierSchema = new mongoose.Schema({
  pharmacyId:{type:String,required:true},
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  
});

const Supplier = mongoose.model('Supplier', supplierSchema);

// Route to fetch all suppliers
app.get('/api/supplier', async (req, res) => {
  try {
    const pharmacyId = req.params.pharmacyId;
    const suppliers = await Supplier.find( pharmacyId);
    res.json({ success: true, suppliers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to add a new supplier
app.post('/api/supplier/add', async (req, res) => {
  try {
    const {pharmacyId, name, email, contactNumber, address } = req.body;

    const supplier = new Supplier({
      pharmacyId,
      name,
      email,
      contactNumber,
      address,
      
    });

    await supplier.save();
    res.json({ success: true, message: 'Supplier added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



// Route to update a supplier
// const { ObjectId } = mongoose.Types;

// ...
app.put('/api/supplier/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSupplier = await Supplier.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, supplier: updatedSupplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
// Route to delete a supplier
app.delete('/api/supplier/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Supplier.findByIdAndDelete(id);
    res.json({ success: true, message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});




const userSchema = new mongoose.Schema({
  pharmacyName: { type: String, required: true },
  ownerName: { type: String, required: true },
  pharmacyLicenseNumber: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, default: 'pending' }, // 'pending', 'approved', 'rejected'
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
  try {
    const {
      pharmacyId,
      pharmacyName,
      ownerName,
      pharmacyLicenseNumber,
      location,
      email,
      contactNumber,
      username,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      pharmacyId,
      pharmacyName,
      ownerName,
      pharmacyLicenseNumber,
      location,
      email,
      contactNumber,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error during registration' });
  }
});

app.get('/api/pharmacies', async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const pharmacies = await User.find(query, '-password');
    res.json(pharmacies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error while fetching pharmacies' });
  }
});



app.put('/api/pharmacies/:id/approve', async (req, res) => {
  try {
    const pharmacyId = req.params.id;
    const { status } = req.body;

    await User.findByIdAndUpdate(pharmacyId, { status });

    res.json({ success: true, message: 'Pharmacy status updated successfully' });
  } catch (error) {
    console.error('Error updating pharmacy status:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error during approval' });
  }
});


// Login server
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password });

    const user = await User.findOne({ username });

    if (user) {
      if (user.status === 'approved') {
        // Compare the entered password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        console.log('Is password valid?', isPasswordValid);

        if (isPasswordValid) {
          res.json({ success: true, message: 'Login successful', user });
        } else {
          console.log('Invalid password');
          res.status(401).json({ success: false, message: 'Invalid password' });
        }
      } else {
        console.log('User is not approved');
        res.status(401).json({ success: false, message: 'User is not approved' });
      }
    } else {
      console.log('User not found');
      res.status(401).json({ success: false, message: 'Invalid username' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error during login' });
  }
});




//sales 

const salesSchema = new mongoose.Schema({
  pharmacyId:{type:String,required:true},
  medicineName: { type: String, required: true },
  date: { type: Date, required: true },
  expireDate: { type: Date, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  supplierName: { type: String, required: true },
});

const Sales = mongoose.model('Sales', salesSchema);

// Route to fetch all sales with optional filter
app.get('/api/sales', async (req, res) => {
  try {
    // Logic for filtering based on req.query.filter (not implemented in this example)
    let sales;

    if (req.query.filter && req.query.filter.toLowerCase() === 'all') {
      // Handle the case when filter is 'all'
      sales = await Sales.find();
    } else {
      // Handle other filter cases if needed
      // Modify this part based on your actual filtering logic
      sales = await Sales.find();
    }

    res.json({ success: true, sales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



// Route to add a new sale
app.post('/api/sales/add', async (req, res) => {
  try {
    const {
      pharmacyId,
      medicineName,
      date,
      expireDate,
      quantity,
      price,
      supplierName,
    } = req.body;

    const sale = new Sales({
      pharmacyId,
      medicineName,
      date,
      expireDate,
      quantity,
      price,
      supplierName,
    });

    await sale.save();
    res.json({ success: true, message: 'Sale added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to update a sale
app.put('/api/sales/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    await Sales.findByIdAndUpdate(id, updatedData);
    res.json({ success: true, message: 'Sale updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



// Route to delete a sale

app.delete('/api/sales/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Convert the id string to a valid ObjectId
    const objectId = mongoose.Types.ObjectId(id);
    
    await Sales.findByIdAndDelete(objectId);
    res.json({ success: true, message: 'Sale deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



// purchase
const purchaseSchema = new mongoose.Schema({
  pharmacyId:{type:String,required:true},
  supplierName: { type: String, required: true },
  medicineName: { type: String, required: true },
  invoiceNumber: { type: String, required: true },
  paymentType: { type: String, required: true },
  invoiceDate: { type: Date },
  expireDate: { type: Date, required: true },
  price: { type: Number, required: true },
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

// Route to fetch all purchases with optional filter
app.get('/api/purchase', async (req, res) => {
  try {
    const filter = {}; // Initialize an empty object as the filter

    const purchases = await Purchase.find(filter); // Pass the filter object to the find() method

    res.json({ success: true, purchases });
  } catch (error) {
    console.error('Error retrieving purchases:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error retrieving purchases' });
  }
});


// Route to add a new purchase
app.post('/api/purchase/add', async (req, res) => {
  try {
    const {
      pharmacyId,
      supplierName,
      medicineName,
      invoiceNumber,
      paymentType,
      invoiceDate,
      expireDate,
      price,
    } = req.body;

    const purchase = new Purchase({
      pharmacyId,
      supplierName,
      medicineName,
      invoiceNumber,
      paymentType,
      invoiceDate,
      expireDate,
      price,
    });

    await purchase.save();
    res.json({ success: true, message: 'Purchase added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to update a purchase
app.put('/api/purchase/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPurchase = await Purchase.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, purchase: updatedPurchase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});






app.put('/api/purchase/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPurchase = req.body;

    // Convert the id to ObjectId
    const purchaseId = new mongoose.Types.ObjectId(id);
    const result = await Purchase.findByIdAndUpdate(purchaseId, updatedPurchase, { new: true });

    res.json({ purchase: result });
  } catch (error) {
    console.error('Error updating purchase:', error);
    res.status(500).json({ message: 'Failed to update purchase. Please try again.' });
  }
});


// Route to delete a purchase
app.delete('/api/purchase/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Purchase.findByIdAndDelete(id);
    res.json({ success: true, message: 'Purchase deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/api/sales/count', async (req, res) => {
  try {
    const count = await Sales.countDocuments();
    res.json({ success: true, count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/api/purchase/count', async (req, res) => {
  try {
    const count = await Purchase.countDocuments();
    res.json({ success: true, count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


app.get('/api/reports/medicines', async (req, res) => {
  try {
    const medicinesCount = await Medicine.countDocuments();
    res.json({ medicinesCount });
  } catch (error) {
    console.error('Error fetching medicines count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for fetching the number of suppliers
app.get('/api/reports/suppliers', async (req, res) => {
  try {
    const suppliersCount = await Supplier.countDocuments();
    res.json({ suppliersCount });
  } catch (error) {
    console.error('Error fetching suppliers count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for fetching the number of sales
app.get('/api/reports/sales', async (req, res) => {
  try {
    const salesCount = await Sales.countDocuments();
    res.json({ salesCount });
  } catch (error) {
    console.error('Error fetching sales count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for fetching the number of purchases
app.get('/api/reports/purchases', async (req, res) => {
  try {
    const purchasesCount = await Purchase.countDocuments();
    res.json({ purchasesCount });
  } catch (error) {
    console.error('Error fetching purchases count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// Assuming you have a Medicine model/schema with an expirationDate field
app.get('/api/medicine/expiredCount/:pharmacyId', async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    // console.log('Pharmacy ID:', pharmacyId);

    const currentDate = new Date();
    const expiredMedicineCount = await Medicine.countDocuments({
      pharmacyId,
      expireDate: { $lt: currentDate },
    });

    // console.log('Expired Medicine Count:', expiredMedicineCount);

    res.json({ expiredMedicineCount });
  } catch (error) {
    console.error('Error fetching expired medicine count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Route for fetching the number of registered pharmacies
app.get('/api/reports/registered-pharmacies', async (req, res) => {
  try {
    const registeredPharmacyCount = await User.countDocuments();
    res.json({ registeredPharmacyCount });
  } catch (error) {
    console.error('Error fetching registered pharmacies count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to fetch the count of medicines for a specific pharmacy
app.get('/api/reports/medicines/count/:pharmacyId', async (req, res) => {
  try {
    const pharmacyId = req.params.pharmacyId;
    const medicinesCount = await Medicine.countDocuments({ pharmacyId });
    res.json({ success: true, medicinesCount });
  } catch (error) {
    console.error('Error fetching medicines count:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Route for fetching the number of suppliers for a specific pharmacy
app.get('/api/reports/suppliers/count/:pharmacyId', async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const suppliersCount = await Supplier.countDocuments({ pharmacyId });
    res.json({ suppliersCount });
  } catch (error) {
    console.error('Error fetching suppliers count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/reports/sales/count/:pharmacyId', async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const salesCount = await Sales.countDocuments({ pharmacyId });
    res.json({ salesCount });
  } catch (error) {
    console.error('Error fetching sales count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to count all purchases for a specific pharmacy
app.get('/api/reports/purchases/count/:pharmacyId', async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const purchasesCount = await Purchase.countDocuments({ pharmacyId });
    res.json({ purchasesCount });
  } catch (error) {
    console.error('Error fetching purchases count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add a new endpoint to count suppliers for all pharmacies
app.get('/api/supplier/countAllPharmacies', async (req, res) => {
  try {
    const countByPharmacy = await Supplier.aggregate([
      {
        $group: {
          _id: '$pharmacyId',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({ success: true, countByPharmacy });
  } catch (error) {
    console.error('Error counting suppliers for all pharmacies:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});









app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
 });


