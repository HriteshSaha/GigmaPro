'use strict';

const bcrypt = require('bcryptjs');

// Demo password for every seeded account — shown in the README so reviewers can log in.
const DEMO_PASSWORD = 'Passw0rd!123';

const CLIENTS = [
  { firstName: 'Ananya', lastName: 'Sharma', email: 'ananya.sharma@nimbuscreative.io', organization: 'Nimbus Creative Studio' },
  { firstName: 'Rohan', lastName: 'Mehta', email: 'rohan.mehta@finpaytech.io', organization: 'FinPay Technologies' },
  { firstName: 'Priya', lastName: 'Verma', email: 'priya.verma@urbanrootsco.com', organization: 'Urban Roots Co.' }
];

const FREELANCERS = [
  { firstName: 'Arjun', lastName: 'Nair', email: 'arjun.nair@freelance.dev', workExperience: 4.5, description: 'Full-stack developer specializing in Node.js and React.' },
  { firstName: 'Kavya', lastName: 'Iyer', email: 'kavya.iyer@freelance.dev', workExperience: 2.0, description: 'Front-end developer focused on accessible, responsive UI.' },
  { firstName: 'Sameer', lastName: 'Khan', email: 'sameer.khan@freelance.dev', workExperience: 6.0, description: 'Backend engineer with a focus on APIs and databases.' },
  { firstName: 'Neha', lastName: 'Kapoor', email: 'neha.kapoor@freelance.dev', workExperience: 3.0, description: 'Graphic designer and brand identity specialist.' }
];

