module.exports = function () {
  const members = new Map();
  let chatHistory = [];

  function broadcastMessage(message) {
    members.forEach((m) => m.emit("message", message));
  }

  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry);
  }

  function getChatHistory() {
    return chatHistory.slice();
  }

  addUser = (client) => {
    members.set(client.id, client);
  };

  removeUser = (client) => {
    members.delete(client.id);
  };

  return {
    broadcastMessage,
    addEntry,
    getChatHistory,
    addUser,
    removeUser,
    serialize,
  };
};
