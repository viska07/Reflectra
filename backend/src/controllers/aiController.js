const Sentiment = require('sentiment');

const sentiment = new Sentiment();

const { analyzeEmotion } = require('../services/emotionEngine');
const { detectCoping } = require('../services/copingDetector');
const { generateInsight } = require('../services/insightGenerator');

// ======================================================
// ANALYZE TEXT
// Fungsi internal untuk menganalisis teks refleksi
// ======================================================

exports.analyzeText = (text) => {
    if (!text || typeof text !== 'string' || text.trim() === '') {
        throw new Error('Teks tidak boleh kosong');
    }

    const cleanText = text.trim();

    // Analisis sentiment
    const sentimentResult = sentiment.analyze(cleanText);

    const score = sentimentResult.score;

    // Analisis emosi
    const emotionResult = analyzeEmotion(cleanText);

    // Deteksi coping
    const coping = detectCoping(cleanText);

    // Generate insight
    const recommendation = generateInsight({
        mood: emotionResult.mood,
        emotion: emotionResult.emotion,
        coping
    });

    return {
        score,
        mood: emotionResult.mood,
        emotion: emotionResult.emotion,
        recommendation
    };
};

// ======================================================
// POST /api/ai/analyze
// Endpoint khusus untuk testing / frontend AI
// ======================================================

exports.analyze = async (req, res) => {
    try {
        const { text } = req.body || {};

        if (!text || typeof text !== 'string' || text.trim() === '') {
            return res.status(400).json({
                message: 'Text tidak boleh kosong'
            });
        }

        const result = exports.analyzeText(text);

        return res.json(result);

    } catch (error) {
        console.error('❌ ERROR analyze:', error);

        return res.status(500).json({
            message: 'Gagal menganalisis teks',
            error: error.message
        });
    }
};