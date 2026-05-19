const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    logo: { type: String, default: null },
    text: { type: String, default: null },
    isWhiteOnly: { type: Boolean, default: false }
}, { timestamps: true });

// Schema validation to ensure at least one of logo or text exists
clientSchema.pre('validate', function(next) {
    if (!this.logo && !this.text) {
        this.invalidate('logo', 'At least one of logo or text must be provided');
        this.invalidate('text', 'At least one of logo or text must be provided');
    }
    if (typeof next === 'function') {
        next();
    }
});

module.exports = mongoose.model('Client', clientSchema);
