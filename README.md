# New Website Redesign


Hello!

## Information about this project
This is my newest iteration of my personal webpage. I'm using Angular (RxJs, Typescript, Material), Firebase, AngularFire, Firebase Functions for serverless backend functionality, Firebase IAM, and I'm running it all with emulators locally with the new Firebase Emulators. 

This will be replacing [my current website](https://henryfritz.xyz]) once I reach feature parity, and have a chance to write unit, system, and integration tests.

Feel free to steal any of this code you find useful!


## Running the project
As with any other angular project, you can use the common angular CLI fare. 

To serve the app, run
    ng serve 
    
And to run firebase functions and the emulators, open a new tab and run:
    cd functions && npm run go

> Of course, my development environmental variables are empty, so you
> will need to create your own firebase project to set up your app
> configuration there. My prod env file is there-- but there's nothing
> in it!
## Features
At the outset:

 - [x] About Page- informational page with the details you would find on a    resume, and the more important details that you wouldn't
- [ ] Dashboard/Landing Page- view of newest Blog Posts/ Gallery Images-       available to all
- [x]  Contact Page- page with contact form stepper
- [ ]   Gallery- gallery for images (3d renders, photos, et c.), video (youtube integration),
- [ ]   Blog- blog with included support for codepen, possibly fullscreen support for p5js/ml5js and THREEjs
- [ ]   Third-Party OAuth support for commenting on posts
- [x]  Log In/ Out, SideNav, Header, Footer, common components
- [x]   Bug Report service/modal- allows for user submissions when something goes wrong
- [ ]  Admin Dashboard- view bugReports, contact inquiries, view/edit gallery and blog posts, moderate comments, et c.
 - [ ] Billing, payment integration

I might move my PM flow from google docs into issues at some point, but don't hold me to that!

## Goals

 - Take full advantage of typescript, RxJS, and built-in angular features.
 - Stick to @angular/material as much as possible, but style freely.
 - Keep the Microservices pattern where possible
 - As the project matures, look into pub/sub and realtime chat capabilities
 - Clean, terse, easy to read code that won't make me cringe when I am trying to add something three years down the road (the inspiration for this redesign!)
