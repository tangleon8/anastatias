// Register preview stylesheet(s)
CMS.registerPreviewStyle('/admin/preview.css');

const h = React.createElement;

function Wrapper({ children }) {
  return h('div', { className: 'container' }, children);
}

function Hero({ title, subtitle, signupUrl, donateUrl }) {
  return h('section', { className: 'hero section' },
    h('div', { className: 'container' },
      h('h1', null, title || 'Shining a light on mental health'),
      h('p', { className: 'section-sub' }, subtitle || ''),
      h('div', { className: 'cta-row' },
        signupUrl && h('a', { className: 'btn btn-primary', href: '#' }, 'Sign Up for Our Event'),
        donateUrl && h('a', { className: 'btn btn-secondary', href: '#' }, 'Donate')
      )
    )
  );
}

function About({ eyebrow, title, p1, p2 }) {
  return h('section', { className: 'section' },
    h(Wrapper, null,
      h('div', { className: 'section-head' },
        h('div', { className: 'eyebrow' }, eyebrow || 'About Anastasia’s Light'),
        h('h2', { className: 'section-title' }, title || 'Honoring a daughter. Lifting our community.'),
        h('p', { className: 'section-sub' }, 'Preview of the About content below')
      ),
      h('div', { className: 'card' },
        h('p', null, p1 || ''),
        h('p', null, p2 || '')
      )
    )
  );
}

function Volunteers({ items }) {
  return h('section', { className: 'section' },
    h(Wrapper, null,
      h('h3', { className: 'events-subhead' }, 'Volunteers'),
      h('div', { className: 'vol-grid' },
        (items || []).map((v, i) => (
          h('article', { key: i, className: 'card' },
            h('div', { className: 'avatar' }, h('img', { src: v.avatarUrl || '', alt: (v.name || 'Volunteer') + ' avatar', style: { width: '100%', height: '100%', objectFit: 'cover' } })),
            h('h4', null, v.name || ''),
            h('div', { className: 'role' }, v.role || ''),
            h('p', { className: 'blurb' }, v.blurb || '')
          )
        ))
      )
    )
  );
}

function Events({ upcoming, past }) {
  const Card = (ev, key) => h('article', { key, className: 'card' },
    h('h4', null, ev.title || ''),
    h('div', { className: 'meta' },
      ev.date && h('div', null, h('b', null, 'Date: '), ev.date),
      ev.time && h('div', null, h('b', null, 'Time: '), ev.time),
      ev.location && h('div', null, h('b', null, 'Location: '), ev.location),
      ev.beneficiary && h('div', null, h('b', null, 'Benefitting: '), ev.beneficiary)
    ),
    h('div', { className: 'event-actions' },
      ev.registerUrl && h('a', { className: 'btn btn-primary', href: '#' }, 'Register')
    ),
    ev.note && h('p', { className: 'note' }, ev.note)
  );

  return h('section', { className: 'section' },
    h(Wrapper, null,
      (upcoming && upcoming.length) && [
        h('h3', { key: 'uh', className: 'events-subhead' }, 'Upcoming Events'),
        h('div', { key: 'ug', className: 'events-grid' }, upcoming.map(Card))
      ],
      (past && past.length) && [
        h('h3', { key: 'ph', className: 'events-subhead' }, 'Past Events'),
        h('div', { key: 'pg', className: 'events-grid' }, past.map(Card))
      ]
    )
  );
}

function Gallery({ items }) {
  return h('section', { className: 'section' },
    h(Wrapper, null,
      h('h3', { className: 'events-subhead' }, 'Gallery'),
      h('div', { className: 'gallery-grid' },
        (items || []).map((img, i) => (
          h('div', { key: i, className: 'card' },
            h('img', { src: img.url || '', alt: img.alt || '', style: { width: '100%', borderRadius: '0.75rem' } })
          )
        ))
      )
    )
  );
}

function Contact({ generalEmail, sponsorsEmail, phoneDisplay }) {
  return h('section', { className: 'section' },
    h(Wrapper, null,
      h('div', { className: 'card' },
        h('h3', null, 'Contact Details'),
        h('p', null, h('b', null, 'General Inquiries: '), generalEmail || ''),
        h('p', null, h('b', null, 'Sponsors: '), sponsorsEmail || ''),
        h('p', null, h('b', null, 'Phone: '), phoneDisplay || '')
      )
    )
  );
}

// General (site.json)
CMS.registerPreviewTemplate('general', ({ entry }) => {
  const data = entry.get('data') || new Map();
  return h('div', null,
    Hero({
      title: data.get('heroTitle'),
      subtitle: data.get('heroSubtitle'),
      signupUrl: data.get('signupUrl'),
      donateUrl: data.get('donateUrl')
    }),
    About({
      eyebrow: data.get('aboutEyebrow'),
      title: data.get('aboutTitle'),
      p1: data.get('aboutP1'),
      p2: data.get('aboutP2')
    })
  );
});

// Events (events.json)
CMS.registerPreviewTemplate('events', ({ entry }) => {
  const data = entry.get('data');
  const upcoming = data && data.get('upcoming') ? data.get('upcoming').toJS() : [];
  const past = data && data.get('past') ? data.get('past').toJS() : [];
  return h(Events, { upcoming, past });
});

// Volunteers (volunteers.json)
CMS.registerPreviewTemplate('volunteers', ({ entry }) => {
  const data = entry.get('data');
  const volunteers = data && data.get('volunteers') ? data.get('volunteers').toJS() : [];
  return h(Volunteers, { items: volunteers });
});

// Gallery (gallery.json)
CMS.registerPreviewTemplate('gallery', ({ entry }) => {
  const data = entry.get('data');
  const items = data && data.get('items') ? data.get('items').toJS() : [];
  return h(Gallery, { items });
});

// Contact (contact.json)
CMS.registerPreviewTemplate('contact', ({ entry }) => {
  const data = entry.get('data') || new Map();
  return h(Contact, {
    generalEmail: data.get('generalEmail'),
    sponsorsEmail: data.get('sponsorsEmail'),
    phoneDisplay: data.get('phoneDisplay')
  });
});

