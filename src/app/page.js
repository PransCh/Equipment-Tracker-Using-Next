import { Button, Box, Typography, Grid, Card, CardContent } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
 // Adjust the path based on your directory structure

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100vh",
        bgcolor: "grey.50", // Softer background color
      }}
    >

      {/* Hero Section */}
      <Box
        component="header"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 20,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          bgcolor: "grey.900", // Dark base color for better contrast
        }}
      >
        {/* Background Image with Overlay */}
        <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/landingpage.jpg"
            alt="AI Quiz Background"
            layout="fill"
            objectFit="cover"
            style={{ opacity: 0.6 }} // Increased opacity for better visibility
          />
          <Box 
            sx={{ 
              position: "absolute", 
              inset: 0, 
              bgcolor: "rgba(0, 0, 0, 0.3)" // Lighter overlay for image visibility
            }} 
          />
        </Box>

        {/* Content */}
        <Box sx={{ position: "relative", zIndex: 10, px: 4 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "5rem" },
              fontWeight: 900,
              mb: 4,
              color: "white",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              animation: "fadeIn 1s ease-in-out",
            }}
          >
            Celanix
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.125rem", md: "1.5rem" },
              mb: 8,
              maxWidth: "40rem",
              color: "grey.200",
              fontWeight: 400,
              lineHeight: 1.6,
              animation: "fadeIn 1.2s ease-in-out",
            }}
          >
            Streamline your manufacturing process with a powerful tool to track and manage equipment maintenance efficiently.
          </Typography>
          <Link href="/login" passHref>
            <Button
              variant="contained"
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.125rem",
                fontWeight: 700,
                bgcolor: "#2196f3", // Modern blue tone
                color: "white",
                borderRadius: "50px",
                textTransform: "none",
                "&:hover": { 
                  bgcolor: "#1565c0",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
                boxShadow: "0 4px 14px rgba(33, 150, 243, 0.3)",
                animation: "fadeIn 1.4s ease-in-out",
              }}
            >
              Get Started Now
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 6,
          width: "100%",
          bgcolor: "grey.900",
          textAlign: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 400,
            color: "grey.300",
            letterSpacing: "0.5px",
            animation: "fadeIn 2.2s ease-in-out",
          }}
        >
          &copy; 2025 Celanix. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
