import db from '../database/index.js';

export const getSettings = async (req, res) => {
    try {
        const { key } = req.params;
        const setting = await db('site_settings').where({ key }).first();
        if (setting) {
            res.json(setting.value);
        } else {
            res.json(null);
        }
    } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateSettings = async (req, res) => {
    try {
        const { key } = req.params;
        const value = req.body;

        const existing = await db('site_settings').where({ key }).first();
        if (existing) {
            await db('site_settings').where({ key }).update({ value: JSON.stringify(value), updated_at: db.fn.now() });
        } else {
            await db('site_settings').insert({ key, value: JSON.stringify(value) });
        }
        res.json({ message: 'Settings updated successfully' });
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
