exports.detectCoping = (text) => {
  const t = text.toLowerCase();

  if (
    t.includes('mencoba') ||
    t.includes('belajar') ||
    t.includes('berusaha')
  ) {
    return 'coping-positif';
  }

  if (
    t.includes('menyerah') ||
    t.includes('tidak sanggup')
  ) {
    return 'coping-negatif';
  }

  return 'netral';
};