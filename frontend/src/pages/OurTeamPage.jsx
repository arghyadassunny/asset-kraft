import React from 'react';
import { Linkedin } from 'lucide-react';

const teamData = {
  leadership: [
    {
      id: 1,
      name: 'Ashis Kumar Dey',
      role: 'Managing Director & CEO',
      image: 'https://www.assetkraft.com/ashis_kumar_dey.jpg',
      linkedin: '#'
    },
    {
      id: 2,
      name: 'Amit Rathi',
      role: 'Director',
      image: 'https://www.assetkraft.com/amit_rathi.jpg',
      linkedin: '#'
    },
    {
      id: 3,
      name: 'Sanjeev Kumar Mundhra',
      role: 'Director',
      image: 'https://www.assetkraft.com/sanjeev_mundhra.jpg',
      linkedin: '#'
    }
  ],
  growthTeam: [
    {
      id: 4,
      name: 'Sudit Bhattacharjee',
      role: 'Manager',
      image: 'https://www.assetkraft.com/sudit.jpg'
    },
    {
      id: 5,
      name: 'Papai Paul',
      role: 'Manager',
      image: 'https://www.assetkraft.com/papai.jpg'
    },
    {
      id: 6,
      name: 'Piyush Goenka',
      role: 'Manager',
      image: 'https://www.assetkraft.com/piyush.jpg'
    },
    {
      id: 7,
      name: 'Tomeca Mukherjee',
      role: 'Assistant Manager',
      image: 'https://www.assetkraft.com/tomeca.jpg'
    }
  ],
  nextLine: [
    {
      id: 8,
      name: 'Yogesh Bhojak',
      role: 'Assistant Manager',
      image: 'https://www.assetkraft.com/yogesh.jpg'
    },
    {
      id: 9,
      name: 'Subhomay Dey',
      role: 'Assistant Manager',
      image: 'https://www.assetkraft.com/subhomay.jpg'
    },
    {
      id: 10,
      name: 'Rahul Sharma',
      role: 'Assistant Manager',
      image: 'https://www.assetkraft.com/rahul.jpg'
    }
  ],
  behindTheScene: [
    {
      id: 11,
      name: 'Sukanta Maity',
      role: 'Senior Manager',
      image: 'https://www.assetkraft.com/sukanta.jpg'
    },
    {
      id: 12,
      name: 'Anup Kumar Das',
      role: 'Senior Manager',
      image: 'https://www.assetkraft.com/anup.jpg'
    },
    {
      id: 13,
      name: 'Sumona Mukherjee',
      role: 'Manager',
      image: 'https://www.assetkraft.com/sumona.jpg'
    },
    {
      id: 14,
      name: 'Kiran Mishra',
      role: 'Manager',
      image: 'https://www.assetkraft.com/kiran.jpg'
    },
    {
      id: 15,
      name: 'Prerona Chakraborty',
      role: 'Manager',
      image: 'https://www.assetkraft.com/prerona.jpg'
    },
    {
      id: 16,
      name: 'Sneha Sarkar',
      role: 'Manager',
      image: 'https://www.assetkraft.com/sneha.jpg'
    },
    {
      id: 17,
      name: 'Anil Prajapati',
      role: 'Manager',
      image: 'https://www.assetkraft.com/anil.jpg'
    },
    {
      id: 18,
      name: 'Kuheli Saha',
      role: 'Assistant Manager',
      image: 'https://www.assetkraft.com/kuheli.jpg'
    }
  ],
  insuranceClaim: [
    {
      id: 19,
      name: 'Kamlesh Kumar Mishra',
      role: 'Senior Manager',
      image: 'https://www.assetkraft.com/kamlesh.jpg'
    }
  ],
  equityDesk: [
    {
      id: 20,
      name: 'Sanchita Mitra',
      role: 'Senior Manager',
      image: 'https://www.assetkraft.com/sanchita.jpg'
    },
    {
      id: 21,
      name: 'Suhrid Maji',
      role: 'Senior Manager',
      image: 'https://www.assetkraft.com/surhid.jpg'
    },
    {
      id: 22,
      name: 'Abhijit Dey',
      role: 'Assistant Manager',
      image: 'https://www.assetkraft.com/abhijit.jpg'
    }
  ],
  hrAccounts: [
    {
      id: 23,
      name: 'Deepanwita Maitra',
      role: 'HR & Admin',
      image: 'https://www.assetkraft.com/deepanwita.jpg'
    },
    {
      id: 24,
      name: 'Ritusree Das',
      role: 'Admin Manager',
      image: 'https://www.assetkraft.com/ritusree.jpg'
    },
    {
      id: 25,
      name: 'Sourin Sarkar',
      role: 'Assistant Manager',
      image: 'https://www.assetkraft.com/sourin.jpg'
    }
  ],
  support: [
    {
      id: 26,
      name: 'Jayanta Mukherjee',
      role: 'Support Team',
      image: 'https://www.assetkraft.com/jayanta.jpg'
    },
    {
      id: 27,
      name: 'Sandip Paul',
      role: 'Support Team',
      image: 'https://www.assetkraft.com/sandip.jpg'
    },
    {
      id: 28,
      name: 'Krishna Prasad',
      role: 'Support Team',
      image: 'https://www.assetkraft.com/krishna.jpg'
    }
  ]
};

