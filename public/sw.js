self.addEventListener('push', e => {
  let data = { title: 'Booking update', body: 'New/changed booking' };
  try { if (e.data) data = e.data.json(); } catch {}
  e.waitUntil(self.registration.showNotification(data.title, { body: data.body, tag: 'booking' }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
});
