import { useState } from "react";
import { Box, Input, Text, VStack } from "@chakra-ui/react";

const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
const TELEGRAM_CHAT_ID = "YOUR_TELEGRAM_CHAT_ID";

const Index = () => {
  const [message, setMessage] = useState("");

  const handleInputChange = async (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);

    // Send each letter to the Telegram bot
    if (newMessage.length > message.length) {
      const letter = newMessage[newMessage.length - 1];
      await sendMessageToTelegram(letter);
    }
  };

  const sendMessageToTelegram = async (text) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const data = {
      chat_id: TELEGRAM_CHAT_ID,
      text: text,
    };

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          Send Letters to Telegram Bot
        </Text>
        <Input value={message} onChange={handleInputChange} placeholder="Type your message..." />
      </VStack>
    </Box>
  );
};

export default Index;
