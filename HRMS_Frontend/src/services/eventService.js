import api from './api.js';

// Event Service - handles all event-related API calls
const eventService = {
  // Get all events
  getAllEvents: async () => {
    try {
      return await api.get('/events');
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  // Get event by ID
  getEventById: async (eventId) => {
    try {
      return await api.get(`/events/${eventId}`);
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  },

  // Register for an event
  registerForEvent: async (eventId) => {
    try {
      return await api.post(`/events/${eventId}/register`);
    } catch (error) {
      console.error('Error registering for event:', error);
      throw error;
    }
  },

  // Cancel event registration
  cancelRegistration: async (eventId) => {
    try {
      return await api.delete(`/events/${eventId}/register`);
    } catch (error) {
      console.error('Error canceling registration:', error);
      throw error;
    }
  },

  // Get user's event registrations
  getUserRegistrations: async () => {
    try {
      return await api.get('/events/user/registrations');
    } catch (error) {
      console.error('Error fetching user registrations:', error);
      throw error;
    }
  }
};

export default eventService;