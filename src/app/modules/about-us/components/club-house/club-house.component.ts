import { Component, OnInit } from '@angular/core';
import { AppRoutes } from 'src/app/enums/app.enums';

@Component({
  selector: 'app-club-house',
  templateUrl: './club-house.component.html',
  styleUrls: ['./club-house.component.scss']
})
export class ClubHouseComponent implements OnInit {
  public navigationRoutes = AppRoutes;

  public clubhouseData = [
    {
      heading: 'Welcome to the Tedderfield Clubhouse, where rustic charm meets modern convenience!',
      paragraphs: [
        'This cozy thatch-and-brick gem started its journey thanks to the proceeds from an honesty bar at our old Solitude airfield—so yes, it\'s got history and heart. Built right after the runway, it was one of the first places to rise from the old peach farm that used to call Tedderfield home.'
      ],
      isExpanded: false
    },
    {
      heading: 'What can you expect?',
      paragraphs: [
        'Well, we\'ve got a kitchen equipped for your culinary adventures, a pantry to stash your goodies, two unisex bathrooms (so no waiting in line), and a sprawling outdoor BBQ area perfect for grilling up those post-flight steaks.',
        'Need to impress with your presentation? We\'ve got you covered with a snazzy overhead projector and an automatic projection screen that will make your slides look like Hollywood magic.',
        'Grab a seat at one of the tables, pour yourself a drink, and enjoy the relaxed vibe.'
      ],
      isExpanded: false
    },
    {
      heading: 'The best part?',
      paragraphs: [
        'You can rent it for a nominal fee!',
        'Just remember—cleaning up is your responsibility.'
      ],
      isExpanded: false
    },
    {
      heading: 'Want to book it?',
      paragraphs: [
        'Shoot an enquiry over to our friendly administration office, and you\'re all set to enjoy a slice of Tedderfield paradise.',
      ],
      isExpanded: false
    },
    {
      heading: 'Fun, functional, and ready for your next gathering — just like Tedderfield itself!',
      isRedText: true,
      isExpanded: false
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  public togglePannel(indexToToggle: number) {
    if (indexToToggle < (this.clubhouseData.length - 1)) {
      this.clubhouseData[indexToToggle].isExpanded = !this.clubhouseData[indexToToggle].isExpanded;
    }
  }

}
