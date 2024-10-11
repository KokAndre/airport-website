import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  public faqSections = [
    {
      sectionTitle: 'Facilities & Clubhouse',
      questions: [
        {
          questionTitle: 'What facilities are available at Tedderfield Airpark?',
          questionAnswer: 'Tedderfield Airpark offers a clubhouse with a kitchen, pantry, unisex bathrooms, outdoor barbeque area, kitchen equipment, tables, seating, a projector, and more.',
          isPanelExpanded: false
        },
        {
          questionTitle: 'How do I book the clubhouse?',
          questionAnswer: 'To book the clubhouse, contact the Tedderfield Airpark Administration Office. Renters are responsible for cleaning up after events.',
          isPanelExpanded: false
        },
        {
          questionTitle: 'Are there any rules regarding the use of the clubhouse facilities?',
          questionAnswer: 'Yes, renters are responsible for cleaning up, and owners or renting pilots receive preference booking of the clubhouse.',
          isPanelExpanded: false
        },
        {
          questionTitle: 'Can non-aviation events be held at the airpark?',
          questionAnswer: 'Yes, the clubhouse can be used for non-aviation events. Booking must be made in advance through the Administration Office.',
          isPanelExpanded: false
        }
      ]
    },
    {
      sectionTitle: 'Security & Access',
      questions: [
        {
          questionTitle: "How is security managed at Tedderfield Airpark?",
          questionAnswer: "Security is managed by WAR Security, through the trustee responsible for this portfolio.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How do I get access to the North Eastern Gate?",
          questionAnswer: "Owners can get access, and remotes can be obtained from the Administration Office for R450. Remotes are recycled every 12 months through a forced code change.",
          isPanelExpanded: false
        },
        {
          questionTitle: "What is the airpark's policy on tailgating at the gates?",
          questionAnswer: "Tailgating is prohibited, and gates must be closed to prevent unauthorized access.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How are electricity payments managed for hangar owners?",
          questionAnswer: "Hangar owners use prepaid meters, which are presently also being upgraded.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How do I get a new remote for the gate if mine is lost or damaged?",
          questionAnswer: "You can get a new remote from the Administration Office for R450, which controls both the North Eastern and main gates. The North Eastern gate is only for the use by Owners and their immediate family members.",
          isPanelExpanded: false
        },
        {
          questionTitle: "What is the process for getting a gate access code for the North Eastern Gate?",
          questionAnswer: "Gate codes are changed monthly and communicated to owners on a specific WhatsApp Group, by the Administration Office in order to use the Tedderfield Estates Main Entrance.",
          isPanelExpanded: false
        },
        {
          questionTitle: "What steps are being taken to prevent unauthorized access to the airpark?",
          questionAnswer: "Gate codes are changed monthly, remotes are recycled annually, tailgating is strictly prohibited to maintain security, the GWEB access control mechanism for mobile device access is managed tightly, and more security measures will be introduced over time.",
          isPanelExpanded: false
        }
      ]
    },
    {
      sectionTitle: "Maintenance & Upgrades",
      questions: [
        {
          questionTitle: "How do I report a maintenance issue at the airpark?",
          questionAnswer: "Report maintenance issues to the Tedderfield Airpark Administration Office. Use the web site as well.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How is water supplied at the airpark?",
          questionAnswer: "The airpark uses two boreholes to supply water. One on the North side and the Other situated on the South side of the main runway.",
          isPanelExpanded: false
        },
        {
          questionTitle: "Can I use my own contractors for maintenance or upgrades on my hangar?",
          questionAnswer: "Yes, but contractors must follow Tedderfield Airpark regulations. Inform the Administration Office before beginning any work in order to follow the required protocols. A Builders Acknowledge Form and process is followed.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How do I request additional services or amenities at my hangar?",
          questionAnswer: "Please contact the Administration Office who will work through the trustees if required.",
          isPanelExpanded: false
        },
      ]
    },
    {
      sectionTitle: "Events & Activities",
      questions: [
        {
          questionTitle: "What type of events are held at Tedderfield Airpark?",
          questionAnswer: "Tedderfield Airpark hosts fly-ins, and other community gatherings. We often meet at Sean's memorial for evening sunsets and drinks.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How do I participate in Tedderfield Airpark's events?",
          questionAnswer: "Stay updated by contacting the Administration Office or checking community announcements on the web site.",
          isPanelExpanded: false
        },
        {
          questionTitle: "Can pilots who are not residents rent space at Tedderfield Airpark?",
          questionAnswer: "Yes, visiting pilots can rent hangar space, subject to availability, please contact the Administration Office.",
          isPanelExpanded: false
        }
      ]
    },
    {
      sectionTitle: "Business & Classifieds",
      questions: [
        {
          questionTitle: "How do I access the Tedderfield Airpark online classifieds to list or browse aviation items?",
          questionAnswer: "Owners can list aviation-related items or browse for equipment on the Tedderfield Classifieds Page via the web site. Contact the Administration Office for details.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How can I advertise my business or services within the airpark community?",
          questionAnswer: "Tedderfield Airpark has developed an online form to capture and promote owners' business and service offerings. These details are published on the web site.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How do I update my contact information with the airpark administration?",
          questionAnswer: "Notify the Administration Office via email or WhatsApp or phone to keep your contact information up to date.",
          isPanelExpanded: false
        }
      ]
    },
    {
      sectionTitle: "Development & Future Projects",
      questions: [
        {
          questionTitle: "What are the future development plans for Tedderfield Airpark?",
          questionAnswer: "Plans include upgrading gates, replacing prepaid meters, and tree planting projects to greenhe airfield amongst others. Should you wish to help in any way, please engage with the trustee responsible for the long term planning portfolio.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How do I sponsor or contribute to airpark development projects?",
          questionAnswer: "You can sponsor a tree for R300 each, or 10 trees for R3000 as part of our tree-planting initiative. ",
          isPanelExpanded: false
        }
      ]
    },
    {
      sectionTitle: "Communication & Protocols",
      questions: [
        {
          questionTitle: "What is the procedure for radio communication at Tedderfield Airpark?",
          questionAnswer: "Tedderfield has a protocol for using hand-held radios for emergencies and safety via specific grounds staff and trustees. The airfield manager plays a key role in coordinating communication.",
          isPanelExpanded: false
        },
        {
          questionTitle: "Is there aircraft maintenance available at the airpark?",
          questionAnswer: "Yes, Tedderfield Airpark is home to an Aircraft Maintenance Organization managed by Sling Aircraft.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How is fire safety managed at Tedderfield Airpark?",
          questionAnswer: "The airpark has a radio communication protocol for emergencies like fire safety, with key personnel coordinating responses and through well-defined policies.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How do I report a safety hazard or security breach?",
          questionAnswer: "Report hazards or breaches to the control room managed the trustee responsible for Security and this member will work with WAR Security or the Airfield Administration Office or via our Safety Officer.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How do I access the Tedderfield Airpark policy documents?",
          questionAnswer: "You can obtain policy documents though our web site.",
          isPanelExpanded: false
        }
      ]
    },
    {
      sectionTitle: "Purchasing & Renting",
      questions: [
        {
          questionTitle: "Can pilots who are not residents rent space at Tedderfield Airpark?",
          questionAnswer: "Yes, visiting pilots can rent hangar space and facilities, please contact our Administration Office or refer to our web site for specific rental details.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How can I join the Tedderfield Airpark community?",
          questionAnswer: "To join, you can purchase property or rent hangar space. Contact the Administration Office for more details.",
          isPanelExpanded: false
        },
        {
          questionTitle: "What is the cost of renting hangars or hangar stands at Tedderfield Airpark?",
          questionAnswer: "Contact the Administration Office for rental rates and availability for hangars and stands.",
          isPanelExpanded: false
        }
      ]
    },
    {
      sectionTitle: "General Information",
      questions: [
        {
          questionTitle: "Can I list items for sale at Tedderfield Airpark? ",
          questionAnswer: "Yes, owners can list aviation-related items on the airpark's Classifieds Page. ",
          isPanelExpanded: false
        },
        {
          questionTitle: "What makes Tedderfield Airpark unique?",
          questionAnswer: "Tedderfield Airpark has a rich history, with its origins as a peach farm. It offers modern facilities, a vibrant community, and a focus on aviation.",
          isPanelExpanded: false
        },
        {
          questionTitle: "What are the rules for gate access and security at Tedderfield Airpark?",
          questionAnswer: "Only owners can access the North Eastern Gate with signed-for remotes, and gate codes are updated monthly.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How is the airfield's dry grass managed during winter?",
          questionAnswer: "The airfield implements regular grass cutting and monitoring during winter to prevent hazards and also follows a well-designed fire break burning policy.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How are disputes or policy changes handled within the community?",
          questionAnswer: "Disputes and policy changes are to be raised to any one of the Trustees for action. You can also raise an issue on the web site.",
          isPanelExpanded: false
        },
        {
          questionTitle: "How do I stay informed about airpark news and updates?",
          questionAnswer: "You can stay updated through communication channels or by referring to the web site.",
          isPanelExpanded: false
        },
        {
          questionTitle: "What is the procedure for aviation-related emergencies at Tedderfield Airpark?",
          questionAnswer: "Aviation emergencies are managed through the airpark's radio communication protocol, coordinated by the airfield safety trustee.",
          isPanelExpanded: false
        },
        {
          questionTitle: "What are the rules for flying drones at the airpark?",
          questionAnswer: "Drone flying is regulated to avoid interference with aircraft. Contact the airfield safety officer in the first instance.",
          isPanelExpanded: false
        },
      ]
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
