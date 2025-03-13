// "use client";
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { Button, CircularProgress, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, Grid } from '@mui/material';

// function EquipmentDetails() {
//   const router = useRouter();
//   const { id } = router.query;
//   const [equipment, setEquipment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);
//   const [maintenanceDate, setMaintenanceDate] = useState('');
//   const [maintenanceType, setMaintenanceType] = useState('');

//   useEffect(() => {
//     if (id) {
//       fetch(`/api/auth/getEquipmentById?id=${id}`)
//         .then((response) => response.json())
//         .then((data) => {
//           setEquipment(data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error fetching equipment:', error);
//           setLoading(false);
//         });
//     }
//   }, [id]);

//   const handleEdit = () => {
//     setEditDialogOpen(true);
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await fetch('/api/auth/deleteEquipment', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ EquipmentID: id }),
//       });

//       if (response.ok) {
//         router.push('/Home');
//       } else {
//         console.error('Error deleting equipment');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       const response = await fetch('/api/auth/updateEquipment', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(equipment),
//       });

//       if (response.ok) {
//         setEditDialogOpen(false);
//       } else {
//         console.error('Error updating equipment');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleScheduleMaintenance = async () => {
//     try {
//       const response = await fetch('/api/auth/scheduleMaintenance', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ EquipmentID: id, Date: maintenanceDate, Type: maintenanceType }),
//       });

//       if (response.ok) {
//         setMaintenanceDialogOpen(false);
//       } else {
//         console.error('Error scheduling maintenance');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   if (loading) {
//     return <CircularProgress />;
//   }

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
//         Equipment Details
//       </Typography>
//       {equipment && (
//         <Box sx={{ marginBottom: 2 }}>
//           <Typography variant="body1"><strong>Name:</strong> {equipment.Name}</Typography>
//           <Typography variant="body1"><strong>Model:</strong> {equipment.Model}</Typography>
//           <Typography variant="body1"><strong>Serial Number:</strong> {equipment.SerialNumber}</Typography>
//           <Typography variant="body1"><strong>Location:</strong> {equipment.Location}</Typography>
//           <Typography variant="body1"><strong>Price:</strong> {equipment.Price}</Typography>
//           <Typography variant="body1"><strong>Image URL:</strong> {equipment.ImageURL}</Typography>
//           <Typography variant="body1"><strong>Purchase Date:</strong> {equipment.PurchaseDate}</Typography>
//           <Button variant="contained" color="primary" sx={{ marginRight: 1 }} onClick={handleEdit}>Edit</Button>
//           <Button variant="contained" color="secondary" sx={{ marginRight: 1 }} onClick={handleDelete}>Delete</Button>
//           <Button variant="contained" color="success" onClick={() => setMaintenanceDialogOpen(true)}>Schedule Maintenance</Button>
//         </Box>
//       )}