const SKILLS = ['JavaScript', 'Node.js', 'React', 'UI/UX Design', 'MySQL', 'WordPress', 'Graphic Design', 'SEO', 'Content Writing'];

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);

    await queryInterface.bulkInsert('users', [
      ...CLIENTS.map(c => ({
        firstName: c.firstName,
        lastName: c.lastName,
        email: c.email,
        password: hashedPassword,
        role: 'Client',
        organization: c.organization,
        isActive: true,
        createdAt: now,
        updatedAt: now
      })),
      ...FREELANCERS.map(f => ({
        firstName: f.firstName,
        lastName: f.lastName,
        email: f.email,
        password: hashedPassword,
        role: 'Freelancer',
        description: f.description,
        workExperience: f.workExperience,
        isActive: true,
        createdAt: now,
        updatedAt: now
      }))
    ], {});

    const [users] = await queryInterface.sequelize.query('SELECT id, email FROM users');
    const userIdByEmail = Object.fromEntries(users.map(u => [u.email, u.id]));

    await queryInterface.bulkInsert('skills', SKILLS.map(name => ({
      name,
      createdAt: now,
      updatedAt: now
    })), {});

    const [skills] = await queryInterface.sequelize.query('SELECT id, name FROM skills');
    const skillIdByName = Object.fromEntries(skills.map(s => [s.name, s.id]));

    const nimbusId = userIdByEmail['ananya.sharma@nimbuscreative.io'];
    const finpayId = userIdByEmail['rohan.mehta@finpaytech.io'];
    const urbanRootsId = userIdByEmail['priya.verma@urbanrootsco.com'];

    const PROJECTS = [
      {
        title: 'E-commerce Website Redesign',
        description: 'Redesign and rebuild our online storefront with a modern, mobile-friendly UI, a faster checkout flow, and better product search.',
        budget: 45000,
        category: 'Web Development',
        clientUserId: nimbusId,
        status: 'open',
        skills: ['JavaScript', 'React', 'Node.js', 'MySQL']
      },
      {
        title: 'Mobile Banking App UI',
        description: 'Design a clean, trustworthy UI for a mobile banking app covering onboarding, transfers, and statements.',
        budget: 60000,
        category: 'UI/UX Design',
        clientUserId: finpayId,
        status: 'open',
        skills: ['UI/UX Design']
      },
      {
        title: 'Brand Identity & Logo Design',
        description: 'Create a full brand identity package: logo, color palette, typography, and a short brand guideline document.',
        budget: 15000,
        category: 'Graphic Design',
        clientUserId: urbanRootsId,
        status: 'closed',
        skills: ['Graphic Design']
      },
      {
        title: 'SEO Optimization Campaign',
        description: 'Audit our site and run a 3-month SEO campaign to improve organic search rankings for our core product pages.',
        budget: 20000,
        category: 'Digital Marketing',
        clientUserId: finpayId,
        status: 'open',
        skills: ['SEO']
      },
      {
        title: 'Company Blog Content Writing',
        description: 'Write eight 1000-word blog posts per month covering industry trends, tutorials, and product updates.',
        budget: 8000,
        category: 'Content Writing',
        clientUserId: nimbusId,
        status: 'open',
        skills: ['Content Writing']
      }
    ];

    await queryInterface.bulkInsert('projects', PROJECTS.map(p => ({
      title: p.title,
      description: p.description,
      budget: p.budget,
      category: p.category,
      clientUserId: p.clientUserId,
      status: p.status,
      createdAt: now,
      updatedAt: now
    })), {});

    const [projects] = await queryInterface.sequelize.query('SELECT id, title FROM projects');
    const projectIdByTitle = Object.fromEntries(projects.map(p => [p.title, p.id]));

    await queryInterface.bulkInsert('projectRequireSkills', PROJECTS.flatMap(p =>
      p.skills.map(skillName => ({
        projectId: projectIdByTitle[p.title],
        skillId: skillIdByName[skillName],
        createdAt: now,
        updatedAt: now
      }))
    ), {});

    const arjunId = userIdByEmail['arjun.nair@freelance.dev'];
    const kavyaId = userIdByEmail['kavya.iyer@freelance.dev'];
    const sameerId = userIdByEmail['sameer.khan@freelance.dev'];
    const nehaId = userIdByEmail['neha.kapoor@freelance.dev'];

    await queryInterface.bulkInsert('userHasSkills', [
      { userId: arjunId, skillId: skillIdByName['JavaScript'], createdAt: now, updatedAt: now },
      { userId: arjunId, skillId: skillIdByName['Node.js'], createdAt: now, updatedAt: now },
      { userId: arjunId, skillId: skillIdByName['React'], createdAt: now, updatedAt: now },
      { userId: kavyaId, skillId: skillIdByName['React'], createdAt: now, updatedAt: now },
      { userId: kavyaId, skillId: skillIdByName['UI/UX Design'], createdAt: now, updatedAt: now },
      { userId: sameerId, skillId: skillIdByName['Node.js'], createdAt: now, updatedAt: now },
      { userId: sameerId, skillId: skillIdByName['MySQL'], createdAt: now, updatedAt: now },
      { userId: nehaId, skillId: skillIdByName['Graphic Design'], createdAt: now, updatedAt: now }
    ], {});

    const inTwoWeeks = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    const inThreeWeeks = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000);
    const inOneMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const BIDS = [
      {
        userId: arjunId,
        projectTitle: 'E-commerce Website Redesign',
        bidAmmount: 42000,
        proposalDetails: "I've built three e-commerce storefronts with React and Node.js in the last two years, including one migrating from a legacy jQuery site. I can deliver a working checkout flow within the first two weeks.",
        estimatedDateOfDelivery: inOneMonth
      },
      {
        userId: sameerId,
        projectTitle: 'E-commerce Website Redesign',
        bidAmmount: 47000,
        proposalDetails: "My focus would be on the backend: a clean REST API, optimized MySQL queries, and caching for the product catalog so search stays fast as the catalog grows.",
        estimatedDateOfDelivery: inOneMonth
      },
      {
        userId: kavyaId,
        projectTitle: 'Mobile Banking App UI',
        bidAmmount: 55000,
        proposalDetails: "I've designed two fintech apps before and understand the extra care needed around trust, clarity, and accessibility in banking UI. I'll share wireframes within the first week.",
        estimatedDateOfDelivery: inThreeWeeks
      },
      {
        userId: nehaId,
        projectTitle: 'Brand Identity & Logo Design',
        bidAmmount: 14000,
        proposalDetails: "I'll start with three distinct logo directions based on a short discovery call, then refine the one you like into a full brand guideline.",
        estimatedDateOfDelivery: inTwoWeeks
      },
      {
        userId: arjunId,
        projectTitle: 'Company Blog Content Writing',
        bidAmmount: 7500,
        proposalDetails: "I regularly write technical content for developer audiences and can turn around well-researched, SEO-aware posts on a consistent monthly schedule.",
        estimatedDateOfDelivery: inOneMonth
      }
    ];

    await queryInterface.bulkInsert('bids', BIDS.map(b => ({
      bidAmmount: b.bidAmmount,
      proposalDetails: b.proposalDetails,
      submittedAt: now,
      estimatedDateOfDelivery: b.estimatedDateOfDelivery,
      userId: b.userId,
      projectId: projectIdByTitle[b.projectTitle],
      createdAt: now,
      updatedAt: now
    })), {});

    // The "Brand Identity & Logo Design" project is already closed/assigned to Neha.
    await queryInterface.bulkInsert('contracts', [{
      startDate: now,
      endDate: inTwoWeeks,
      budget: 14000,
      projectId: projectIdByTitle['Brand Identity & Logo Design'],
      freelancerUserId: nehaId,
      clientUserId: urbanRootsId,
      paymentStatus: 'payment pending',
      status: 'active',
      createdAt: now,
      updatedAt: now
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contracts', null, {});
    await queryInterface.bulkDelete('bids', null, {});
    await queryInterface.bulkDelete('userHasSkills', null, {});
    await queryInterface.bulkDelete('projectRequireSkills', null, {});
    await queryInterface.bulkDelete('projects', null, {});
    await queryInterface.bulkDelete('skills', null, {});
    await queryInterface.bulkDelete('users', {
      email: [...CLIENTS, ...FREELANCERS].map(u => u.email)
    }, {});
  }
};