const TeamMemberCard = ({ member }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-teal-300">
    <div className="relative h-72 overflow-hidden bg-slate-100">
      <img 
        src={member.image} 
        alt={member.name}
        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x400?text=' + member.name.split(' ')[0];
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div className="p-6 bg-gradient-to-br from-teal-50/50 to-white">
      <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-teal-600 transition-colors">
        {member.name}
      </h3>
      <p className="text-teal-600 font-semibold text-sm mb-3">
        {member.role}
      </p>
      {member.linkedin && (
        <a 
          href={member.linkedin}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors text-sm"
        >
          <Linkedin size={16} />
          <span>Connect on LinkedIn</span>
        </a>
      )}
    </div>
  </div>
);

const TeamSection = ({ title, members, columns = 3 }) => (
  <div className="mb-16">
    <h2 className="text-3xl font-bold text-slate-900 mb-8 pb-3 border-b-2 border-teal-600 inline-block">
      {title}
    </h2>
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-8 mt-8`}>
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  </div>
);

const OurTeamPage = () => {
  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Meet <span className="text-teal-600">Our Team</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            30+ dedicated professionals with 20+ years of combined experience, committed to your financial success
          </p>
        </div>

        {/* Leadership */}
        <TeamSection 
          title="Leadership" 
          members={teamData.leadership}
          columns={3}
        />

        {/* Growth Team */}
        <TeamSection 
          title="Growth Team" 
          members={teamData.growthTeam}
          columns={4}
        />

        {/* Next Line */}
        <TeamSection 
          title="Next Line" 
          members={teamData.nextLine}
          columns={3}
        />

        {/* Behind the Scene */}
        <TeamSection 
          title="Behind the Scene" 
          members={teamData.behindTheScene}
          columns={4}
        />

        {/* Insurance Claim Desk */}
        <TeamSection 
          title="Insurance Claim Desk" 
          members={teamData.insuranceClaim}
          columns={3}
        />

        {/* Equity Desk */}
        <TeamSection 
          title="Equity Desk" 
          members={teamData.equityDesk}
          columns={3}
        />

        {/* HR & Accounts */}
        <TeamSection 
          title="HR & Accounts" 
          members={teamData.hrAccounts}
          columns={3}
        />

        {/* Support Team */}
        <TeamSection 
          title="Support Team" 
          members={teamData.support}
          columns={3}
        />

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Want to Join Our Team?</h2>
          <p className="text-xl text-teal-50 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to join our mission of creating financial freedom for families
          </p>
          <a 
            href="https://orufybookings.com/asset-kraft/30-min-intro-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-teal-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 hover:text-slate-900 transition-all duration-300 shadow-xl"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default OurTeamPage;