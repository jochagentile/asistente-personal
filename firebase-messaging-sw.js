importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC_bXzjxQqhz7F_l42tiwW0BKWR5bTsMtM",
  authDomain: "asistente-personal-86cdd.firebaseapp.com",
  projectId: "asistente-personal-86cdd",
  storageBucket: "asistente-personal-86cdd.firebasestorage.app",
  messagingSenderId: "166441879942",
  appId: "1:166441879942:web:be916af9116e7b3e274407"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || 'Asistente — Recordatorio';
  const body = payload.notification?.body || '';
  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'asistente-reminder',
    requireInteraction: true,
    actions: [
      { action: 'open', title: 'Abrir app' },
      { action: 'dismiss', title: 'Descartar' }
    ]
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if(event.action === 'open' || !event.action) {
    event.waitUntil(clients.openWindow('/'));
  }
});
