import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-your-trustees',
  templateUrl: './your-trustees.component.html',
  styleUrls: ['./your-trustees.component.scss']
})
export class YourTrusteesComponent implements OnInit {
  // ../../../../../assets/members/your-trustess/

  public trusteeData = [
    {
      id: 1,
      name: 'Nic Walters',
      born: 'Cape Town',
      iFly: 'Gyros and tail dragger bush plane.',
      loveTedderfieldBecause: "It feels like you are out in the country, the sunsets and sunrises are awesome, it just feels 'right.'",
      keepMyselfBusyWith: 'Reading a lot, motor bike riding, visiting friends.',
      inspiresYou: 'Mostly the people I choose to work with.',
      stressesMostAboutTedderfield: 'Level of apathy and level of involvement. I have met many stunning folk. I just wish we could all put our grievances aside and learn to spread a lot more love and respect for each other.',
      mustUsefullTalent: 'Organisational skills combined with a stick with it attitude.',
      distanceDriveFromTedderfield: "About 20 km's, but I try and spend as much time at my hangar.",
      immediateFamily: "All my immediate family are still in Cape Town, but I have wonderful friends up here in JHB, some of whom I even classify as 'family.'",
      imageName: '../../../../../assets/members/your-trustess/Nic Walters - Photograph.jpg',
      isExpanded: true
    },
    {
      id: 2,
      name: 'Fred Swanepoel',
      born: 'Johannesburg, South Africa',
      iFly: '1. KFA Safari 915 TSi &nbsp; ZU-ITN<br>2. Cirrus SR22T &nbsp; ZS-ALI',
      loveTedderfieldBecause: 'When I get there, I immediately feel relaxed. I absolutely love aviation and the sense of community at the airfield. I also love the “farm” feeling and the open skies view.',
      keepMyselfBusyWith: 'Working in Information Technology, reading, motor cycling, travelling, spending time with my family and friends.',
      inspiresYou: 'Many people, but some of these have made the greatest impression: Nelson Mandela, Anton and Johan Rupert, Mike Brown, Elon Musk, Bill Gates, Richard Branson and Steve Jobs.',
      stressesMostAboutTedderfield: "Selfish people who don't understand or don't work for the common good of developing the airfield to its real potential.",
      mustUsefullTalent: 'Foresight and an entrepreneurial spirit.',
      distanceDriveFromTedderfield: '29km',
      immediateFamily: 'I went to school at Florida Hoërskool (ala Wahl Bartm ann, Harry Viljoen & Elton Jantjies). I then did two years of military service in the Signals Corps and 34 Batallion, whereafter I studied Financial Accounting (Hons) at University of Stellenbosch.<br><br>In 1995, I completed my MBA at Wits and I completed AMP at Harvard Business School in 2007.<br><br>I have worked at Stellenbosch University (1997), the Small Business Development Corporation (now Business Partners) (1998-1996) and Nedbank 1996 to present), where I am the Chie f Information Officer and a member of the Executive Committee.<br><br>I am married to Colette, who shares and enjoys all my interests. I also have two boys Jacques (25) and Brendan (22) from a previous marriage.<br><br>Jacques is working in South Korea and Brendan is studying at Stellenbosch University.',
      imageName: '',
      isExpanded: true
    },
    {
      id: 3,
      name: 'James Pitman',
      born: 'Durban, Kwa-Zulu Natal',
      iFly: 'Slings, and sometimes trikes, paragliders, parachutes and base rigs',
      loveTedderfieldBecause: "It's out in the veld, it's quiet and informal, there's no ATC and it's well maintained.",
      keepMyselfBusyWith: 'Travelling, riding my bicycle, reading, rock climbing, eating, drinking (and talking shit)',
      inspiresYou: 'The people in Jackson Squatter Camp. And many of my business employees',
      stressesMostAboutTedderfield: 'The unnecessary conflict between owners',
      mustUsefullTalent: 'My tea brewing skills, especially on a porta-ledge, on a cliff face',
      distanceDriveFromTedderfield: '25 minutes',
      immediateFamily: "I'm an owner of Sling Aircraft, an avid aviator, a proud South African, a family man and I love physical adventure and the outdoor life. I fear for the future of our country, but I'm a congenital optimist, so I won't give up hoping and praying.",
      imageName: '../../../../../assets/members/your-trustess/James Pitmn - Photograph.jpg',
      isExpanded: true
    },
    {
      id: 4,
      name: 'Ian Beaton',
      born: 'Johannesburg',
      iFly: 'An RV7 ZU-FSG got about 500 hours on it, learning to fly aerobatics taught me more in six months than several years of simply flying. <br><br>Pegasus, a Piper Colt which has been converted to a taildragger ZS-UEB.',
      loveTedderfieldBecause: 'It is easily accessible, and it meets my needs.',
      keepMyselfBusyWith: 'Building aeroplanes, I have built our RV7, a six year project and we will soon hopefully be flying an RV10 too, which is in the final stages of the build process and nudging a six year project.',
      inspiresYou: 'My children.',
      stressesMostAboutTedderfield: 'Owners not complying with simple rules, like building on common property without first seeking the appropriate permission and thereby disrespecting the rights of all others on the field.',
      mustUsefullTalent: 'I can juggle sometimes.',
      distanceDriveFromTedderfield: '30 km',
      immediateFamily: 'Wife and three children',
      imageName: '../../../../../assets/members/your-trustess/Ian Beaton - Photograph.jpg',
      isExpanded: true
    },
    {
      id: 5,
      name: 'Alan Stewart',
      born: '02/09/1966',
      iFly: 'RV9a / Bushcat',
      loveTedderfieldBecause: 'The Vibe / The Sunsets',
      keepMyselfBusyWith: 'Cheetah Technologies, Manufacture range OEM products',
      inspiresYou: '',
      stressesMostAboutTedderfield: 'Nothing',
      mustUsefullTalent: 'Get Stuff Done.',
      distanceDriveFromTedderfield: '0 Km',
      immediateFamily: 'Cathy Stewart Wife , 1 son 2 grandkids. <br>Aviation whenever I get a chance, <br>Always willing to assist no matter the task <br>I LOVE South Africa',
      imageName: '../../../../../assets/members/your-trustess/alan Stewart - Photograph.jfif',
      isExpanded: true
    },
    {
      id: 6,
      name: 'Catherine Margaret Stewart',
      born: '25/12/1966',
      iFly: 'Sling 2 and still hear the Top Gun song when I take off.',
      loveTedderfieldBecause: 'Of the diverse group of people and the well-organized/run Airfield',
      keepMyselfBusyWith: 'Supposed to be retired but find myself coaching small business on growth strategies and building leadership in their management teams. Painting, reading, travelling, spending time with friends and family, doing Tedderfield minutes and still on various committees that are leftovers from my full-time working days.',
      inspiresYou: 'Too many but not one individual.',
      stressesMostAboutTedderfield: 'Politics and negative procrastinators.',
      mustUsefullTalent: "Seeing opportunities and room for growth where individuals that can't see it themselves.",
      distanceDriveFromTedderfield: '0km',
      immediateFamily: "Married to Alan, one son (39), two granddaughters (8 & 10). Spent the last 34 years in a construction related field (fire engineering), Our son runs an operational division of Alan's engineering business and our granddaughters speak German as a first language. We have the best daughter-inlaw in the world (not that I am biased), We also have a close-knit group of friends that are amazing.",
      imageName: '../../../../../assets/members/your-trustess/Cathy Stewart - Photograph.jpg',
      isExpanded: true
    },
  ]

  constructor() { }

  ngOnInit() {
  }

  public togglePannel(indexToToggle: number) {
    this.trusteeData[indexToToggle].isExpanded = !this.trusteeData[indexToToggle].isExpanded;
  }

}
