import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/enums/app.enums';

@Component({
  selector: 'app-gallery-landing',
  templateUrl: './gallery-landing.component.html',
  styleUrls: ['./gallery-landing.component.scss']
})
export class GalleryLandingComponent implements OnInit {


  // TODO: Remove the below test data and get from DB
  public isLoggedInUserAdmin = true;
  public galleryData = [
    {
      sectionId: 1,
      title: 'Section - Peter',
      description: 'This is the description for section - Peter',
      isDarkSection: false,
      images: [
        {
          imageId: 1,
          imageName: 'Image 1',
          imagePath: 'assets/test-gallery-images/image1.jpeg'
        },
        {
          imageId: 2,
          imageName: 'Image 2',
          imagePath: 'assets/test-gallery-images/image2.jpeg'
        },
        {
          imageId: 3,
          imageName: 'Image 3',
          imagePath: 'assets/test-gallery-images/image3.jpeg'
        },
        {
          imageId: 4,
          imageName: 'Image 4',
          imagePath: 'assets/test-gallery-images/image4.jpeg'
        },
        {
          imageId: 5,
          imageName: 'Image 5',
          imagePath: 'assets/test-gallery-images/image5.jpeg'
        },
        {
          imageId: 6,
          imageName: 'Image 6',
          imagePath: 'assets/test-gallery-images/image6.jpeg'
        },
        {
          imageId: 7,
          imageName: 'Image 7',
          imagePath: 'assets/test-gallery-images/image7.jpeg'
        },
        {
          imageId: 8,
          imageName: 'Image 8',
          imagePath: 'assets/test-gallery-images/image8.jpeg'
        }
      ]
    },
    {
      sectionId: 2,
      title: 'Section - Stewie',
      description: 'This is the description for section - Stewie',
      isDarkSection: false,
      images: [
        {
          imageId: 9,
          imageName: 'Image 9',
          imagePath: 'assets/test-gallery-images/image9.jpeg'
        },
        {
          imageId: 10,
          imageName: 'Image 10',
          imagePath: 'assets/test-gallery-images/image10.jpeg'
        },
        {
          imageId: 11,
          imageName: 'Image 11',
          imagePath: 'assets/test-gallery-images/image11.jpeg'
        },
        {
          imageId: 12,
          imageName: 'Image 12',
          imagePath: 'assets/test-gallery-images/image12.jpeg'
        },
        {
          imageId: 13,
          imageName: 'Image 13',
          imagePath: 'assets/test-gallery-images/image13.jpeg'
        }
      ]
    },
    {
      sectionId: 3,
      title: 'Section - Chris',
      description: 'This is the description for section - Chris',
      isDarkSection: false,
      images: [
        {
          imageId: 14,
          imageName: 'Image 14',
          imagePath: 'assets/test-gallery-images/image14.jpeg'
        },
        {
          imageId: 15,
          imageName: 'Image 15',
          imagePath: 'assets/test-gallery-images/image15.jpeg'
        },
        {
          imageId: 16,
          imageName: 'Image 16',
          imagePath: 'assets/test-gallery-images/image16.jpeg'
        },
        {
          imageId: 17,
          imageName: 'Image 17',
          imagePath: 'assets/test-gallery-images/image17.jpeg'
        },
        {
          imageId: 18,
          imageName: 'Image 18',
          imagePath: 'assets/test-gallery-images/image18.jpeg'
        },
        {
          imageId: 19,
          imageName: 'Image 19',
          imagePath: 'assets/test-gallery-images/image19.jpeg'
        }
      ]
    }
  ]

  constructor(public router: Router) { }

  ngOnInit() {
  }

  public navigateToEditGalleryPage() {
    this.router.navigateByUrl(AppRoutes.GalleryAdmin);
  }

}
