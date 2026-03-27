import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, categories, keywords } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  console.log(`New subscription: ${email}`, { categories, keywords });
  
  res.status(200).json({ 
    success: true, 
    message: "Successfully subscribed to job alerts!" 
  });
}
