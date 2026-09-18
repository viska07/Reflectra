exports.generateInsight = ({
  mood,
  emotion,
  coping
}) => {

  if (
    mood === 'Negatif' &&
    coping === 'coping-positif'
  ) {
    return 'Kamu sedang melalui masa sulit, tapi caramu menghadapi ini menunjukkan kekuatan.';
  }

  if (mood === 'Negatif') {
    return 'Perasaanmu valid. Tidak apa-apa untuk berhenti sejenak dan bernapas.';
  }

  if (mood === 'Positif') {
    return 'Nikmati perasaan baik ini dan terus rawat hal-hal yang membuatmu berkembang.';
  }

  return 'Kamu berada dalam kondisi yang cukup seimbang. Jaga ritmemu.';
};