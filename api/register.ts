import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './_db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('registrations');

    if (req.method === 'POST') {
      const registrationData = req.body;

      if (!registrationData) {
        return res.status(400).json({ error: 'Missing registration payload' });
      }

      // Check for mandatory fields
      const { teamId, teamName, abstractUrl, members, selectedChallenge } = registrationData;
      if (!teamName || !abstractUrl || !members || !Array.isArray(members) || members.length === 0) {
        return res.status(400).json({
          error: 'Invalid registration details. Team Name, Abstract (.docx) Google Drive URL, and team members are required.',
        });
      }

      // Prepare document with server timestamp
      const document = {
        ...registrationData,
        createdAt: new Date(),
        updatedAt: new Date(),
        source: 'HorizonXT Web Portal',
      };

      // Upsert by teamId if provided, or insert new record
      if (teamId) {
        await collection.updateOne(
          { teamId: teamId },
          { $set: document },
          { upsert: true }
        );
      } else {
        await collection.insertOne(document);
      }

      return res.status(200).json({
        success: true,
        message: 'Registration successfully stored in MongoDB Atlas!',
        teamId: document.teamId,
        inviteCode: document.inviteCode,
      });
    }

    if (req.method === 'GET') {
      const { teamId, email } = req.query;

      if (teamId) {
        const team = await collection.findOne({ teamId: String(teamId) });
        if (!team) {
          return res.status(404).json({ error: 'Squad registration not found' });
        }
        return res.status(200).json({ success: true, team });
      }

      if (email) {
        const team = await collection.findOne({ 'members.email': String(email) });
        if (!team) {
          return res.status(404).json({ error: 'No team registration associated with this email' });
        }
        return res.status(200).json({ success: true, team });
      }

      // Default: Return recent registrations count or list (limit 50)
      const count = await collection.countDocuments();
      const registrations = await collection.find({}).sort({ createdAt: -1 }).limit(50).toArray();

      return res.status(200).json({
        success: true,
        totalRegistrations: count,
        registrations,
      });
    }

    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error: any) {
    console.error('MongoDB API Error:', error);
    return res.status(500).json({
      error: 'Failed to process request with MongoDB serverless function',
      details: error?.message || String(error),
    });
  }
}
