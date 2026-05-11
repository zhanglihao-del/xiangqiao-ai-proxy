import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { messages } = req.body;

    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 👇 把这里的内容，替换成你刚复制的完整API Key
                'Authorization': 'Bearer sk-3c74f0fb81884b5c851014dcf4220ea6'
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: messages,
                temperature: 0.1
            })
        });

        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}