exports.analyzeEmotion = (text) => {
  const t = text.toLowerCase();

  if (
    t.includes('sedih') ||
    t.includes('capek') ||
    t.includes('lelah')
  ) {
    return {
      emotion: 'sedih',
      mood: 'Negatif'
    };
  }

  if (
    t.includes('cemas') ||
    t.includes('takut')
  ) {
    return {
      emotion: 'cemas',
      mood: 'Negatif'
    };
  }

  if (
    t.includes('senang') ||
    t.includes('bahagia') ||
    t.includes('bersyukur')
  ) {
    return {
      emotion: 'bahagia',
      mood: 'Positif'
    };
  }

  return {
    emotion: 'netral',
    mood: 'Netral'
  };
};