export const invitation = {
  celebrant: 'Skarlet Guadalupe',
  shortName: 'Skarlet',
  headline: 'Mis XV Años',
  eventDateIso: '2026-05-23T14:00:00-06:00',
  eventEndIso: '2026-05-24T01:00:00-06:00',
  dateDisplay: 'Sábado 23 de mayo de 2026',
  dateShort: '23 · Mayo · 2026',
  rsvpDeadline: '1 de mayo de 2026',
  whatsappPhone: '525588150830',
  hashtag: '#LosXVDeSkarlet',
  instagramUrl:
    'https://www.instagram.com/skarleth__mj?utm_source=qr&igsh=MXg0bWZ3ZnM1aGJ5Mg==',
  ceremony: {
    title: 'Ceremonia',
    time: '2:00 PM',
    location: 'Iglesia Del Divino Niño, Loma de la Cruz, Nicolás Romero',
    mapEmbedUrl:
      'https://www.google.com/maps?q=Iglesia+Del+Divino+Ni%C3%B1o+Loma+de+la+Cruz+Nicol%C3%A1s+Romero&output=embed',
    mapLinkUrl:
      'https://www.google.com/maps/search/?api=1&query=Iglesia+Del+Divino+Ni%C3%B1o+Loma+de+la+Cruz+Nicol%C3%A1s+Romero',
  },
  reception: {
    title: 'Recepción',
    time: '3:00 PM',
    location: 'Salón y Albercas El Mirador, Calle 13 de Enero S/N, Nicolás Romero',
    mapEmbedUrl:
      'https://www.google.com/maps?q=Sal%C3%B3n+y+Albercas+El+Mirador+Calle+13+de+Enero+Nicol%C3%A1s+Romero&output=embed',
    mapLinkUrl:
      'https://www.google.com/maps/search/?api=1&query=Sal%C3%B3n+y+Albercas+El+Mirador+Calle+13+de+Enero+Nicol%C3%A1s+Romero',
  },
};

const toGoogleCalendarDate = (isoDate: string) =>
  new Date(isoDate).toISOString().replace(/[-:]/g, '').replace('.000', '');

export const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  `${invitation.headline} de ${invitation.shortName}`,
)}&dates=${toGoogleCalendarDate(invitation.eventDateIso)}/${toGoogleCalendarDate(
  invitation.eventEndIso,
)}&details=${encodeURIComponent(
  `Acompáñanos a celebrar los XV años de ${invitation.celebrant}. Ceremonia: ${invitation.ceremony.location}. Recepción: ${invitation.reception.location}.`,
)}&location=${encodeURIComponent(invitation.reception.location)}`;

export const heroImage = `${import.meta.env.BASE_URL}images/skarlet-portada.png`;
