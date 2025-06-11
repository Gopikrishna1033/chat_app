import { Box } from "@mui/material";

const TypingIndicator = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      background: "#e0e0e0",
      borderRadius: "16px",
      px: 2,
      py: 1,
      width: "fit-content",
      m: 2,
    }}
  >
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 6,
            height: 6,
            bgcolor: "#555",
            borderRadius: "50%",
            animation: `typing 1.4s infinite ${i * 0.2}s`,
          }}
        />
      ))}
    </Box>

    <style>
      {`
        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.3;
          } 
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}
    </style>
  </Box>
);

export default TypingIndicator;
