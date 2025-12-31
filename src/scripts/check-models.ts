import fs from 'fs';
import path from 'path';

// Manually read .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
let apiKey = '';

try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/GOOGLE_GENAI_API_KEY=(.+)/) || envContent.match(/GOOGLE_API_KEY=(.+)/);
    if (match) {
        apiKey = match[1].trim();
    }
} catch (e) {
    console.error('Error reading .env.local:', e);
}

if (!apiKey) {
    console.error('Error: GOOGLE_GENAI_API_KEY not found in .env.local');
    process.exit(1);
}

async function listModels() {
    console.log('Checking available models for API key...');
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.error(`API Error (${response.status}):`, JSON.stringify(data, null, 2));
            return;
        }

        if (data.models) {
            console.log('Available Models:');
            const textModels = data.models
                .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
                .map((m: any) => ` - ${m.name.replace('models/', '')} (${m.displayName})`);

            console.log(textModels.join('\n'));
        } else {
            console.log('No models found in response:', data);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

listModels();
