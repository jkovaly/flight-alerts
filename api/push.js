const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:you@example.com',
  process.env.VAPID_PUBLIC,
  process.env.VAPID_PRIVATE
);

module.exports = async (req, res) => {
  try {
    const subscription = JSON.parse(process.env.SUBSCRIPTION_JSON || '{}');
    if (!subscription.endpoint) {
      return res.status(400).json({ error: 'Missing SUBSCRIPTION_JSON' });
    }

    const title = (req.body && req.body.title) || 'New booking';
    const body  = (req.body && req.body.body)  || 'Details inside';

    await webpush.sendNotification(subscription, JSON.stringify({ title, body }));
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: String(e) });
  }
};
