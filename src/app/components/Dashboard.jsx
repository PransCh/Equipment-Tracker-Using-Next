"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';

function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(name, model, serialNumber, location, price, imageUrl, purchaseDate);

    try {
      const response = await fetch('/api/auth/Equipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          model,
          serialNumber,
          location,
          price,
          imageUrl,
          purchaseDate,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Inserted ID:', data);
        setOpenDialog(false);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+Add New Equipment</h2>
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Equipment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form onSubmit={onSubmit}>
              <div>
                <div className="mt-7 my-3">
                  <TextField
                    label="Name"
                    placeholder="ex. Laptop"
                    required
                    fullWidth
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="mt-7 my-3">
                  <TextField
                    label="Model"
                    placeholder="ex. Dell XPS 13"
                    required
                    fullWidth
                    onChange={(event) => setModel(event.target.value)}
                  />
                </div>
                <div className="mt-7 my-3">
                  <TextField
                    label="Serial Number"
                    placeholder="ex. SN123456789"
                    required
                    fullWidth
                    onChange={(event) => setSerialNumber(event.target.value)}
                  />
                </div>
                <div className="mt-7 my-3">
                  <TextField
                    label="Location"
                    placeholder="ex. Office"
                    required
                    fullWidth
                    onChange={(event) => setLocation(event.target.value)}
                  />
                </div>
                <div className="mt-7 my-3">
                  <TextField
                    label="Price"
                    placeholder="ex. 1200.00"
                    type="number"
                    required
                    fullWidth
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>
                <div className="mt-7 my-3">
                  <TextField
                    label="Image URL"
                    placeholder="ex. http://example.com/image.jpg"
                    fullWidth
                    onChange={(event) => setImageUrl(event.target.value)}
                  />
                </div>
                <div className="mt-7 my-3">
                  <TextField
                    label="Purchase Date"
                    type="date"
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={(event) => setPurchaseDate(event.target.value)}
                  />
                </div>
              </div>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={loading}>
                  {loading ? (
                    <>
                      <CircularProgress size={24} /> Adding Equipment
                    </>
                  ) : (
                    'Add Equipment'
                  )}
                </Button>
              </DialogActions>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Dashboard;