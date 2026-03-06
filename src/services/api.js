// Simulates async API calls with artificial latency

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const authService = {
  async login(email, password) {
    await delay(900);
    const { MOCK_USER } = await import("@/data/rooms");
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      return { success: true, user: { name: MOCK_USER.name, email, role: MOCK_USER.role, avatar: MOCK_USER.avatar } };
    }
    throw new Error("Invalid email or password.");
  },
};

export const roomService = {
  async getRooms() {
    await delay(700);
    const { rooms } = await import("@/data/rooms");
    return rooms;
  },

  async checkAvailability(roomId, startDate, endDate) {
    await delay(600);
    // Simulate: room r3 is always booked on weekends
    const start = new Date(startDate);
    if (roomId === "r3" && (start.getDay() === 0 || start.getDay() === 6)) {
      return { available: false };
    }
    return { available: true };
  },

  async bookRoom(roomId, userId, startDate, endDate, roomName, price) {
    await delay(800);
    if (Math.random() < 0.05) throw new Error("Booking service temporarily unavailable. Please try again.");
    return {
      id: `bk-${Date.now()}`,
      roomId,
      roomName,
      startDate,
      endDate,
      price,
      status: "confirmed",
      bookedAt: new Date().toISOString(),
    };
  },
};
