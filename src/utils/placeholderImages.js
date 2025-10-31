// Utility for generating placeholder images
export const generatePlaceholderImage = (width = 400, height = 200, type = 'picsum') => {
  const placeholders = {
    // Real photos from Lorem Picsum
    picsum: `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 1000)}`,
    
    // Solid color with text
    solid: `https://via.placeholder.com/${width}x${height}/2A2D3D/FFFFFF?text=Event+Image`,
    
    // Unsplash themed images
    corporate: `https://source.unsplash.com/${width}x${height}/?corporate,business`,
    nature: `https://source.unsplash.com/${width}x${height}/?nature,landscape`,
    tech: `https://source.unsplash.com/${width}x${height}/?technology,office`,
    
    // Custom gradient placeholder
    gradient: `https://dummyimage.com/${width}x${height}/667eea/ffffff&text=Loading...`
  };
  
  return placeholders[type] || placeholders.picsum;
};

// Event-specific image generator
export const getEventImage = (eventType, eventId) => {
  const eventImages = {
    'team-building': `https://source.unsplash.com/400x200/?teamwork,office`,
    'professional': `https://source.unsplash.com/400x200/?conference,business`,
    'wellness': `https://source.unsplash.com/400x200/?wellness,meditation`,
    'training': `https://source.unsplash.com/400x200/?education,workshop`,
    'default': `https://picsum.photos/400/200?random=${eventId}`
  };
  
  return eventImages[eventType] || eventImages.default;
};