//       <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
//         <DialogTitle>Edit Equipment</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Name"
//             value={equipment?.Name || ''}
//             onChange={(e) => setEquipment({ ...equipment, Name: e.target.value })}
//             fullWidth
//             sx={{ marginBottom: 2 }}
//           />
//           <TextField
//             label="Model"
//             value={equipment?.Model || ''}
//             onChange={(e) => setEquipment({ ...equipment, Model: e.target.value })}
//             fullWidth
//             sx={{ marginBottom: 2 }}
//           />
//           <TextField
//             label="Serial Number"
//             value={equipment?.SerialNumber || ''}
//             onChange={(e) => setEquipment({ ...equipment, SerialNumber: e.target.value })}
//             fullWidth
//             sx={{ marginBottom: 2 }}
//           />
//           <TextField
//             label="Location"
//             value={equipment?.Location || ''}
//             onChange={(e) => setEquipment({ ...equipment, Location: e.target.value })}
//             fullWidth
//             sx={{ marginBottom: 2 }}
//           />
//           <TextField
//             label="Price"
//             value={equipment?.Price || ''}
//             onChange={(e) => setEquipment({ ...equipment, Price: e.target.value })}
//             fullWidth
//             sx={{ marginBottom: 2 }}
//           />
//           <TextField
//             label="Image URL"
//             value={equipment?.ImageURL || ''}
//             onChange={(e) => setEquipment({ ...equipment, ImageURL: e.target.value })}
//             fullWidth
//             sx={{ marginBottom: 2 }}
//           />
//           <TextField
//             label="Purchase Date"
//             type="date"
//             value={equipment?.PurchaseDate || ''}
//             onChange={(e) => setEquipment({ ...equipment, PurchaseDate: e.target.value })}
//             fullWidth
//             InputLabelProps={{ shrink: true }}
//             sx={{ marginBottom: 2 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditDialogOpen(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleUpdate} color="primary">
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={maintenanceDialogOpen} onClose={() => setMaintenanceDialogOpen(false)}>
//         <DialogTitle>Schedule Maintenance</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Maintenance Date"
//                 type="date"
//                 value={maintenanceDate}
//                 onChange={(e) => setMaintenanceDate(e.target.value)}
//                 fullWidth
//                 InputLabelProps={{ shrink: true }}
//                 sx={{ marginBottom: 2 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Maintenance Type"
//                 value={maintenanceType}
//                 onChange={(e) => setMaintenanceType(e.target.value)}
//                 fullWidth
//                 sx={{ marginBottom: 2 }}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setMaintenanceDialogOpen(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleScheduleMaintenance} color="primary">
//             Schedule
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// export default EquipmentDetails;

"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, CircularProgress, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, Grid } from '@mui/material';
import Header from '@/app/components/Header';

function EquipmentDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [equipment, setEquipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);
    const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
    const [maintenanceDate, setMaintenanceDate] = useState('');
    const [maintenanceType, setMaintenanceType] = useState('');
    const [updateHistory, setUpdateHistory] = useState([]);
    const [duration, setDuration] = useState('');
    const [remarks, setRemarks] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [existingMaintenance, setExistingMaintenance] = useState(null);
    const [maintenanceHistory, setMaintenanceHistory] = useState([]);
    const [userRole, setUserRole] = useState('');
    const [logDialogOpen, setLogDialogOpen] = useState(false);
    const [logText, setLogText] = useState('');

    useEffect(() => {
        // Fetch user role from session storage
        const role = localStorage.getItem('userRole');
        console.log('Fetched user role:', role);
        setUserRole(role);
    }, []);

    useEffect(() => {
        if (id) {
            fetch(`/api/auth/getEquipmentById?id=${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setEquipment(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching equipment:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleEdit = () => {
        setEditDialogOpen(true);
    };

    useEffect(() => {
        const fetchMaintenanceDetails = async () => {
            try {
                const response = await fetch(`/api/auth/getMaintenanceByEquipment?equipmentID=${id}`);
                const data = await response.json();
                if (data.length > 0) {
                    setExistingMaintenance(data[0]);
                } else {
                    setExistingMaintenance(null);
                }
            } catch (error) {
                console.error('Error fetching maintenance details:', error);
            }
        };

        if (id) {
            fetchMaintenanceDetails();
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchMaintenanceHistory();
        }
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch('/api/auth/deleteEquipment', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ EquipmentID: id }),
            });

            if (response.ok) {
                router.push('/Home');
            } else {
                console.error('Error deleting equipment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch('/api/auth/updateEquipment', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(equipment),
            });

            if (response.ok) {
                setEditDialogOpen(false);
            } else {
                console.error('Error updating equipment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleScheduleMaintenance = async () => {
        const selectedDate = new Date(maintenanceDate);
        const currentDate = new Date();
      
        // Check if the selected maintenance date is in the future
        if (selectedDate <= currentDate) {
          console.error('Maintenance date must be in the future');
          alert('Maintenance date must be in the future');
          return;
        }
      
        try {
          const response = await fetch('/api/auth/scheduleMaintenance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              equipmentID: id,
              maintenanceDate,
              maintenanceType,
              duration,
              remarks,
              createdBy
            }),
          });
      
          if (response.ok) {
            const fetchResponse = await fetch(`/api/auth/getMaintenanceByEquipment?equipmentID=${id}`);
            const data = await fetchResponse.json();
            if (data.length > 0) {
              setExistingMaintenance(data[0]);
            } else {
              setExistingMaintenance(null);
            }
            setMaintenanceDialogOpen(false);
          } else {
            const errorData = await response.json();
            console.error('Error scheduling maintenance:', errorData.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const handleCancelMaintenance = async () => {
        try {
            const response = await fetch('/api/auth/cancelMaintenance', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: existingMaintenance.id }),
            });

            if (response.ok) {
                setExistingMaintenance(null);
                setMaintenanceDialogOpen(false);
            } else {
                const errorData = await response.json();
                console.error('Error canceling maintenance:', errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleViewHistory = async () => {
        try {
            const response = await fetch(`/api/auth/getUpdateHistory?EquipmentID=${id}`);
            const history = await response.json();
            setUpdateHistory(history);
            setHistoryDialogOpen(true);
        } catch (error) {
            console.error('Error fetching update history:', error);
        }
    };

    const handleCompleteMaintenance = async (maintenanceID) => {
        try {
            const response = await fetch('/api/auth/maintenanceStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ maintenanceID }),
            });

            if (response.ok) {
                // Fetch updated maintenance data
                const fetchResponse = await fetch(`/api/auth/getMaintenanceByEquipment?equipmentID=${id}`);
                const data = await fetchResponse.json();
                if (data.length > 0) {
                    setExistingMaintenance(data[0]);
                } else {
                    setExistingMaintenance(null);
                }
                setMaintenanceDialogOpen(false);
            } else {
                const errorData = await response.json();
                console.error('Error completing maintenance:', errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchMaintenanceHistory = async () => {
        try {
            const response = await fetch(`/api/auth/getMaintenanceHistory?equipmentID=${id}`);
            const data = await response.json();
            setMaintenanceHistory(data);
        } catch (error) {
            console.error('Error fetching maintenance history:', error);
        }
    };

    const handleAddLog = async () => {
        const logData = {
            equipmentID: existingMaintenance.equipmentID,
            maintenanceID: existingMaintenance.id,
            logText: logText,
            createdBy: userRole,
        };

        try {
            const response = await fetch('/api/auth/addLogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log(result.message);
        } catch (error) {
            console.error('Error adding log:', error);
        }
    };

    const fetchLogs = async (maintenanceID) => {
        try {
            const response = await fetch(`/api/auth/getLogs?maintenanceID=${maintenanceID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const logs = await response.json();
            console.log(logs);
            return logs;
        } catch (error) {
            console.error('Error fetching logs:', error);
            return [];
        }
    };

    const [logs, setLogs] = useState([]);

    useEffect(() => {
        if (existingMaintenance) {
            fetchLogs(existingMaintenance.id).then(fetchedLogs => {
                setLogs(fetchedLogs);
            });
        }
    }, [existingMaintenance]);


    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div>
            <Header />
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
                    Equipment Details
                </Typography>
                {equipment && (
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="body1"><strong>Name:</strong> {equipment.Name}</Typography>
                        <Typography variant="body1"><strong>Model:</strong> {equipment.Model}</Typography>
                        <Typography variant="body1"><strong>Serial Number:</strong> {equipment.SerialNumber}</Typography>
                        <Typography variant="body1"><strong>Location:</strong> {equipment.Location}</Typography>
                        <Typography variant="body1"><strong>Price:</strong> {equipment.Price}</Typography>
                        <Typography variant="body1"><strong>Image URL:</strong> {equipment.ImageURL}</Typography>
                        <Typography variant="body1"><strong>Purchase Date:</strong> {equipment.PurchaseDate}</Typography>
                        <Typography variant="body1"><strong>Last Modified:</strong> {new Date(equipment.lastModified).toLocaleString()}</Typography>
                        <Button variant="contained" color="primary" sx={{ marginRight: 1 }} onClick={handleEdit}>Edit</Button>
                        <Button variant="contained" color="secondary" sx={{ marginRight: 1 }} onClick={handleDelete}>Delete</Button>
                        <Button variant="contained" color="success" sx={{ marginRight: 1 }} onClick={() => setMaintenanceDialogOpen(true)}>Schedule Maintenance</Button>
                        <Button variant="contained" color="info" onClick={handleViewHistory}>View History</Button>
                    </Box>
                )}

                <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                    <DialogTitle>Edit Equipment</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Name"
                            value={equipment?.Name || ''}
                            onChange={(e) => setEquipment({ ...equipment, Name: e.target.value })}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Model"
                            value={equipment?.Model || ''}
                            onChange={(e) => setEquipment({ ...equipment, Model: e.target.value })}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Serial Number"
                            value={equipment?.SerialNumber || ''}
                            onChange={(e) => setEquipment({ ...equipment, SerialNumber: e.target.value })}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Location"
                            value={equipment?.Location || ''}
                            onChange={(e) => setEquipment({ ...equipment, Location: e.target.value })}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Price"
                            value={equipment?.Price || ''}
                            onChange={(e) => setEquipment({ ...equipment, Price: e.target.value })}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Image URL"
                            value={equipment?.ImageURL || ''}
                            onChange={(e) => setEquipment({ ...equipment, ImageURL: e.target.value })}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Purchase Date"
                            type="date"
                            value={equipment?.PurchaseDate || ''}
                            onChange={(e) => setEquipment({ ...equipment, PurchaseDate: e.target.value })}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            sx={{ marginBottom: 2 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditDialogOpen(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>

                {existingMaintenance ? (
                    <>
                        <Button variant="contained" color="primary" onClick={() => setMaintenanceDialogOpen(true)}>
                            View Maintenance Details
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleCancelMaintenance}>
                            Cancel Maintenance
                        </Button>
                    </>
                ) : (
                    ""
                )}
                {userRole && userRole.toLowerCase() === 'technician' && existingMaintenance && (
                    <Button variant="contained" color="primary" onClick={() => setLogDialogOpen(true)}>
                        Add Logs
                    </Button>
                )}
                <Dialog open={maintenanceDialogOpen} onClose={() => setMaintenanceDialogOpen(false)}>
                    <DialogTitle>{existingMaintenance ? 'Maintenance Details' : 'Schedule Maintenance'}</DialogTitle>
                    <DialogContent>
                        {existingMaintenance ? (
                            <Box sx={{ padding: 2 }}>
                                <Typography><strong>Maintenance Date:</strong> {existingMaintenance.maintenanceDate}</Typography>
                                <Typography><strong>Maintenance Type:</strong> {existingMaintenance.maintenanceType}</Typography>
                                <Typography><strong>Duration:</strong> {existingMaintenance.duration} minutes</Typography>
                                <Typography><strong>Remarks:</strong> {existingMaintenance.remarks}</Typography>
                                <Typography><strong>Created By:</strong> {existingMaintenance.createdBy}</Typography>
                                {userRole && userRole.toLowerCase() === 'admin' && (
                                    <>
                                        <Typography><strong>Logs:</strong></Typography>
                                        {Array.isArray(logs) && logs.length > 0 ? (
                                            logs.map((log, index) => (
                                                <Typography key={index}>{log.logText}</Typography>
                                            ))
                                        ) : (
                                            <Typography>No logs available</Typography>
                                        )}
                                    </>
                                )}
                                <Button variant="contained" color="success" onClick={() => handleCompleteMaintenance(existingMaintenance.id)}>
                                    Complete Maintenance
                                </Button>
                            </Box>
                        ) : (
                            <Box sx={{ padding: 2 }}>
                                <Box sx={{ marginBottom: 2 }}>
                                    <TextField
                                        label="Maintenance Date"
                                        type="date"
                                        value={maintenanceDate}
                                        onChange={(e) => setMaintenanceDate(e.target.value)}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Box>
                                <Box sx={{ marginBottom: 2 }}>
                                    <TextField
                                        label="Maintenance Type"
                                        value={maintenanceType}
                                        onChange={(e) => setMaintenanceType(e.target.value)}
                                        fullWidth
                                    />
                                </Box>
                                <Box sx={{ marginBottom: 2 }}>
                                    <TextField
                                        label="Duration (minutes)"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        fullWidth
                                    />
                                </Box>
                                <Box sx={{ marginBottom: 2 }}>
                                    <TextField
                                        label="Remarks"
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        fullWidth
                                    />
                                </Box>
                                <Box sx={{ marginBottom: 2 }}>
                                    <TextField
                                        label="Created By"
                                        value={createdBy}
                                        onChange={(e) => setCreatedBy(e.target.value)}
                                        fullWidth
                                    />
                                </Box>
                                <Button variant="contained" color="primary" onClick={handleScheduleMaintenance}>
                                    Schedule Maintenance
                                </Button>
                            </Box>
                        )}
                    </DialogContent>
                </Dialog>
                <Dialog open={logDialogOpen} onClose={() => setLogDialogOpen(false)}>
                    <DialogTitle>Add Log</DialogTitle>
                    <DialogContent>
                        <Box sx={{ padding: 2 }}>
                            <TextField
                                label="Log Text"
                                value={logText}
                                onChange={(e) => setLogText(e.target.value)}
                                fullWidth
                                multiline
                                rows={4}
                            />
                            <Button variant="contained" color="primary" onClick={handleAddLog}>
                                Submit Log
                            </Button>
                        </Box>
                    </DialogContent>
                </Dialog>
                <div>
                    <h2>Maintenance History</h2>
                    {maintenanceHistory.length > 0 ? (
                        <ul>
                            {maintenanceHistory.map((history) => (
                                <li key={history.id}>
                                    <Typography><strong>Date:</strong> {history.maintenanceDate}</Typography>
                                    <Typography><strong>Type:</strong> {history.maintenanceType}</Typography>
                                    <Typography><strong>Duration:</strong> {history.duration} minutes</Typography>
                                    <Typography><strong>Remarks:</strong> {history.remarks}</Typography>
                                    <Typography><strong>Completed By:</strong> {history.createdBy}</Typography>
                                    <Typography><strong>Completed Date:</strong> {history.completedDate}</Typography>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Typography>No maintenance history available.</Typography>
                    )}
                </div>
                <Dialog open={historyDialogOpen} onClose={() => setHistoryDialogOpen(false)} maxWidth="md" fullWidth>
                    <DialogTitle>Update History</DialogTitle>
                    <DialogContent>
                        {updateHistory.map((history, index) => (
                            <Box key={index} sx={{ marginBottom: 2, padding: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
                                    Date: {new Date(history.UpdateDate).toLocaleString()}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#555' }}>
                                    Updated Fields:
                                </Typography>
                                <Box sx={{ marginLeft: 2 }}>
                                    {Object.entries(JSON.parse(history.UpdatedFields)).map(([key, value]) => (
                                        value !== null && value !== '' && (
                                            <Typography key={key} variant="body2" sx={{ color: '#555' }}>
                                                <strong>{key}:</strong> {value}
                                            </Typography>
                                        )
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setHistoryDialogOpen(false)} variant="contained" color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}

export default EquipmentDetails;