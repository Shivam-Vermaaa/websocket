import { Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const socket = useMemo(() => io("http://localhost:4000"), []); // if we dont use useMemo then it will stuck in infinte loop
  // const socket = io("http://localhost:4000"); // if both [client and server] are in same url then no need to pass any url

  const handleSubmit = (e) => {
    e.preventDefault();
    // const message = e.target.message.value;
    console.log("Messages-- ", message);

    socket.emit("messages", { message, room });
    socket.emit("khat", message);
    console.log("room", room);

    e.target.reset();
  };
  useEffect(() => {
    socket.on("connect", () => {
      // this is a built in event
      setSocketId(socket.id); // dont put in connect without use memo other wise this will not stuck in infinte loop

      console.log("connected", socket.id);
    });
    // setSocketId(socket.id); // dont put in connect without use memo other wise this will not stuck in infinte loop

    socket.on("welcome", (msg) => {
      console.log("here is you massage", msg);
    });
    socket.on("broadcast", (msg) => {
      console.log(msg);
    });

    socket.on("receive-message", (msg) => {
      console.log("recived message---", msg);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return (
    <>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Welcome to Chat
      </Typography>
      <form onSubmit={handleSubmit}>
        <Container sx={{ display: "flex", gap: "10px" }}>
          <Typography>Socket Id: {socketId}</Typography>
          <TextField
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            type="text"
            label="Message"
            name="message"
          />
          <TextField
            onChange={(e) => setRoom(e.target.value)}
            value={room}
            type="text"
            label="Room"
            name="message"
          />
          <Button type="submit" variant="contained">
            Send
          </Button>
        </Container>
      </form>
    </>
  );
};

export default App;
