import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tedderfield-history',
  templateUrl: './tedderfield-history.component.html',
  styleUrls: ['./tedderfield-history.component.scss']
})
export class TedderfieldHistoryComponent implements OnInit {

  public historyData = [
    {
      heading: 'Tedderfield Airpark: A Unique Aviation Community',
      paragraphs: [
        'Tedderfield Airpark is a private airfield situated just 20 kilometers from Sandton, South Africa. Offering a seamless blend of aviation and community inspired lifestyle, a haven where planes and pilots feel at home. With top notch class security, reliable infrastructure, and a close-knit aviation community, Tedderfield is a favoured destination for those seeking the luxury of having their aircraft close by and a vibrant aviator\'s lifestyle.'
      ]
    },
    {
      heading: 'History of Tedderfield Airpark',
      paragraphs: [
        'Tedderfield Airpark took its name from the surrounding area, and has its roots in South Africa\'s growing private and recreational aviation scene. Originally starting life out as a peach farm, it is now a registered airstrip for light aircraft enthusiasts.',
        'It has become a hub for pilots seeking a combination of rural tranquillity and access to their aircraft right from their doorstep.'
      ]
    },
    {
      heading: 'Development into an Airpark',
      paragraphs: [
        'Tedderfield\'s transformation from a peach farm into an airpark was driven by a passion for aviation. Full-title ownership is offered for hangars and stands, giving aviation enthusiasts the opportunity to not only store their planes but to "own a piece of the sky." The airpark is designed with convenience in mind, with direct taxiway access for personal hangars.',
        'The estate\'s entrances, (one entrance through a secure estate, directly off the R82), offers peace of mind and safe passage for all owners. The airpark community is not only functional but thrives on camaraderie, with pilots and aviation lovers alike enjoying a lifestyle focused on their shared passion.'
      ]
    },
    {
      heading: 'Sling Aircraft Factory',
      paragraphs: [
        'One of the most notable features of Tedderfield Airpark is its association with the Sling Aircraft Factory, a leading manufacturer of light aircraft. Founded by Mike Blyth and James Pitman, Sling Aircraft is based at Tedderfield, where it designs and builds the world-renowned Sling series of aircraft. These aircraft are celebrated for their reliability and performance.',
        'The Sling Aircraft Maintenance Organization, also based at Tedderfield, provides world-class maintenance services to ensure aircraft are kept in top condition. This adds to the convenience of being at Tedderfield, where maintenance staff are practically living on the runway.'
      ]
    },
    {
      heading: 'Sling Cycles',
      paragraphs: [
        'Sling Aircraft has also diversified into Sling Cycles, producing high-quality cycles. The e-bikes reflect Sling\'s innovative spirit and its dedication to building products that, much like their aircraft, are built for adventure. Afterall the Wright brothers began their lives, also building bicycles.'
      ]
    },
    {
      heading: 'Facilities and Runways',
      paragraphs: [
        'Tedderfield Airpark features a tarred runway (29/11 - 5164 feet) and a well maintained emergency grass runway (31/13 - 5135 feet) are suitable for various light aircraft.',
        'The clubhouse serves as a central hub for social events, management meetings, and aviation gatherings, bringing together our community of pilots for events that celebrate their shared passion for aviation.',
        'A major advantage of Tedderfield are the two boreholes, currently delivering over 750 000 litres per month whilst we also have 24/7 power supply, with a substantial diesel generator, ensuring no blackouts—more reliable than your morning coffee!',
        'A full-time maintenance manager and administrative personnel live on-site, ensuring the airpark runs smoothly and efficiently on a daily basis. This commitment to operational excellence ensures that the airpark remains a well-maintained and desirable place to be parto of.'
      ]
    },
    {
      heading: 'Estates and Surrounding Area',
      paragraphs: [
        'Tedderfield Airpark is surrounded by residential estates.'
      ]
    },
    {
      heading: 'Security and Access',
      paragraphs: [
        'Tedderfield Airpark takes security very seriously. It offers a high level security profile, ensuring that planes are as well-guarded as gold. A separate entrance provides a secure and exclusive access point through Tedderfield Estates. A night guard is employed to further guard our assets.'
      ]
    },
    {
      heading: 'Community and Aviation Events',
      paragraphs: [
        'Tedderfield fosters a sense of community, where "propeller talk is better than small talk." The airpark hosts a variety of aviation-related events, including fly-ins, and gatherings that bring the aviation community together. Pilots can often be heard swapping stories, making it a place "where every pilot has a story."'
      ]
    },
    {
      heading: 'Ongoing Development Projects',
      paragraphs: [
        'Tedderfield Airpark is continuously improving its infrastructure and environment. A current project focuses on greening the airfield by planting trees and removing invasive species, which is designed to enhance the airpark\'s natural beauty and sustainability.',
        'Another focus is long-term strategic planning, ensuring that the airpark maintains its strong financial health and regulatory compliance, and continues to develop over the next decade.'
      ]
    },
    {
      heading: 'Trustee and Governance Structure',
      paragraphs: [
        'The airpark is governed by a dedicated team of trustees who oversee various portfolios that ensure the airpark runs smoothly. These portfolios include legal, safety, infrastructure maintenance, secretarial, treasury, and marketing.',
        'Trustees are responsible for long-term planning, managing relationships with owners and suppliers, and ensuring compliance with regulatory requirements. The trustees also contribute to the airpark\'s 10-year strategic plan, which ensures the future growth and success of the community.'
      ]
    },
    {
      heading: 'Marketing and Community Engagement',
      paragraphs: [
        'The airpark\'s marketing emphasises the fun, secure, and community-oriented lifestyle that it offers. Tedderfield is portrayed not just an airpark but a way of life where planes and pilots are',
        'loved and cared for. The message is clear: “Come for the flying, stay for the humour and camaraderie amongst kindred spirits.”'
      ]
    },
    {
      heading: 'Conclusion',
      paragraphs: [
        'Tedderfield Airpark is more than just an airfield; it is a lifestyle community that integrates all things “aviation.”',
        'From its great facilities to the passionate community of pilots, Tedderfield stands out as a premier destination for aviation enthusiasts. The presence of the Sling Aircraft Factory, Sling Cycles, and the Sling Aircraft Maintenance Organisation adds prestige and convenience to the airpark, making it a hub of world class and recognised aviation innovation.',
        'With its secure, well-maintained infrastructure and forward-looking management, Tedderfield Airpark continues to soar as one of South Africa\'s leading residential airparks.'
      ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
