const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://bzommvetjjhtapqssojg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6b21tdmV0ampodGFwcXNzb2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4NjM1NTgsImV4cCI6MjAzMTQzOTU1OH0.xhEu1TCkZsd2Pc2uDjAsh0liH0ECjPQ3Oi3-QvHHEwY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.post('/signup', async (req, res) => {
    const { email, password, profile_name } = req.body;
    let { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    const { user } = data;
    await supabase
        .from('profiles')
        .insert([{ id: user.id, email, profile_name }]);
    res.status(200).json({ data });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    res.status(200).json({ data });
});

app.get('/profile', async (req, res) => {
    const { user_id } = req.query;
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user_id)
        .single();
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    res.status(200).json({ data });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
