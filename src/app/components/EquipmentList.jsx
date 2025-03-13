"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CircularProgress, Grid, Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

function EquipmentList() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/getAllEquipment')
      .then((response) => response.json())
      .then((data) => {
        setEquipment(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching equipment:', error);
        setLoading(false);
      });
  }, []);

  const handleRowClick = (id) => {
    router.push(`/Home/Equipment/${id}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {equipment.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.EquipmentID}>
            <Card
              sx={{
                background: 'linear-gradient(to bottom right, #E6E6FA, #F8F8FF)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <CardMedia
                component="img"
                height="150"
                image={item.ImageURL}
                alt={item.Name}
                sx={{ borderRadius: '10px 10px 0 0' }}
              />
            </Card>
            <Box sx={{ textAlign: 'center', marginTop: 1 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#4B0082' }}>
                {item.Name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Model Name: {item.Model}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 1 }}
                onClick={() => handleRowClick(item.EquipmentID)}
              >
                View
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default EquipmentList;